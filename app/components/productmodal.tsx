"use client";

import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa";
import HighlightedDescription from "./HighlightedDescription";
import { getProductMedia } from "../types/product";

const REQUIREMENTS_IMAGE = "/info/skins_vip_admin.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  autoPlayVideo?: boolean;
  isParachute?: boolean;
  product: {
    title: string;
    price: number | string;
    images: string[];
    video?: string;
    description?: string;
    state: "disponible" | "vendida";
  } | null;
}

const ProductModal = ({ isOpen, onClose, product, initialIndex = 0, autoPlayVideo = false, isParachute = false }: ModalProps) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(isOpen);
  const [showRequirementsImage, setShowRequirementsImage] = useState(false);
  const [animateRequirementsOut, setAnimateRequirementsOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const closeRequirementsImage = useCallback(() => {
    setAnimateRequirementsOut(true);
    setTimeout(() => {
      setShowRequirementsImage(false);
      setAnimateRequirementsOut(false);
    }, 250);
  }, []);

  const slides = useMemo(
    () => (product ? getProductMedia(product.images, product.video) : []),
    [product]
  );

  const pauseCarouselVideo = () => {
    videoRef.current?.pause();
    carouselRef.current?.querySelectorAll("video").forEach((video) => video.pause());
  };

  const tryPlayVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
    } catch {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // El navegador bloqueó la reproducción automática.
      }
    }
  };

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    setCurrent(initialIndex);
  }, [product, initialIndex]);

  useEffect(() => {
    if (!isOpen) {
      pauseCarouselVideo();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !show || !autoPlayVideo || !product) return;

    const targetSlide = slides[initialIndex];
    if (targetSlide?.type !== "video") return;

    const timer = window.setTimeout(() => {
      void tryPlayVideo();
    }, 100);

    return () => window.clearTimeout(timer);
  }, [isOpen, show, autoPlayVideo, product, initialIndex, slides]);

  useEffect(() => {
    const activeSlide = slides[current];
    if (activeSlide?.type !== "video") {
      pauseCarouselVideo();
    }
  }, [current, slides]);

  useEffect(() => {
    if (!isOpen) {
      setShowRequirementsImage(false);
    }
  }, [isOpen]);

  // Pausar video cuando se abre el modal de requisitos
  useEffect(() => {
    if (showRequirementsImage) {
      pauseCarouselVideo();
    }
  }, [showRequirementsImage]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showRequirementsImage) {
          closeRequirementsImage();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, showRequirementsImage, closeRequirementsImage]);

  // Manejar animación de entrada/salida
  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200);
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

  const hasMultiple = slides.length > 1;

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    pauseCarouselVideo();
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    pauseCarouselVideo();
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

    if (distance > SWIPE_THRESHOLD) {
      pauseCarouselVideo();
      setCurrent((prev) => (prev + 1) % slides.length);
    }

    if (distance < -SWIPE_THRESHOLD) {
      pauseCarouselVideo();
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleBuy = () => {
    if (!product || product.state === "vendida") return;

    const phoneNumber = "56978049873";
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
          <FiX size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CARRUSEL */}
          <div
            ref={carouselRef}
            className="relative w-full h-full min-h-80 bg-[#1a1a1a] rounded-lg overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="relative min-w-full h-full">
                  {slide.type === "video" ? (
                    <video
                      ref={(element) => {
                        videoRef.current = element;
                      }}
                      src={slide.src}
                      poster={slide.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover select-none"
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={`${product.title}-${index}`}
                      fill
                      className="object-cover select-none"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      draggable={false}
                    />
                  )}
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
                  {slides.map((slide, index) => (
                    <span
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${slide.type === "video" ? "w-4" : "w-3"
                        } ${index === current ? "bg-white scale-110" : "bg-gray-600"
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
                {isParachute ? (
                  <>
                    Para poder usar la skin en el servidor se debe ser jugador{" "}
                    <span className="font-bold text-[#66c0f4] drop-shadow-[0_0_4px_rgba(102,192,244,0.5)]">
                      STEAM
                    </span>{" "}
                    y además haber renovado{" "}
                    <button
                      type="button"
                      onClick={() => {
                        pauseCarouselVideo();
                        setShowRequirementsImage(true);
                      }}
                      className="font-bold text-lime-500 underline decoration-lime-500/70 underline-offset-2 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)] transition-colors hover:text-lime-400 hover:decoration-lime-400 cursor-pointer"
                    >
                      SKINS, VIP o ADMIN
                    </button>{" "}
                    al menos 3 meses de manera consecutiva.
                  </>
                ) : (
                  <>
                    Para poder usar la skin en el servidor, se debe ser jugador{" "}
                    <span className="font-bold text-[#66c0f4] drop-shadow-[0_0_4px_rgba(102,192,244,0.5)]">
                      STEAM
                    </span>{" "}
                    y además, tener{" "}
                    <button
                      type="button"
                      onClick={() => {
                        pauseCarouselVideo();
                        setShowRequirementsImage(true);
                      }}
                      className="font-bold text-lime-500 underline decoration-lime-500/70 underline-offset-2 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)] transition-colors hover:text-lime-400 hover:decoration-lime-400 cursor-pointer"
                    >
                      SKINS, VIP o ADMIN.
                    </button>
                  </>
                )}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <p
                  className={`text-3xl font-semibold transition-all ${product.state === "vendida"
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
              ${product.state === "vendida"
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

      {showRequirementsImage && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm ${animateRequirementsOut ? "animate-backdrop-fade-out" : "animate-backdrop-fade"
            }`}
          onClick={(e) => {
            e.stopPropagation();
            closeRequirementsImage();
          }}
        >
          <div
            className={`relative w-full max-w-[1200px] ${animateRequirementsOut ? "animate-modal-scale-out" : "animate-modal-scale"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeRequirementsImage}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gray-900/80 text-white transition-colors hover:bg-gray-800 cursor-pointer"
              aria-label="Cerrar imagen"
            >
              <FiX size={20} />
            </button>

            <div className="relative w-full overflow-hidden rounded-xl border border-gray-700 bg-[#1a1a1a]">
              <Image
                src={REQUIREMENTS_IMAGE}
                alt="Requisitos: SKINS, VIP o ADMIN"
                width={1200}
                height={589}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
