"use client";

import Script from "next/script";
import Image from 'next/image'
import HeroCarousel from './components/HeroCarousel'
import AboutSection from './components/AboutSection'
import { FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { SiCounterstrike } from "react-icons/si";
import LatestSkinsCarousel from "./components/LatestSkinsCarousel";
import { weapons } from "./data/weapons";
import { players } from "./data/players";
import { parachutes } from "./data/parachutes";
import { packs } from "./data/packs";
import { useState } from 'react';
import ProductModal from './components/productmodal';

import { CatalogProduct, getProductMedia } from "./types/product";

export default function Home() {
  const socialsTHNO = [
    {
      icon: <SiCounterstrike />,
      color: "text-yellow-400 hover:text-yellow-300", // Gametracker (oro)
      link: "https://www.gametracker.com/server_info/177.221.141.92:26242/",
    },
    {
      icon: <FaInstagram />,
      color: "text-[#E1306C] hover:text-[#C13584]",
      link: "https://www.instagram.com/thnolamaldad/",
    },
    {
      icon: <FaYoutube />,
      color: "text-[#FF0000] hover:text-[#cc0000]",
      link: "https://www.youtube.com/@thnolamaldad",
    },
    {
      icon: <FaTiktok />,
      color: "text-white hover:text-gray-400",
      link: "https://www.tiktok.com/@thnolamaldad",
    },
    {
      icon: <FaDiscord />,
      color: "text-[#5865F2] hover:text-[#4752C4]",
      link: "https://discord.gg/fUtPyy7xTE",
    },
  ];

  const socialsPingu = [
    {
      icon: <FaWhatsapp />,
      color: "text-green-500 hover:text-green-400",
      link: "/pedido",
    },
  ];

  const latestSkins = [
    ...weapons.map((w) => ({ ...w, category: "weapon" as const })),
    ...players.map((p) => ({ ...p, category: "player" as const })),
    ...parachutes.map((p) => ({ ...p, category: "parachute" as const })),
    ...packs.map((p) => ({ ...p, category: "pack" as const })),
  ]
    .sort((a, b) => {
      const dateDiff =
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return dateDiff !== 0 ? dateDiff : b.id - a.id;
    })
    .slice(0, 6);

  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);

  const openModal = (product: CatalogProduct, mediaIndex = 0) => {
    const slides = getProductMedia(product.images, product.video);
    setModalStartIndex(mediaIndex);
    setAutoPlayVideo(slides[mediaIndex]?.type === "video");
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setAutoPlayVideo(false);
  };

  return (
    <main>
      <HeroCarousel />
      
      <AboutSection
        imagePosition="right"
        title="Acerca de"
        highlightName="THNO La Maldad"
        imageSrc="/about/thno.jpg"
        description={
          <>
            <span className="font-bold text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]">
              THNO La Maldad
            </span>{" "}
            es un servidor chileno de Counter-Strike 1.6 que permite al jugador
            personalizar la apariencia de los personajes y las armas para construir
            una identidad única dentro del juego. Este catálogo reúne una colección
            exclusiva de skins diseñadas por{" "}
            <span className="font-bold text-[#C0D4FF] drop-shadow-[0_0_8px_rgba(160,190,255,0.7)]">
              Pingu
            </span>{" "}
            especialmente para el servidor.
          </>
        }
        socials={socialsTHNO}
      />

      <LatestSkinsCarousel
        products={latestSkins}
        onCardClick={openModal}
      />
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={closeModal}
        product={selectedProduct}
        initialIndex={modalStartIndex}
        autoPlayVideo={autoPlayVideo}
      />

      <AboutSection
        imagePosition="left"
        title="Creación de"
        highlightName="Skins a pedido"
        imageSrc="/about/custom_skin.png"
        description={
          <>
            Las skins de este catálogo son creadas y/o modificadas por{" "}
            <span className="font-bold text-[#C0D4FF] drop-shadow-[0_0_8px_rgba(160,190,255,0.7)]">
              Pingu
            </span>.
            ¿Quieres una skin personalizada para ti? Envía tu idea por{" "}
            <span className="font-bold text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.7)]">
              Whatsapp
            </span>{" "}
            y podría hacerse realidad.
          </>
        }
        socials={socialsPingu}
        buttonVariant='cta'
      />

      <Script id="chtl-config" strategy="afterInteractive">
        {`window.chtlConfig = { chatbotId: "1696159535" }`}
      </Script>
      <Script
        id="chtl-script"
        src="https://chatling.ai/js/embed.js"
        strategy="afterInteractive"
        data-id="1696159535"
      />
    </main>
  )
}
