"use client";

import { useState, useCallback, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Image from "next/image";

const REQUIREMENTS_IMAGE = "/info/skins_vip_admin.png";

const RequestSkinSection = () => {
  const [showRequirementsImage, setShowRequirementsImage] = useState(false);
  const [animateRequirementsOut, setAnimateRequirementsOut] = useState(false);

  const closeRequirementsImage = useCallback(() => {
    setAnimateRequirementsOut(true);
    setTimeout(() => {
      setShowRequirementsImage(false);
      setAnimateRequirementsOut(false);
    }, 250);
  }, []);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showRequirementsImage) {
        closeRequirementsImage();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showRequirementsImage, closeRequirementsImage]);



  const handleRequest = () => {
    const phoneNumber = "56978049873";
    const message =
      "Hola Pingu, vengo de Pingu Store y me gustaría pedir una skin personalizada.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="w-full md:px-20">
      <div className="mx-auto">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            ¿No encuentras la Skin que buscas?
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Puedes solicitar una Skin completamente personalizada para ti.
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-[#111827] border border-gray-700 rounded-2xl p-8 shadow-xl">
          
          {/* Explicación */}
          <p className="text-gray-300 leading-relaxed text-md md:text-lg">
            Todas las Skins del catálogo son creadas o modificadas por{" "}
            <span className="font-bold text-[#C0D4FF] drop-shadow-[0_0_8px_rgba(160,190,255,0.6)]">
              Pingu
            </span>.
            <br /><br />
            Si quieres una Skin específica que no se encuentre en el catálogo
            (ya sea de personaje o de arma), existe la posibilidad de que
            pueda ser creada especialmente para ti.
          </p>

          {/* Tipos de solicitudes */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-[#060f20] border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)] mb-2">
                Skins de Personaje
              </h3>
              <p className="text-gray-400">
                Puedes pedir personajes específicos que no estén en el catálogo actual
                y que serán asignados a{" "}
                <span className="font-bold text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]">
                  Terrorist
                </span>{" "}
                o{" "}
                <span className="font-bold text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                  Counter-Terrorist 
                </span>{" "}
                dependiendo de la paleta de colores del personaje.
              </p>
            </div>

            <div className="bg-[#060f20] border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)] mb-2">
                Skins de Armas
              </h3>
              <p className="text-gray-400">
                También puedes solicitar Skins personalizadas para armas
                como AK-47, AWP, M4A1, Cuchillo, entre otras.
              </p>
            </div>
          </div>

          {/* Disclaimer elegante */}
          <div className="mt-8 p-4 rounded-lg bg-[#030915] border border-gray-800">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="font-bold text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]">
                Importante:
              </span>{" "}
              Es igual de probable que la Skin pueda realizarse como que no,
              ya que depende de algunos factores que deben revisarse antes de
              aceptar la solicitud. Además para solicitar una Skin se{" "}
              <span className="font-bold text-[white] drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">
                debe
              </span>{" "}
              ser jugador{" "}
              <span className="font-bold text-[#66c0f4] drop-shadow-[0_0_4px_rgba(102,192,244,0.5)]">
                STEAM
              </span>{" "}
              y tener{" "}
              <button
                type="button"
                onClick={() => setShowRequirementsImage(true)}
                className="font-bold text-lime-500 underline decoration-lime-500/70 underline-offset-2 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)] transition-colors hover:text-lime-400 hover:decoration-lime-400 cursor-pointer"
              >
                SKINS, VIP o ADMIN.
              </button>
            </p>
          </div>

          {/* Botón CTA */}
          <div className="mt-10 flex justify-center">
            <button
                onClick={handleRequest}
                className="w-full md:w-auto px-8 py-4 bg-[#25D366] hover:bg-green-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-3 text-sm md:text-lg shadow-lg hover:shadow-green-900/30"
            >
                <FaWhatsapp className="w-6 h-6" />
                Solicitar una Skin
            </button>
          </div>
        </div>
      </div>

      {showRequirementsImage && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm ${
            animateRequirementsOut ? "animate-backdrop-fade-out" : "animate-backdrop-fade"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            closeRequirementsImage();
          }}
        >
          <div
            className={`relative w-full max-w-[1200px] ${
              animateRequirementsOut ? "animate-modal-scale-out" : "animate-modal-scale"
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
    </section>
  );
};

export default RequestSkinSection;