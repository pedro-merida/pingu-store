"use client";

import RequestSkinSection from "../components/RequestSkinSection";
import SectionHeader from "../components/SectionHeader";
import { custom } from "../data/custom";
import ProductModal from '../components/productmodal';
import { CatalogProduct } from "../types/product";
import { useState } from "react";
import CustomSkinsExampleCarousel from "../components/CustomSkinsExampleCarousel";

export default function Players() {

  const latestSkins = [
      ...custom.map((p) => ({ ...p, category: "custom" as const })),
    ]

  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  
  const openModal = (product: CatalogProduct) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="px-10 py-6 space-y-8">
      <SectionHeader
        title="Pedir una Skin"
        backHref="/"
        backLabel="Volver al Inicio"
      />
      <RequestSkinSection />

      <CustomSkinsExampleCarousel
        products={latestSkins}
        onCardClick={openModal}
      />

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={closeModal}
        product={selectedProduct}
      />
      
    </div>
  )
}