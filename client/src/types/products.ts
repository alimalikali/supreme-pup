export type Image = {
  url: string;
};

export type Price = {
  price: number;
  currency: string;
};

type Dimensions = {
  height: number;
  width: number;
  depth: number;
};

type Review = {
  user: string;
  rating: number;
  comment: string;
  date: string; // ISO date string
};

export type Variant = {
  sku: string;
  firstImage: { url: string };
  price: Price;
  stock: number;
  color: string;
  size: string;
};

export type Product = {
  id: string;
  name: string;
  path: string;
  description: string;
  brand: string;
  category: string;
  tags: string[];
  Variant: Variant;
  variants: Variant[];
  images: Image[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  stockStatus: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  shippingCost: number;
  averageRating: number;
  reviews: Review[];
  warranty: string;
  returnPolicy: string;
  isFeatured: boolean;
  createdAt: string; // ISO date string
};
