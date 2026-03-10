"use client";

import React, { useMemo, useState, useEffect } from "react";
import Card from "../components/card";
import ProductModal from "../components/productmodal";
import { players } from "../data/players";
import { FiSearch } from "react-icons/fi";
import AvailabilityNotice from "../components/AvailabilityNotice";
import { espacios } from "../data/espacios";
import CustomSelect from "./CustomSelect";

type SortOption = "az" | "za" | "newest" | "oldest" | "price-asc" | "price-desc";
type FilterOption = "all" | "disponible" | "vendida";

interface PlayersPageProps {
  typeFilter?: string;
}

const PlayersPage = ({ typeFilter }: PlayersPageProps) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selectedProduct, setSelectedProduct] = useState<typeof players[0] | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 300);
  //   return () => clearTimeout(timer);
  // }, []);

  const openModal = (product: typeof players[0]) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const parsePrice = (price: string | number) => {
    if (typeof price === "number") return price;
    // eliminar todo lo que no sea número
    return Number(price.replace(/[^0-9]/g, ""));
  };

  const filteredProducts = useMemo(() => {
    let filtered = players;

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
            <CustomSelect
              value={sort}
              onChange={(v) => setSort(v as SortOption)}
              options={[
                { value: "newest", label: "Más recientes" },
                { value: "oldest", label: "Más antiguos" },
                { value: "az", label: "Nombre: A → Z" },
                { value: "za", label: "Nombre: Z → A" },
                { value: "price-asc", label: "Precio: Menor a Mayor" },
                { value: "price-desc", label: "Precio: Mayor a Menor" },
              ]}
              width="md:w-64"
            />
          </div>

          {/* Filtro: Mostrar */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-300/50 uppercase tracking-wide">
              Mostrar
            </span>
            <CustomSelect
              value={filter}
              onChange={(v) => setFilter(v as FilterOption)}
              options={[
                { value: "all", label: "Todo" },
                { value: "disponible", label: "Disponibles" },
                { value: "vendida", label: "Vendidas" },
              ]}
              width="md:w-48"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-300/50 uppercase tracking-wide">
              Disponibilidad de cupos
            </span>
            <AvailabilityNotice
              type="player"
              status={espacios.player}
            />
          </div>

        </div>

        {/* Buscador (se mantiene a la derecha) */}
        <div className="flex flex-col gap-2 w-full md:w-72">
          <div className="relative">
            <FiSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar personaje..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition"
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

export default PlayersPage;