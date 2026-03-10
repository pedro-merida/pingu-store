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

export interface CatalogProduct extends BaseProduct {
  category: "weapon" | "player" | "pack" | "custom";
}