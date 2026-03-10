"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./card"; // ajusta la ruta si es necesario
import { CatalogProduct } from "../types/product";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CustomSkinsExampleCarouselProps {
  products: CatalogProduct[];
  onCardClick?: (product: CatalogProduct) => void;
}

const CustomSkinsExampleCarousel = ({
  products,
  onCardClick,
}: CustomSkinsExampleCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedProducts = [...products].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Detectar tamaño de pantalla (responsive real)
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;

      if (width < 640) setItemsPerView(1); // mobile
      else if (width < 1024) setItemsPerView(2); // tablet
      else setItemsPerView(3); // desktop
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="w-full md:px-20 pt-14 bg-[#0B0F1A]">
      <div className="mx-auto">
        {/* Título */}
        <div className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Peticiones de otros jugadores
          </h2>
        </div>

        {/* Contenedor del carrusel */}
        <div className="relative">
          {/* Track */}
          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  current * (100 / itemsPerView)
                }%)`,
              }}
            >
              {sortedProducts.map((product) => (
                <div
                  key={`${product.category}-${product.id}`}
                  className="px-2 py-4"
                  style={{
                    minWidth: `${100 / itemsPerView}%`,
                  }}
                >
                  <Card
                    images={product.images}
                    title={product.title}
                    price={product.price}
                    state={product.state}
                    onClick={() => onCardClick?.(product)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botón izquierda */}
          {current > 0 && (
            <button
              onClick={prev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white px-4 py-2 rounded-lg backdrop-blur-md transition z-10"
            >
              <FiChevronLeft size={24} />
            </button>
          )}

          {/* Botón derecha */}
          {current < maxIndex && (
            <button
              onClick={next}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white px-4 py-2 rounded-lg backdrop-blur-md transition z-10"
            >
              <FiChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomSkinsExampleCarousel;