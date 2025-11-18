import React, { useState } from "react";

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

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function SettingsPanel({ onClose, onApply, initialConfig = {} }) {
  const defaults = { ...DEFAULTS, ...initialConfig };
  const [cfg, setCfg] = useState(defaults);

  const apply = () => {
    const safeCfg = {
      ...cfg,
      rabbitReproduceProb: clamp(cfg.rabbitReproduceProb, 0, 0.5),
      wolfReproduceProb: clamp(cfg.wolfReproduceProb, 0, 0.5),
      carrotRegrowTime: clamp(cfg.carrotRegrowTime, 1, 300),
    };
    onApply?.({ ...safeCfg, appliedAt: Date.now() });
    onClose?.();
  };

  const resetDefaults = () => setCfg({ ...DEFAULTS });

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-[#B9B9B9] bg-opacity-80 text-black rounded-2xl shadow-xl grid grid-cols-2 gap-8">
      <div className="col-span-2 flex items-center gap-3 mb-4">
        <span className="text-3xl">&#9881;</span>
        <h2 className="text-2xl font-bold">Ajustes</h2>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Tiempo Crecimiento Zanahorias</label>
        <input
          type="range"
          min={1}
          max={300}
          value={cfg.carrotRegrowTime}
          onChange={(e) =>
            setCfg((s) => ({ ...s, carrotRegrowTime: clamp(Number(e.target.value), 1, 300) }))
          }
          className="w-full"
        />
        <span className="text-sm opacity-80">Valor: {cfg.carrotRegrowTime}</span>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <label className="flex items-center gap-2 text-base font-medium">
          <input
            type="checkbox"
            checked={cfg.carrotsEnabled}
            onChange={(e) => setCfg((s) => ({ ...s, carrotsEnabled: e.target.checked }))}
          />
          Zanahorias
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Cantidad Inicial de Conejos</label>
        <input
          type="range"
          min={0}
          max={100}
          value={cfg.initialRabbits}
          onChange={(e) => setCfg((s) => ({ ...s, initialRabbits: Number(e.target.value) }))}
          className="w-full"
        />
        <span className="text-sm opacity-80">Valor: {cfg.initialRabbits}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Cantidad Inicial de Lobos</label>
        <input
          type="range"
          min={0}
          max={50}
          value={cfg.initialWolves}
          onChange={(e) => setCfg((s) => ({ ...s, initialWolves: Number(e.target.value) }))}
          className="w-full"
        />
        <span className="text-sm opacity-80">Valor: {cfg.initialWolves}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Conejo gana al comer</label>
        <input
          type="range"
          min={0}
          max={50}
          value={cfg.rabbitGainFromFood}
          onChange={(e) => setCfg((s) => ({ ...s, rabbitGainFromFood: Number(e.target.value) }))}
          className="w-full"
        />
        <span className="text-sm opacity-80">Valor: {cfg.rabbitGainFromFood}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Lobo gana al comer</label>
        <input
          type="range"
          min={0}
          max={50}
          value={cfg.wolfGainFromFood}
          onChange={(e) => setCfg((s) => ({ ...s, wolfGainFromFood: Number(e.target.value) }))}
          className="w-full"
        />
        <span className="text-sm opacity-80">Valor: {cfg.wolfGainFromFood}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Reproducción de Conejos</label>
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.01}
          value={cfg.rabbitReproduceProb}
          onChange={(e) => setCfg((s) => ({ ...s, rabbitReproduceProb: Number(e.target.value) }))}
          className="w-full"
        />
        <span className="text-sm opacity-80">
          Valor: {Math.round(cfg.rabbitReproduceProb * 100)}%
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-base font-medium">Reproducción de Lobos</label>
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.01}
          value={cfg.wolfReproduceProb}
          onChange={(e) => setCfg((s) => ({ ...s, wolfReproduceProb: Number(e.target.value) }))}
          className="w-full"
        />
        <span className="text-sm opacity-80">
          Valor: {Math.round(cfg.wolfReproduceProb * 100)}%
        </span>
      </div>
      <div className="col-span-2 flex justify-end gap-4 mt-6">
        <button
          className="px-5 py-2 rounded-xl bg-gray-400 text-black font-medium hover:bg-gray-500"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="px-5 py-2 rounded-xl bg-yellow-600 text-white font-medium hover:bg-yellow-700"
          onClick={() => setCfg(DEFAULTS)}
        >
          Valores Predeterminados
        </button>
        <button
          className="px-5 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-900"
          onClick={apply}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
