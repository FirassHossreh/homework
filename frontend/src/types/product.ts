export interface ProductType {
  id: string;
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    white: string;
    rose: string;
  };
  price: number;
  rating: number;
}
