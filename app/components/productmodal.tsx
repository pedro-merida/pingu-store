"use client";

import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import HighlightedDescription from "./HighlightedDescription";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: number | string;
    images: string[];
    description?: string;
    state: "disponible" | "vendida";
  } | null;
}

const ProductModal = ({ isOpen, onClose, product }: ModalProps) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(isOpen);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  // Resetear carrusel cuando cambia el producto
  useEffect(() => {
    setCurrent(0);
  }, [product]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Manejar animación de entrada/salida
  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200); // duración de la animación
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!show || !product) return null;

  const hasMultiple = product.images.length > 1;

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + product.images.length) % product.images.length);
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

    if (distance > SWIPE_THRESHOLD) {
      setCurrent((prev) => (prev + 1) % product.images.length);
    }

    if (distance < -SWIPE_THRESHOLD) {
      setCurrent((prev) => (prev - 1 + product.images.length) % product.images.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleBuy = () => {
    if (!product || product.state === "vendida") return;

    const phoneNumber = "56978049873"; // tu número de WhatsApp en formato internacional
    const message = `Hola, vengo de Pingu Store y quiero comprar la skin "${product.title}" de valor $${product.price}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm p-4 overflow-y-auto transition-opacity duration-200
      bg-black/70`}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className={`bg-[#0b0b0b] border border-gray-700 rounded-xl w-full max-w-4xl p-6 relative max-h-[95vh] overflow-y-auto transition-transform duration-200
          ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center
          w-11 h-11 rounded-full
          bg-gray-900/60 backdrop-blur-lg
          border border-white/10
          text-white hover:bg-gray-800/80
          transition-all duration-200
          z-20 cursor-pointer"
        >
          <FiX size={20}/>
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CARRUSEL */}
          <div 
            className="relative w-full h-full min-h-80 bg-[#1a1a1a] rounded-lg overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {product.images.map((img, index) => (
                <div key={index} className="relative min-w-full h-full">
                  <Image
                    src={img}
                    alt={`${product.title}-${index}`}
                    fill
                    className="object-cover select-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {hasMultiple && (
              <>
                {/* Flecha izquierda */}
                <button
                  onClick={prevImage}
                  className="hidden lg:block absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                >
                  <FiChevronLeft size={24} />
                </button>

                {/* Flecha derecha */}
                <button
                  onClick={nextImage}
                  className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                >
                  <FiChevronRight size={24} />
                </button>

                {/* Indicadores */}
                <div 
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 
                  opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                  bg-black/30 lg:bg-transparent px-2 py-1 rounded-full
                  transition-opacity duration-200"
                >
                  {product.images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-3 rounded-full transition-all duration-300 ${
                        index === current ? "bg-white scale-110" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white pr-8">
                {product.title}
              </h2>

              <HighlightedDescription
                text={
                  product.description ||
                  "Skin exclusiva disponible en Pingu Store. Vista detallada del producto en alta calidad."
                }
              />

              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                <span className="font-bold text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]">
                  Importante:
                </span>{" "}
                Solo comprar la skin si es que eres jugador{" "}
                <span className="font-bold text-[#66c0f4] drop-shadow-[0_0_4px_rgba(102,192,244,0.5)]">
                  STEAM.
                </span>
              </p>

              <div className="mt-8 flex items-center gap-3">
                <p
                  className={`text-3xl font-semibold transition-all ${
                    product.state === "vendida"
                      ? "text-gray-500 line-through"
                      : "text-white"
                  }`}
                >
                  ${product.price}
                </p>

                {product.state === "vendida" && (
                  <span className="text-red-500 font-bold text-lg tracking-wide">
                    VENDIDA
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={product.state === "vendida" ? undefined : handleBuy}
              disabled={product.state === "vendida"}
              className={`mt-6 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2
              ${
                product.state === "vendida"
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-[#25D366] text-white hover:bg-[#1EBE5D] cursor-pointer"
              }`}
            >
              <FaWhatsapp className="w-5 h-5" />
              {product.state === "vendida" ? "Skin vendida" : "Comprar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;