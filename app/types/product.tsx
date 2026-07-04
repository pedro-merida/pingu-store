export interface BaseProduct {
  id: number;
  type: string;
  title: string;
  price: string;
  description?: string;
  state: "disponible" | "vendida";
  images: string[];
  createdAt: string;
}

export interface WeaponProduct extends BaseProduct {
  video?: string;
}

export interface CatalogProduct extends BaseProduct {
  category: "weapon" | "player" | "pack" | "custom" | "parachute";
  video?: string;
}

export type MediaSlide =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

export function getProductMedia(
  images: string[],
  video?: string
): MediaSlide[] {
  const slides: MediaSlide[] = [];

  if (video) {
    slides.push({ type: "video", src: video, poster: images[0] });
  }

  images.forEach((src) => slides.push({ type: "image", src }));

  return slides;
}