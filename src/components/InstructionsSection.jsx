import { useState } from "react";

const items = [
  {
    title: "¿CÓMO LO USO?",
    summary: "Guía rápida para interactuar con Lupus-Lepus y explorar la simulación.",
    details: (
      <>
        <p>
          Ajusta los parámetros de población inicial, tasa de reproducción y energía ganada al comer para experimentar con diferentes escenarios del ecosistema.
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Usa los controles para activar o desactivar zanahorias.</li>
          <li>Observa la evolución de las poblaciones en tiempo real.</li>
          <li>Analiza la estabilidad del ecosistema ante cambios de parámetros.</li>
        </ul>
        <p>
          Video tutorial: <a href="#" target="_blank" className="text-blue-600 underline">Cómo usar simuladores depredador–presa</a>
        </p>
      </>
    ),
  },
  {
    title: "COSAS A TENER EN CUENTA",
    summary: "Consideraciones importantes sobre la dinámica de Lobos, Conejos y Zanahorias.",
    details: (
      <>
        <p>
          Cada especie sigue reglas de energía y reproducción: los lobos dependen de los conejos, los conejos de las zanahorias. Cambiar estos parámetros afecta la estabilidad del ecosistema.
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Evita poblaciones iniciales extremas que puedan colapsar el sistema.</li>
          <li>Observa cómo la disponibilidad de alimento regula la natalidad de conejos.</li>
          <li>La reproducción probabilística puede generar oscilaciones inesperadas.</li>
        </ul>
      </>
    ),
  },
  {
    title: "COSAS PARA PROBAR",
    summary: "Ideas de experimentos dentro de la simulación.",
    details: (
      <>
        <ul className="list-disc ml-6 mt-2">
          <li>Incrementa la tasa de reproducción de conejos y observa cómo afecta a los lobos.</li>
          <li>Desactiva las zanahorias y analiza la supervivencia de los conejos.</li>
          <li>Aumenta la eficiencia de depredación y registra la evolución poblacional.</li>
        </ul>
      </>
    ),
  },
  {
    title: "PROFUNDIZANDO EL MODELO",
    summary: "Explicación del modelo depredador–presa y las ecuaciones de Lotka–Volterra.",
    details: (
      <>
        <p>
          El modelo sigue las ecuaciones:
        </p>
        <pre className="bg-gray-100 p-2 rounded mb-2">
          {`dx/dt = αx - βxy
dy/dt = δxy - γy`}
        </pre>
        <p>
          Donde:
          <ul className="list-disc ml-6 mt-1">
            <li>x: población de conejos</li>
            <li>y: población de lobos</li>
            <li>α: tasa de natalidad de conejos</li>
            <li>β: tasa de depredación</li>
            <li>γ: tasa de mortalidad de lobos</li>
            <li>δ: eficiencia de conversión de presas en depredadores</li>
          </ul>
        </p>
        <p>
          Adaptación de Lupus-Lepus: se añade un recurso alimenticio (zanahorias) que regula la natalidad de los conejos y estabiliza el ecosistema.
        </p>
        <p>
          Lectura recomendada: <a href="https://es.wikipedia.org/wiki/Ecuaciones_de_Lotka-Volterra" target="_blank" className="text-blue-600 underline">Modelo de Lotka–Volterra</a>
        </p>
      </>
    ),
  },
  {
    title: "CARACTERÍSTICAS DE Lupus-Lepus",
    summary: "Resumen de funcionalidades y capacidades del simulador.",
    details: (
      <>
        <ul className="list-disc ml-6 mt-2">
          <li>Simulación basada en agentes con grilla animada.</li>
          <li>Parámetros ajustables: poblaciones iniciales, tasas de reproducción, energía, regeneración de recursos.</li>
          <li>Resultados visuales: animación en tiempo real + gráficos de evolución poblacional.</li>
          <li>Enfoque educativo e interactivo para aprendizaje de ecología y matemáticas aplicadas.</li>
        </ul>
      </>
    ),
  },
  {
    title: "CRÉDITOS Y REFERENCIAS",
    summary: "Autores, fuentes y recursos del proyecto.",
    details: (
      <>
        <p>
          Inspirado en Wilensky & Reisman (1999, 2006) y modelos clásicos de Lotka–Volterra.
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Wilensky, U. & Reisman, K. (1999, 2006). Modelos educativos en NetLogo.</li>
          <li>Lotka, A.J. (1925). Elements of Physical Biology.</li>
          <li>Volterra, V. (1926). Fluctuations in the abundance of a species.</li>
        </ul>
        <p>
          Video: <a href="https://cienciascontic.github.io/simuladores/lobos-ovejas-ES.html " target="_blank" className="text-blue-600 underline">Introducción a modelos depredador–presa</a>
        </p>
      </>
    ),
  },
];

export default function InstructionsSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
          {items.map(({ title, summary, details }, index) => (
            <article
              key={index}
              className="bg-white/90 rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8
                         hover:shadow-md hover:-translate-y-1 transition-transform cursor-pointer flex flex-col"
              onClick={() => toggleExpand(index)}
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
                {expandedIndex === index ? details : summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
