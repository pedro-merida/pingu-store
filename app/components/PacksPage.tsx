"use client";

import React, { useMemo, useState, useEffect } from "react";
import Card from "./card";
import ProductModal from "./productmodal";
import { packs } from "../data/packs";
import { FiSearch } from "react-icons/fi";
import AvailabilityNotice from "../components/AvailabilityNotice";
import { espacios } from "../data/espacios";

type SortOption = "az" | "za" | "newest" | "oldest" | "price-asc" | "price-desc";
type FilterOption = "all" | "disponible" | "vendida";

interface PacksPageProps {
  typeFilter?: string;
}

const PacksPage = ({ typeFilter }: PacksPageProps) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selectedProduct, setSelectedProduct] = useState<typeof packs[0] | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 300);
  //   return () => clearTimeout(timer);
  // }, []);

  const openModal = (product: typeof packs[0]) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const parsePrice = (price: string | number) => {
    if (typeof price === "number") return price;
    // eliminar todo lo que no sea número
    return Number(price.replace(/[^0-9]/g, ""));
  };

  const filteredProducts = useMemo(() => {
    let filtered = packs;

    if (typeFilter) {
      filtered = filtered.filter(
        (product) => product.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    // Buscador
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    //Nuevo filtro por estado
    if (filter !== "all") {
      filtered = filtered.filter((product) => product.state === filter);
    }

    switch (sort) {
      case "az":
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
      case "newest":
        return [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return [...filtered].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "price-asc":
        return [...filtered].sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
      case "price-desc":
        return [...filtered].sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        );
      default:
        return filtered;
    }
  }, [search, sort, filter, typeFilter]);

  // Mostrar loader si está cargando
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-black">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-8">
      {/* Header, filtros y buscador */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* Contenedor de filtros */}
        <div className="flex flex-col md:flex-row md:items-end gap-6">

          {/* Filtro: Ordenar */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-300/50 uppercase tracking-wide">
              Ordenar por...
            </span>
            <div className="relative w-full md:w-64">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="w-full appearance-none px-4 py-2 pr-10 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white focus:outline-none focus:border-gray-500 cursor-pointer"
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguos</option>
                <option value="az">Nombre: A → Z</option>
                <option value="za">Nombre: Z → A</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
            </div>
          </div>

          {/* Filtro: Mostrar */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-300/50 uppercase tracking-wide">
              Mostrar
            </span>
            <div className="relative w-full md:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterOption)}
                className="w-full appearance-none px-4 py-2 pr-10 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white focus:outline-none focus:border-gray-500 cursor-pointer"
              >
                <option value="all">Todo</option>
                <option value="disponible">Disponibles</option>
                <option value="vendida">Vendidas</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-300/50 uppercase tracking-wide">
              Disponibilidad de cupos
            </span>
            <div className="relative flex flex-col md:flex-row gap-3">
              <AvailabilityNotice
                type="weapon"
                status={espacios.weapon}
              />
              <AvailabilityNotice
                type="player"
                status={espacios.player}
              />
            </div>
          </div>

        </div>

        {/* Buscador (se mantiene a la derecha) */}
        <div className="flex flex-col gap-2 w-full md:w-80">
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar pack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.25 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              images={product.images}
              title={product.title}
              price={product.price}
              state={product.state}
              onClick={() => openModal(product)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-16 text-lg">
            No se encontraron armas con ese nombre.
          </div>
        )}
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default PacksPage;