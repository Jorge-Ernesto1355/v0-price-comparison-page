import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqItems = [
  {
    question: "¿Cómo encuentran el precio más barato?",
    answer:
      "Analizamos múltiples tiendas en tiempo real para mostrarte automáticamente la mejor oferta disponible.",
  },
  {
    question: "¿Las tiendas son seguras?",
    answer:
      "Sí. Solo mostramos resultados de tiendas verificadas y confiables.",
  },
  {
    question: "¿Cada cuánto se actualizan los precios?",
    answer:
      "Los precios se actualizan constantemente para mantener la información lo más precisa posible.",
  },
  {
    question: "¿Necesito crear una cuenta?",
    answer:
      "No. Puedes buscar y comparar productos sin registrarte.",
  },
  {
    question: "¿Cobran comisión?",
    answer:
      "No cobramos nada al usuario. En algunos casos recibimos comisiones de afiliados.",
  },
  {
    question: "¿Qué pasa si el precio cambia?",
    answer:
      "El precio final depende de la tienda. Siempre te redirigimos al sitio oficial.",
  },
];

export default function MinimalFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full bg-[#F4FFFB] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#38B293] bg-[#DDF8EE] px-4 py-2 rounded-full text-sm font-medium">
            FAQ
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-6 leading-tight">
            Encuentra el mejor precio
            <span className="text-[#38B293]"> en segundos</span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-lg">
            Comparamos precios entre múltiples tiendas online para ayudarte a
            ahorrar tiempo y dinero.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Buscar pregunta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#D9F2E8] rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#38B293] transition-all duration-300 text-[#0F172A] placeholder:text-gray-400 shadow-sm"
          />
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {filtered.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="bg-white border border-[#E7F5EF] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#B7E8D5] hover:shadow-md"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-[#0F172A] text-[16px]">
                    {item.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`text-[#38B293] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-5">
            ¿No encontraste tu respuesta?
          </p>

          <button className="bg-[#38B293] hover:bg-[#2D9479] text-white px-7 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#38B293]/20">
            Contactar soporte
          </button>
        </div>
      </div>
    </section>
  );
}