export function createScaler(canvas, zoomFactor = 1.5) {
  const ctx = canvas.getContext("2d");

  const rabbitImg = new Image();
  rabbitImg.src = new URL("../assets/icons/rabbit.svg", import.meta.url).href;
  const wolfImg = new Image();
  wolfImg.src = new URL("../assets/icons/wolf.svg", import.meta.url).href;
  const carrotImg = new Image();
  carrotImg.src = new URL("../assets/icons/carrot.svg", import.meta.url).href;

  let cellW = 0;
  let cellH = 0;
  let cols = 0;
  let rows = 0;

  const interpPos = {
    rabbits: new Map(),
    wolves: new Map(),
  };

  const carrotScale = new Map();
  let initialized = false;

  function redraw(state) {
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);
    const originalCols = state.cfg.width;
    const originalRows = state.cfg.height;

    cols = Math.max(5, (w / 35) | 0);
    rows = Math.max(5, (h / 35) | 0);
    cellW = w / cols;
    cellH = h / rows;

    ctx.fillStyle = "rgba(52,211,153,0.5)";
    ctx.fillRect(0, 0, w, h);

    const carrotSize = Math.min(cellW, cellH) * 0.7;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const origX = (x * originalCols) / cols;
        const origY = (y * originalRows) / rows;
        const patch = state.patches[Math.floor(origY)]?.[Math.floor(origX)];
        if (patch?.pcolor === "orange" && carrotImg.complete) {
          const key = `${Math.floor(origX)}_${Math.floor(origY)}`;
          const prevScale = carrotScale.get(key) || 0;
          const targetScale = 1;
          const scale = prevScale + (targetScale - prevScale) * 0.2;
          carrotScale.set(key, scale);

          const size = carrotSize * scale;
          ctx.drawImage(
            carrotImg,
            x * cellW + (cellW - size) / 2,
            y * cellH + (cellH - size) / 2,
            size,
            size
          );
        }
      }
    }

    const agentSize = carrotSize;
    const energyOffset = agentSize / 2 + 6;
    const lerp = (a, b, t) => a + (b - a) * t;

    function drawAgent(a, type) {
      if (!interpPos[type].has(a.id)) {
        interpPos[type].set(a.id, {
          x: (a.x * w) / originalCols,
          y: (a.y * h) / originalRows,
          angle: 0,
        });
      }
      const prev = interpPos[type].get(a.id);

      const targetX = (a.x * w) / originalCols;
      const targetY = (a.y * h) / originalRows;
      const dx = targetX - prev.x;
      const dy = targetY - prev.y;

      const t = initialized
        ? Math.min(1, 0.15 * (Math.abs(dx) + Math.abs(dy)))
        : 1;
      prev.x = lerp(prev.x, targetX, t);
      prev.y = lerp(prev.y, targetY, t);

      const targetAngle = Math.atan2(dy, dx);
      prev.angle = lerp(prev.angle, targetAngle, 0.2);

      const img = type === "rabbits" ? rabbitImg : wolfImg;
      if (img.complete) {
        ctx.save();
        ctx.translate(prev.x, prev.y);
        ctx.rotate(prev.angle);
        ctx.drawImage(
          img,
          -agentSize / 2,
          -agentSize / 2,
          agentSize,
          agentSize
        );
        ctx.restore();
      }

      if (state.cfg.showEnergy) {
        const eText = Math.round(a.energy).toString();
        const fontSize = Math.max(12, agentSize * 0.25);
        ctx.font = `${fontSize}px sans-serif`;
        const textWidth = ctx.measureText(eText).width;
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(
          prev.x - textWidth / 2 - 2,
          prev.y + energyOffset - fontSize / 2 - 1,
          textWidth + 4,
          fontSize + 2
        );
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(eText, prev.x, prev.y + energyOffset);
      }
    }

    state.rabbits.forEach((r) => drawAgent(r, "rabbits"));
    state.wolves.forEach((w) => drawAgent(w, "wolves"));

    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellW + 0.5, 0);
      ctx.lineTo(x * cellW + 0.5, h);
      ctx.stroke();
    }
    for (let y = 0; y <= rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellH + 0.5);
      ctx.lineTo(w, y * cellH + 0.5);
      ctx.stroke();
    }

    initialized = true;
  }

  return { redraw };
}
