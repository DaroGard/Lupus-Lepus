const DEFAULTS = {
  width: 60,
  height: 40,
  carrotsEnabled: true,
  carrotRegrowTime: 160,
  initialRabbits: 30,
  initialWolves: 15,
  rabbitGainFromFood: 10,
  wolfGainFromFood: 10,
  rabbitReproduceProb: 0.2,
  wolfReproduceProb: 0.1,
  rabbitMoveCost: 0.2,
  wolfMoveCost: 0.15,
  showEnergy: true,
  maxRabbitEnergy: 20,
  maxWolfEnergy: 25,
};

function randInt(n) {
  return Math.floor(Math.random() * n);
}
function randFloat() {
  return Math.random();
}

export function createEmptyGrid(w, h) {
  return Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ({ pcolor: "green", countdown: 0 }))
  );
}

export function defaultState(overrides = {}) {
  const cfg = { ...DEFAULTS, ...overrides };
  return {
    cfg,
    patches: createEmptyGrid(cfg.width, cfg.height),
    rabbits: [],
    wolves: [],
    tick: 0,
    history: { rabbits: [], wolves: [], carrots: [] },
    running: true,
  };
}

let idCounter = 1;
function nextId() {
  return idCounter++;
}
function randomPosition(state) {
  return {
    x: Math.random() * state.cfg.width,
    y: Math.random() * state.cfg.height,
  };
}

export function setup(state, overrides = {}) {
  idCounter = 1;
  state = defaultState({ ...state.cfg, ...overrides, ...state?.cfg });
  const { cfg } = state;

  const carrotProb = (cfg.initialRabbits / (cfg.width * cfg.height)) * 3;

  for (let y = 0; y < cfg.height; y++) {
    for (let x = 0; x < cfg.width; x++) {
      const hasCarrot = cfg.carrotsEnabled && Math.random() < carrotProb;
      state.patches[y][x] = {
        pcolor: hasCarrot ? "orange" : "green",
        countdown: hasCarrot
          ? cfg.carrotRegrowTime
          : randInt(cfg.carrotRegrowTime),
      };
    }
  }

  state.rabbits = Array.from({ length: cfg.initialRabbits }, () => {
    const pos = randomPosition(state);
    return {
      id: nextId(),
      x: pos.x,
      y: pos.y,
      angle: Math.random() * Math.PI * 2,
      energy: randFloat() * cfg.maxRabbitEnergy,
    };
  });

  state.wolves = Array.from({ length: cfg.initialWolves }, () => {
    const pos = randomPosition(state);
    return {
      id: nextId(),
      x: pos.x,
      y: pos.y,
      angle: Math.random() * Math.PI * 2,
      energy: randFloat() * cfg.maxWolfEnergy,
    };
  });

  state.tick = 0;
  state.history = { rabbits: [], wolves: [], carrots: [] };
  state.running = true;
  return state;
}

function patchAt(state, x, y) {
  const ix = Math.floor(x),
    iy = Math.floor(y);
  return state.patches[iy]?.[ix];
}

function agentsAt(list, x, y) {
  return list.filter(
    (a) =>
      Math.floor(a.x) === Math.floor(x) && Math.floor(a.y) === Math.floor(y)
  );
}

function findNearestCarrot(rabbit, state, maxDist = 5) {
  let nearest = null,
    minDist = Infinity;
  const w = state.cfg.width,
    h = state.cfg.height;
  for (let dy = -maxDist; dy <= maxDist; dy++) {
    for (let dx = -maxDist; dx <= maxDist; dx++) {
      const nx = (rabbit.x + dx + w) % w;
      const ny = (rabbit.y + dy + h) % h;
      const p = patchAt(state, nx, ny);
      if (p?.pcolor === "orange") {
        const dist = Math.hypot(nx - rabbit.x, ny - rabbit.y);
        if (dist < minDist) {
          minDist = dist;
          nearest = { x: nx, y: ny };
        }
      }
    }
  }
  return nearest;
}

function moveRabbit(rabbit, state) {
  const target = findNearestCarrot(rabbit, state);
  if (target)
    rabbit.angle +=
      (Math.atan2(target.y - rabbit.y, target.x - rabbit.x) - rabbit.angle) *
      0.3;
  else rabbit.angle += (Math.random() - 0.5) * 0.2;

  const speed = 0.7;
  rabbit.x =
    (rabbit.x + Math.cos(rabbit.angle) * speed + state.cfg.width) %
    state.cfg.width;
  rabbit.y =
    (rabbit.y + Math.sin(rabbit.angle) * speed + state.cfg.height) %
    state.cfg.height;
  rabbit.energy -= state.cfg.rabbitMoveCost * speed;
  if (rabbit.energy <= 0) rabbit._dead = true;
}

function rabbitEatCarrot(rabbit, state) {
  if (!state.cfg.carrotsEnabled) return;
  const p = patchAt(state, rabbit.x, rabbit.y);
  if (p?.pcolor === "orange") {
    p.pcolor = "green";
    p.countdown = state.cfg.carrotRegrowTime;
    rabbit.energy = Math.min(
      rabbit.energy + state.cfg.rabbitGainFromFood,
      state.cfg.maxRabbitEnergy
    );
  }
}

function moveWolf(wolf, state) {
  let nearest = null,
    minDist = Infinity;
  for (const r of state.rabbits) {
    const dist = Math.hypot(r.x - wolf.x, r.y - wolf.y);
    if (dist < minDist) {
      minDist = dist;
      nearest = r;
    }
  }
  if (nearest && minDist <= 6)
    wolf.angle +=
      (Math.atan2(nearest.y - wolf.y, nearest.x - wolf.x) - wolf.angle) * 0.2 +
      (Math.random() - 0.5) * 0.15;
  else wolf.angle += (Math.random() - 0.5) * 0.1;

  const speed = 0.6;
  wolf.x =
    (wolf.x + Math.cos(wolf.angle) * speed + state.cfg.width) % state.cfg.width;
  wolf.y =
    (wolf.y + Math.sin(wolf.angle) * speed + state.cfg.height) %
    state.cfg.height;
  wolf.energy -= state.cfg.wolfMoveCost * speed;
  if (wolf.energy <= 0) wolf._dead = true;
}

function wolfCatchRabbit(wolf, state) {
  const preyList = agentsAt(state.rabbits, wolf.x, wolf.y);
  if (!preyList.length) return;
  const prey = preyList[randInt(preyList.length)];
  prey._dead = true;
  wolf.energy = Math.min(
    wolf.energy + state.cfg.wolfGainFromFood,
    state.cfg.maxWolfEnergy
  );
}

function reproduceAgent(agent, list, baseProb) {
  if (agent.energy < 5) return;
  if (Math.random() < baseProb) {
    const childEnergy = Math.floor(agent.energy / 2);
    const child = {
      ...agent,
      id: nextId(),
      x: agent.x,
      y: agent.y,
      angle: Math.random() * Math.PI * 2,
      energy: childEnergy,
    };
    agent.energy = childEnergy;
    list.push(child);
  }
}

function removeDead(list) {
  return list.filter((a) => !a._dead && a.energy > 0);
}

function growCarrots(state) {
  if (!state.cfg.carrotsEnabled) return;
  for (let y = 0; y < state.cfg.height; y++) {
    for (let x = 0; x < state.cfg.width; x++) {
      const p = state.patches[y][x];
      if (p.pcolor === "green") {
        p.countdown--;
        if (p.countdown <= 0) {
          p.pcolor = "orange";
          p.countdown = state.cfg.carrotRegrowTime;
        }
      }
    }
  }
}

export function tick(state) {
  if (!state.running) return state;

  const totalCarrots = state.patches
    .flat()
    .filter((p) => p.pcolor === "orange").length;
  const foodRatio = totalCarrots / (state.cfg.width * state.cfg.height);

  for (const r of state.rabbits) {
    rabbitEatCarrot(r, state);
    moveRabbit(r, state);
    reproduceAgent(r, state.rabbits, state.cfg.rabbitReproduceProb * foodRatio);
  }

  for (const w of state.wolves) {
    wolfCatchRabbit(w, state);
    moveWolf(w, state);
    reproduceAgent(w, state.wolves, state.cfg.wolfReproduceProb);
  }

  state.rabbits = removeDead(state.rabbits);
  state.wolves = removeDead(state.wolves);
  growCarrots(state);

  state.history.rabbits.push(state.rabbits.length);
  state.history.wolves.push(state.wolves.length);
  state.history.carrots.push(totalCarrots);

  state.tick++;
  if (state.rabbits.length === 0 && state.wolves.length === 0)
    state.running = false;

  return state;
}
