import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function SimulationSection() {
  return (
    <section className="bg-[#EEEAEA] py-16 border-t border-gray-200">
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className="flex flex-col items-center mb-12 w-full">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Velocidad de simulación
          </label>
          <input
            type="range"
            min="0"
            max="100"
            className="w-full md:w-4/5 accent-emerald-700 cursor-pointer rounded-lg h-2 transition-all duration-200"
          />
          <p className="text-sm text-gray-600 mt-2">0% – 100%</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <PlayIcon className="w-5 h-5" />
            Iniciar
          </button>
          <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <PauseIcon className="w-5 h-5" />
            Pausar
          </button>
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <ArrowPathIcon className="w-5 h-5" />
            Reiniciar
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="bg-emerald-600/90 rounded-2xl w-full md:w-1/2 h-[500px] md:h-[550px] flex items-center justify-center shadow-inner">
            <p className="text-white text-lg font-medium">
              [Canvas de Simulación]
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 w-full md:w-1/2 flex flex-col h-[500px] md:h-[550px]">
            <h3 className="font-semibold text-gray-800 text-center mb-4 text-xl">
              Gráfico de Poblaciones
            </h3>
            <div className="flex-1 flex items-center justify-center text-gray-400 text-base">
              [Canvas de Gráfico de Poblaciones]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
