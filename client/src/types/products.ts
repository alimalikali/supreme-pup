export type Product = {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
    __v: number;
  };
  brand: {
    _id: string;
    name: string;
    __v: number;
  };
  price: {
    discount: {
      percentage: number;
      expiry: string; // ISO Date String
    };
    original: number;
    current: number;
    currency: string;
  };
  thumbnail: {
    public_id: string;
    url: string;
  };
  shipping: {
    dimensions: {
      width: string;
      height: string;
      depth: string;
    };
    weight: string;
    availableRegions: string[];
  };
  stockQuantity: number;
  images: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  isDeleted: boolean;
  slug: string;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
};
