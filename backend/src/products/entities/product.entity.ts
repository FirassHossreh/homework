// src/products/entities/product.entity.ts
export class Product {
  id: string;
  name: string;
  popularityScore: number; // 0-100 arası yüzde
  weight: number; // gram
  images: {
    yellow: string;
    white: string;
    rose: string;
  };
}

export class ProductResponse extends Product {
  price: number;
  rating: number; // 0-5 arası
}
