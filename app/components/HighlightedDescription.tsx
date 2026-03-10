"use client";

interface Props {
  text: string;
}

const HighlightedDescription = ({ text }: Props) => {
  if (!text) return null;

  // Divide el texto manteniendo las palabras clave
  const parts = text.split(/(Terrorists?|Counter-Terrorists?)/gi);

  return (
    <p className="text-gray-400 mt-3 leading-relaxed">
      {parts.map((part, index) => {
        const lower = part.toLowerCase();

        if (lower.includes("counter-terrorist")) {
          return (
            <span
              key={index}
              className="font-semibold text-blue-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
            >
              {part}
            </span>
          );
        }

        if (lower.includes("terrorist")) {
          return (
            <span
              key={index}
              className="font-semibold text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"
            >
              {part}
            </span>
          );
        }

        return part;
      })}
    </p>
  );
};

export default HighlightedDescription;