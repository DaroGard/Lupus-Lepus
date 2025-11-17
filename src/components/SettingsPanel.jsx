import React from "react";

export default function SettingsPanel({ onClose }) {
    return (
        <div className="w-full max-w-5xl mx-auto p-8 bg-[#B9B9B9] bg-opacity-80 text-black rounded-2xl shadow-xl grid grid-cols-2 gap-8">
            <div className="col-span-2 flex items-center gap-3 mb-4">
                <span className="text-3xl">&#9881;</span>
                <h2 className="text-2xl font-bold">Ajustes</h2>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Tiempo Crecimiento Zanahorias</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <label className="flex items-center gap-2 text-base font-medium">
                    <input type="checkbox" /> Zanahorias
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Cantidad Inicial de Conejos</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Cantidad Inicial de Lobos</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Conejo gana al comer</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Lobo gana al comer</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Reproducción de Conejos</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-base font-medium">Reproducción de Lobos</label>
                <input type="range" className="w-full" />
                <span className="text-sm opacity-80">Valor: 0</span>
            </div>
            <div className="col-span-2 flex justify-end gap-4 mt-6">
                <button
                    className="px-5 py-2 rounded-xl bg-gray-400 text-black font-medium hover:bg-gray-500"
                    onClick={onClose}
                >
                    Cancelar
                </button>
                <button className="px-5 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-900">
                    Aplicar
                </button>
            </div>
        </div>
    );
}
