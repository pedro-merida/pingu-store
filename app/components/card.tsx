"use client";

import Image from "next/image";
import { useMemo, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { getProductMedia } from "../types/product";


interface CardProps {
  images: string[];
  video?: string;
  title: string;
  price: number | string;
  state: "disponible" | "vendida";
  onClick?: (mediaIndex?: number) => void;
}

const Card = ({ images = [], video, title, price, state, onClick }: CardProps) => {
  const [current, setCurrent] = useState(0);
  const slides = useMemo(() => getProductMedia(images, video), [images, video]);
  const hasMultiple = slides.length > 1;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40;

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
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
      setCurrent((prev) => (prev + 1) % slides.length);
    }

    if (distance < -SWIPE_THRESHOLD) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      onClick={() => onClick?.(current)}
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
          className="relative z-10 flex h-full transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative min-w-full h-full">
              {slide.type === "video" ? (
                <>
                  <Image
                    src={slide.poster || images[0]}
                    alt={`${title}-video`}
                    fill
                    className="object-cover select-none"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    draggable={false}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-[2px] transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-white/50 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]">
                      <FiPlay
                        size={32}
                        className="ml-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] transition-transform duration-300 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={slide.src}
                  alt={`${title}-${index}`}
                  fill
                  className="object-cover select-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  draggable={false}
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        {/* Botón izquierda */}
        {hasMultiple && (
          <button
            onClick={prevImage}
            className="hidden lg:block absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer backdrop-blur-sm"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {/* Botón derecha */}
        {hasMultiple && (
          <button
            onClick={nextImage}
            className="hidden lg:block absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer backdrop-blur-sm"
          >
            <FiChevronRight size={24} />
          </button>
        )}

        {/* Indicadores */}
        {hasMultiple && (
          <div 
            className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 flex gap-1.5 
            opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
            bg-black/30 lg:bg-transparent px-2 py-1 rounded-full
            transition-opacity duration-200">
            {slides.map((slide, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  slide.type === "video" ? "w-4" : "w-3"
                } ${
                  index === current
                    ? "bg-white scale-110"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* Overlay sutil al hover (más premium para store) */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
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
