"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

interface SectionHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
}

const SectionHeader = ({ title, backHref, backLabel }: SectionHeaderProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 mb-8">
      {/* Botón volver (discreto) */}
      {backHref && (
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm mb-2 text-gray-400 hover:text-white transition w-fit"
        >
          <FiArrowLeft className="w-4 h-4" />
          {backLabel || "Volver"}
        </Link>
      )}

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        {title}
      </h1>

      {/* Línea sutil premium */}
      <div className="w-20 h-0.5 bg-linear-to-r from-[#66c0f4] to-transparent rounded-full" />
    </div>
  );
};

export default SectionHeader;