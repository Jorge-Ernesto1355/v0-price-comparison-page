'use client';
import { useState } from "react";

import { ChevronDown, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const faqItems = [
  {
    question: "¿Cómo encuentran el precio más barato?",
    answer:
      "Nuestro sistema analiza automáticamente cientos de productos en diferentes tiendas en línea para encontrar la mejor oferta disponible. Comparamos precios, descuentos, promociones y disponibilidad en tiempo real para ayudarte a ahorrar dinero sin tener que buscar manualmente en múltiples páginas.",
  },
  {
    question: "¿Las tiendas que aparecen son seguras?",
    answer:
      "Sí. Trabajamos únicamente con tiendas reconocidas y plataformas verificadas para ofrecer una experiencia más segura y confiable. Antes de mostrar una tienda en nuestros resultados, revisamos factores como reputación, tráfico, autenticidad y disponibilidad del sitio.",
  },
  {
    question: "¿Cada cuánto se actualizan los precios?",
    answer:
      "Los precios se actualizan constantemente durante el día para mostrar información lo más reciente posible. Sin embargo, algunas tiendas pueden modificar precios o promociones sin previo aviso, especialmente durante eventos especiales como Hot Sale, Black Friday o temporadas de descuentos.",
  },
  {
    question: "¿Necesito crear una cuenta para usar la plataforma?",
    answer:
      "No. Puedes buscar, comparar productos y acceder a las mejores ofertas sin necesidad de registrarte. Queremos que el proceso sea rápido, simple y accesible para cualquier usuario desde el primer momento.",
  },
  {
    question: "¿La plataforma tiene algún costo?",
    answer:
      "No. Nuestra plataforma es completamente gratuita para los usuarios. Puedes comparar productos y explorar diferentes tiendas sin pagar suscripciones, membresías ni cargos ocultos.",
  },
  {
    question: "¿Cómo gana dinero la plataforma?",
    answer:
      "En algunos casos obtenemos pequeñas comisiones de afiliados cuando realizas una compra desde alguno de nuestros enlaces. Esto no afecta el precio final que pagas y nos ayuda a mantener la plataforma funcionando y seguir mejorando el servicio.",
  },
  {
    question: "¿Qué pasa si el precio cambia después de hacer clic?",
    answer:
      "Los precios pueden cambiar rápidamente dependiendo de la tienda, disponibilidad del producto o promociones activas. Aunque actualizamos la información constantemente, el precio final siempre será confirmado directamente en la página oficial de la tienda.",
  },
  {
    question: "¿Puedo comparar productos específicos?",
    answer:
      "Sí. Puedes buscar productos exactos usando nombres, modelos, marcas o características específicas. Nuestro sistema intentará mostrar las mejores coincidencias disponibles entre diferentes tiendas para facilitar la comparación.",
  },
  {
    question: "¿Los enlaces son oficiales?",
    answer:
      "Sí. Todos los enlaces te redirigen directamente a las páginas oficiales de cada tienda o marketplace correspondiente. Nunca utilizamos enlaces falsos ni intermediarios sospechosos.",
  },
  {
    question: "¿Incluyen costos de envío e impuestos?",
    answer:
      "Intentamos mostrar la información más completa posible, pero algunos costos adicionales como envío, impuestos o tarifas pueden variar según la ubicación del usuario y las políticas de cada tienda.",
  },
  {
    question: "¿Qué tiendas soportan actualmente?",
    answer:
      "Nuestra plataforma trabaja con múltiples tiendas populares y marketplaces reconocidos. Continuamente agregamos nuevas tiendas y expandimos nuestra cobertura para ofrecer más opciones y mejores precios.",
  },
  {
    question: "¿Tienen aplicación móvil?",
    answer:
      "Actualmente estamos trabajando en una versión móvil para ofrecer una experiencia más rápida y optimizada desde smartphones y tablets. Mientras tanto, la plataforma ya es totalmente responsive y funciona perfectamente desde cualquier navegador móvil.",
  },
  {
    question: "¿Qué tan precisos son los resultados?",
    answer:
      "Nuestro objetivo es ofrecer resultados rápidos y precisos utilizando datos actualizados constantemente. Sin embargo, la disponibilidad y los precios pueden variar directamente en las tiendas dependiendo de promociones temporales o cambios de inventario.",
  },
  {
    question: "¿Puedo guardar productos o crear alertas?",
    answer:
      "Estamos desarrollando funciones para guardar productos favoritos y recibir alertas cuando un precio baje. Muy pronto podrás seguir productos específicos y recibir notificaciones automáticamente.",
  },
  {
    question: "¿Cómo reporto un precio incorrecto o un enlace roto?",
    answer:
      "Si encuentras información incorrecta o algún problema con un enlace, puedes contactarnos desde el apartado de soporte. Nuestro equipo revisará el reporte lo antes posible para mantener la plataforma actualizada y funcionando correctamente.",
  },
];

export default function MinimalFAQ() {
const [open, setOpen] = useState<number | null>(null);
const [search, setSearch] = useState("");

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const searchTerm = normalizeText(search);

const filtered = faqItems.filter((item) => {
  const question = normalizeText(item.question);
  const answer = normalizeText(item.answer);

  return (
    question.includes(searchTerm) ||
    answer.includes(searchTerm)
  );
});

/* Highlight Function */
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;

  const escapedQuery = query.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return text.split(regex).map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();

    return isMatch ? (
      <mark
        key={index}
        className="
          bg-[#A7F3D0]
          text-[#065F46]
          px-1
          py-0.5
          rounded-md
          font-medium
        "
      >
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    );
  });
};
  return (
    <section className="w-full bg-[#F4FFFB] pb-24 px-6">
      <SiteHeader />  
      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-16">
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

         <div className="relative mb-12">
  <Search
    size={18}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#38B293]"
  />

  <input
    type="text"
    placeholder="Buscar preguntas..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      bg-white
      border
      border-[#D9F2E8]
      rounded-2xl
      py-4
      pl-12
      pr-4
      outline-none
      focus:border-[#38B293]
      focus:ring-4
      focus:ring-[#38B293]/10
      transition-all
      duration-300
      text-[#0F172A]
      placeholder:text-gray-400
      shadow-sm
    "
  />
</div>
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
                    {highlightText(item.question, search)}
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
                     {highlightText(item.answer, search)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
  <div className="text-center py-16">
    <p className="text-gray-400 text-lg">
      No encontramos resultados para:
    </p>

    <span className="text-[#38B293] font-semibold">
      "{search}"
    </span>
  </div>
)}

        {/* Bottom */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-5">
            ¿No encontraste tu respuesta?
          </p>

          <a
  href="https://wa.me/6683216817?text=Hola,%20tengo%20una%20pregunta%20sobre..."
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 005.76 1.47h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.45zM12.07 21.8a9.8 9.8 0 01-5-1.37l-.36-.21-3.74.98 1-3.65-.24-.37a9.77 9.77 0 01-1.5-5.24c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.96 2.88a9.79 9.79 0 012.88 6.95c0 5.43-4.41 9.84-9.84 9.84zm5.39-7.35c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.47s1.08 2.86 1.23 3.06c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
  </svg>

  Preguntas por WhatsApp
</a>
        </div>
      </div>
    </section>
  );
}