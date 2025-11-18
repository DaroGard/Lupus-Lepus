import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsPanel from "./SettingsPanel";
import SimulationSection from "./SimulationSection";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [simSettings, setSimSettings] = useState(null);
  const simulationRef = useRef(null);

  const startSimulation = () => {
    if (simulationRef.current?.start) {
      simulationRef.current.start();
      simulationRef.current.scroll();
    }
  };

  return (
    <>
      <section
        className="relative h-[70vh] flex flex-col justify-center items-center text-center
                   bg-[url('https://images.unsplash.com/photo-1480554840075-72cbdabbf689?q=80&w=1170&auto=format&fit=crop')] 
                   bg-cover bg-center
                   before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-sm"
      >
        <div className="relative z-10 flex flex-col items-center px-6 animate-fade-in">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-green-400">Lupus – Lepus</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-medium mb-8 text-white/90 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Simulación Interactiva de Ecosistemas
          </motion.p>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition font-semibold hover:scale-105 transform"
            >
              Configuración
            </button>

            <button
              onClick={startSimulation}
              className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:scale-105 transition-all duration-300"
            >
              Iniciar Simulación
            </button>
          </motion.div>
        </div>
      </section>

      <SimulationSection ref={simulationRef} settingsFromPanel={simSettings} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 18 }}
              className="relative w-full max-w-2xl"
            >
              <SettingsPanel
                onClose={() => setOpen(false)}
                onApply={(cfg) => setSimSettings(cfg)}
                initialConfig={simSettings}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
