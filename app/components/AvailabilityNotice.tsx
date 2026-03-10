"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaExclamationTriangle,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import type { Status, Type } from "../data/espacios";

interface Props {
  status: Status;
  type: Type;
}

const AvailabilityNotice = ({ status, type }: Props) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const label = type === "player" ? "Personaje" : "Armas";

  const config = {
    disponible: {
      icon: <FaCheckCircle className="text-green-400 animate-pulse" size={14} />,
      text: "Disponibles.",
      tooltip: `El servidor acepta un cupo limitado de Skins Personalizadas de ${label}. Actualmente hay cupos disponibles.`,
      badgeBg: "bg-green-500/10 border-green-500/30 text-green-300",
      tooltipBg: "bg-green-900 border-green-500/40 text-green-200",
    },
    ultimos: {
      icon: (
        <FaExclamationTriangle className="text-yellow-400 animate-pulse" size={14} />
      ),
      text: "Últimos cupos.",
      tooltip: `El servidor acepta un cupo limitado de Skins Personalizadas de ${label}. Actualmente quedan muy pocos cupos disponibles.`,
      badgeBg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
      tooltipBg: "bg-yellow-900 border-yellow-500/40 text-yellow-200",
    },
    vendido: {
      icon: (
        <FaExclamationCircle className="text-red-500 animate-pulse" size={14} />
      ),
      text: "Agotados.",
      tooltip: `El servidor acepta un cupo limitado de Skins Personalizadas de ${label}. Actualmente no hay cupos disponibles.`,
      badgeBg: "bg-red-500/10 border-red-500/30 text-red-300",
      tooltipBg: "bg-red-950 border-red-500/40 text-red-200",
    },
  };

  const current = config[status];

  // 🔥 Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block group"
    >
      {/* Badge */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // 🔥 evita cierre inmediato
          setOpen((prev) => !prev);
        }}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm border backdrop-blur-sm cursor-pointer ${current.badgeBg}`}
      >
        {current.icon}
        <span className="font-medium">{label}:</span>
        <span>{current.text}</span>
      </div>

      {/* Tooltip arriba */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          bottom-21/20 mb-2
          w-64
          px-3 py-2 rounded-lg text-xs border
          ${current.tooltipBg} shadow-2xl
          transition-all duration-200
          z-50

          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          
          ${open ? "opacity-100 visible" : ""}
        `}
      >
        {current.tooltip}

        <div
          className={`absolute left-1/2 -translate-x-1/2 top-10/11
                     w-3 h-3 border-r border-b ${current.tooltipBg}
                     rotate-45`}
        />
      </div>
    </div>
  );
};

export default AvailabilityNotice;