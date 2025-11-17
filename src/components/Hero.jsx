import React, { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="relative h-[70vh] flex flex-col justify-center items-center text-center
                 bg-[url('https://images.unsplash.com/photo-1480554840075-72cbdabbf689?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center
                 before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-sm"
    >
      <div className="relative z-10 flex flex-col items-center px-6 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white">
          Lupus - Lepus
        </h1>
        <p className="text-lg md:text-xl font-medium mb-8 text-white/90">
          Simulador Interactivo de Ecosistemas
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:scale-105 transition-all duration-300"
          >
            Ajustes
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:scale-105 transition-all duration-300"
          >
            Iniciar Simulación
          </button>
        </div>
      </div>
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
              className="relative w-full"
            >
              <SettingsPanel onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
