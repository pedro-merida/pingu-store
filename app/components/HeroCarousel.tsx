"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Slide {
  title: string;
  subtitle?: ReactNode;
  image: string;
  buttonText?: string;
  buttonHref?: string;
}

const slides: Slide[] = [
  {
    title: "Bienvenido a Pingu Store",
    subtitle: (
      <>
        El catálogo de Skins hechas por el{" "} 
        <span className="font-bold text-[#C0D4FF] drop-shadow-[0_0_8px_rgba(160,190,255,0.7)]">
          Pingu
        </span>{" "}
        para el servidor{" "}
        <span className="font-bold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]">
          THNO La Maldad
        </span>
      </>
    ),
    image: "/carousel/thno_banner_v2.png",
  },
  {
    title: "Skins de Personajes",
    subtitle: (
        <>
        Personaliza tu personaje con la amplia variedad de skins disponibles,
        tanto de{" "}
        <span className="font-bold text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]">
            Terrorist
        </span>{" "}
        como de{" "}
        <span className="font-bold text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
            Counter-Terrorist
        </span>
        </>
    ),
    image: "/carousel/skins_player.png",
    buttonText: "Ir a skins de personajes",
    buttonHref: "/player",
  },
  {
    title: "Skins de Armas",
    subtitle: "Haz que tu arma tenga un aspecto único con las skins disponibles de AK47, AWP, Cuchillo, Desert Eagle y M4A1",
    image: "/carousel/skins_armas.png",
    buttonText: "Ir a skins de armas",
    buttonHref: "/weapons",
  },
];

const AUTO_TIME = 10000; // 10 segundos

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Función para limpiar el timer
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Autoplay con reinicio automático
  useEffect(() => {
    resetTimer();

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_TIME);

    return () => resetTimer();
  }, [current]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    resetTimer(); // pausa autoplay al tocar
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    // Swipe hacia la izquierda → siguiente slide
    if (distance > SWIPE_THRESHOLD) {
      next();
    }

    // Swipe hacia la derecha → slide anterior
    if (distance < -SWIPE_THRESHOLD) {
      prev();
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out touch-pan-y"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full">
            {/* Imagen de fondo */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-[70%_center] md:object-center"
              sizes="100vw"
              quality={100}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 md:bg-transparent md:bg-linear-to-r md:from-black/80 md:via-black/40 md:to-transparent" />

            {/* Texto alineado a la izquierda */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-20">
              <div className="max-w-xl text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p className="mt-4 text-lg md:text-xl text-gray-200">
                    {slide.subtitle}
                  </p>
                )}

                {/* Botón opcional */}
                {slide.buttonText && slide.buttonHref && (
                <Link
                    href={slide.buttonHref}
                    className="inline-block mt-6 bg-[#7f7b17] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#6d6d15] transition hover:scale-105"
                >
                    {slide.buttonText}
                </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón izquierda */}
      <button
        onClick={prev}
        className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Botón derecha */}
      <button
        onClick={next}
        className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-6 rounded-full transition-all ${
              current === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;