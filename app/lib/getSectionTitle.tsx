export const getSectionTitle = (
  base: "player" | "weapons" | "packs",
  type?: string
) => {
  if (!type) {
    if (base === "player") return "Skins de Personaje";
    if (base === "weapons") return "Skins de Armas";
    if (base === "packs") return "Packs de Skins";
  }

  const map: Record<string, string> = {
    // Facciones
    tt: "Skins de Terrorist",
    ct: "Skins de Counter-Terrorist",

    // Armas
    ak47: "Skins de AK-47",
    awp: "Skins de AWP",
    deagle: "Skins de Deagle",
    m4a1: "Skins de M4A1",
    cuchillo: "Skins de Cuchillos",
  };

  const key = type?.toLowerCase() ?? "";
  return map[key] || "Catálogo de Skins";
};