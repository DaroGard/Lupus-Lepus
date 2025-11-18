import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { defaultState, setup as engineSetup, tick as engineTick } from "../utils/simulationEngine";
import { createScaler } from "../utils/renderCanvas";
import PopulationChart from "./PopulationChart";

const SimulationSection = forwardRef(({ settingsFromPanel }, ref) => {
  const [state, setState] = useState(() =>
    settingsFromPanel ? engineSetup(defaultState(settingsFromPanel), settingsFromPanel)
      : engineSetup(defaultState(), {})
  );
  const [running, setRunning] = useState(false);
  const [speedPercent, setSpeedPercent] = useState(100);

  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sectionRef = useRef(null);

  useImperativeHandle(ref, () => ({
    start: () => setRunning(true),
    scroll: () => sectionRef.current?.scrollIntoView({ behavior: "smooth" }),
  }));

  useEffect(() => {
    if (!canvasRef.current) return;
    rendererRef.current = createScaler(canvasRef.current);
    rendererRef.current.redraw(state);
  }, [canvasRef.current]);

  useEffect(() => {
    if (!settingsFromPanel) return;
    setState((prev) => {
      if (prev.cfg?.appliedAt === settingsFromPanel.appliedAt) return prev;
      return engineSetup(defaultState(settingsFromPanel), settingsFromPanel);
    });
    setRunning(false);
  }, [settingsFromPanel?.appliedAt]);

  useEffect(() => {
    let animationFrame;
    let last = performance.now();
    let accumulator = 0;

    function loop(now) {
      const dt = now - last;
      accumulator += dt;
      last = now;
      const msPerTick = (100 * 100) / speedPercent;

      while (accumulator >= msPerTick) {
        setState((prev) => {
          const next = engineTick({ ...prev });
          next.rabbits = next.rabbits.filter((r) => r.energy >= 0 && !r._dead);
          next.wolves = next.wolves.filter((w) => w.energy >= 0 && !w._dead);
          const copy = { ...next, patches: next.patches.map((row) => row.map((c) => ({ ...c }))) };
          if (rendererRef.current) rendererRef.current.redraw(copy);
          return copy;
        });
        accumulator -= msPerTick;
      }

      if (running) animationFrame = requestAnimationFrame(loop);
    }

    if (running) animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [running, speedPercent]);

  useEffect(() => {
    if (rendererRef.current) rendererRef.current.redraw(state);
  }, [state]);

  const handleResume = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    const s = engineSetup(defaultState(state.cfg), state.cfg);
    s.history = { rabbits: [], wolves: [], carrots: [] };
    setState(s);
  };

  return (
    <section className="bg-[#EEEAEA] py-16 border-t border-gray-200" ref={sectionRef}>
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center mb-6 w-full">
          <label className="text-sm font-semibold text-gray-700 mb-2">Velocidad de simulación</label>
          <input
            type="range"
            min="0"
            max="200"
            value={speedPercent}
            onChange={(e) => setSpeedPercent(Number(e.target.value))}
            className="w-full md:w-4/5 accent-emerald-700 cursor-pointer rounded-lg h-2 transition-all duration-200"
          />
          <p className="text-sm text-gray-600 mt-2">{speedPercent}% (100% = normal)</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <button onClick={handleResume} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <PlayIcon className="w-5 h-5" /> Reanudar
          </button>
          <button onClick={handlePause} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <PauseIcon className="w-5 h-5" /> Pausar
          </button>
          <button onClick={handleReset} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <ArrowPathIcon className="w-5 h-5" /> Reiniciar
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="bg-emerald-600/90 rounded-2xl w-full md:w-1/2 h-[500px] md:h-[550px] flex items-center justify-center shadow-inner p-4">
            <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 w-full md:w-1/2 flex flex-col h-[500px] md:h-[550px]">
            <h3 className="font-semibold text-gray-800 text-center mb-4 text-xl">Gráfico de Poblaciones</h3>
            <div className="flex-1">
              <PopulationChart history={state.history} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SimulationSection;
