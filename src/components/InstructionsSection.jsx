const items = [
  { title: "¿CÓMO LO USO?" },
  { title: "COSAS A TENER EN CUENTA" },
  { title: "COSAS PARA PROBAR" },
  { title: "PROFUNDIZANDO EL MODELO" },
  { title: "CARACTERÍSTICAS DE Lupus-Lepus" },
  { title: "CRÉDITOS Y REFERENCIAS" },
];

export default function InstructionsSection() {
  return (
    <section className="bg-[#E4E4E4] py-16 border-t border-gray-200">
      <div className="w-4/5 mx-auto px-6">
        <header className="mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            ¿CÓMO FUNCIONA?
          </h2>
          <p className="text-sm md:text-base text-gray-500">Instrucciones</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(({ title }, index) => (
            <article
              key={index}
              className="bg-white/90 rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8
                         hover:shadow-md hover:-translate-y-1 transition-transform h-60 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-black text-white text-base rounded-full">
                  !
                </div>
                <h3 className="font-semibold text-gray-800 text-base md:text-lg uppercase tracking-wide">
                  {title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                Texto de ejemplo o breve explicación. Puedes reemplazarlo con tus instrucciones.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
