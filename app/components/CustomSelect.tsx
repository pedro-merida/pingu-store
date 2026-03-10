"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  width?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  width = "w-full",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${width}`}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#0b0b0b] border border-gray-700 text-white hover:border-gray-500 transition"
      >
        {selected?.label}

        <FiChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-[#0b0b0b] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition
                ${
                  option.value === value
                    ? "bg-blue-900 text-white"
                    : "hover:bg-[#121d39] hover:text-white"
                }
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}