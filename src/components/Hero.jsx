export default function Hero() {
  return (
    <section
      className="relative h-[70vh] flex flex-col justify-center items-center text-center
                 bg-[url('https://images.unsplash.com/photo-1480554840075-72cbdabbf689?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
                 bg-cover bg-center
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
            className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium 
                       hover:scale-105 transition-all duration-300"
          >
            Ajustes
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-black text-white font-medium 
                       hover:scale-105 transition-all duration-300"
          >
            Iniciar Simulación
          </button>
        </div>
      </div>
    </section>
  );
}
