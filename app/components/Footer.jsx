"use client";

import Link from "next/link";
import { FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { SiCounterstrike } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-[#070B14] border-t border-gray-800 mt-20">
      <div className="mx-auto px-6 md:px-20 py-12">
        
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
          
          {/* Branding */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Pingu Store
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Catálogo de skins exclusivas creadas por{" "}
              <span className="font-semibold text-[#C0D4FF] drop-shadow-[0_0_8px_rgba(160,190,255,0.7)]">
                Pingu
              </span>{" "}
              para el servidor{" "}
              <span className="font-bold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]">
                THNO La Maldad
              </span>.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-gray-200">
              Navegación
            </h4>
            <div className="text-sm grid grid-cols-2 gap-3 text-gray-400">
              <Link href="/" className="hover:text-white transition">
                Inicio
              </Link>
              <Link href="/player" className="hover:text-white transition">
                Skins de Personajes
              </Link>
              <Link href="/weapons" className="hover:text-white transition">
                Skins de Armas
              </Link>
              <Link href="/packs" className="hover:text-white transition">
                Packs de Skins
              </Link>
              <Link href="/pedido" className="hover:text-white transition">
                Pedir una Skin
              </Link>
            </div>
          </div>

          {/* Comunidad / Redes */}
          <div>
            <div className="text-md flex items-center gap-1.5 mb-4">
              <h4 className="font-semibold text-gray-200">
                Comunidad
              </h4>
              <h4 className="font-semibold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]">
                THNO La Maldad
              </h4>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.gametracker.com/server_info/177.221.141.92:26242/"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-yellow-400 hover:text-yellow-300 hover:scale-110 transition"
              >
                <SiCounterstrike />
              </a>

              <a
                href="https://www.instagram.com/thnolamaldad/"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#E1306C] hover:text-[#C13584] hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/@thnolamaldad"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#FF0000] hover:text-[#cc0000] hover:scale-110 transition"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.tiktok.com/@thnolamaldad"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:text-gray-400 hover:scale-110 transition"
              >
                <FaTiktok />
              </a>

              <a
                href="https://discord.gg/fUtPyy7xTE"
                target="_blank"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#5865F2] hover:text-[#4752C4] hover:scale-110 transition"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Pingu Store — Skins para THNO La Maldad
        </div>
      </div>
    </footer>
  );
};

export default Footer;