"use client";

import Image from "next/image";
import { useState, useRef } from "react";


interface CardProps {
  images: string[];
  title: string;
  price: number | string;
  state: "disponible" | "vendida";
  onClick?: () => void;
}

const Card = ({ images = [], title, price, state, onClick }: CardProps) => {
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40;

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!hasMultiple) return;

    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      touchStartX.current = null;
      touchEndX.current = null;
    }

    if (distance > SWIPE_THRESHOLD) {
      setCurrent((prev) => (prev + 1) % images.length);
    }

    if (distance < -SWIPE_THRESHOLD) {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      onClick={onClick}
      className="group bg-[#0b0b0b] border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer active:scale-100"
    >
      {/* Carrusel con SLIDE */}
      <div 
        className="relative w-full h-56 bg-[#1a1a1a] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Track (slide animado) */}
        <div
          className="flex h-full transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative min-w-full h-full">
              <Image
                src={img}
                alt={`${title}-${index}`}
                fill
                className="object-cover select-none"
                sizes="(max-width: 768px) 100vw, 33vw"
                draggable={false}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Botón izquierda */}
        {hasMultiple && (
          <button
            onClick={prevImage}
            className="hidden lg:block absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer backdrop-blur-sm"
          >
            ◀
          </button>
        )}

        {/* Botón derecha */}
        {hasMultiple && (
          <button
            onClick={nextImage}
            className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer backdrop-blur-sm"
          >
            ▶
          </button>
        )}

        {/* Indicadores */}
        {hasMultiple && (
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 
            opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
            bg-black/30 lg:bg-transparent px-2 py-1 rounded-full
            transition-opacity duration-200">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-white scale-110"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Overlay sutil al hover (más premium para store) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <p
            className={`font-medium transition-all ${
              state === "vendida"
                ? "text-gray-500 line-through"
                : "text-gray-400"
            }`}
          >
            ${price}
          </p>

          {state === "vendida" && (
            <span className="text-red-500 font-semibold text-sm tracking-wide">
              VENDIDA
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;