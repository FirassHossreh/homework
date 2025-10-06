// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

// Basit products data - gerçek uygulamada database'den gelmeli
const mockProducts = [
  {
    id: '1',
    name: 'Classic Gold Ring',
    popularityScore: 90,
    weight: 15.5,
    images: {
      yellow: 'https://picsum.photos/300/300?random=1',
      white: 'https://picsum.photos/300/300?random=2',
      rose: 'https://picsum.photos/300/300?random=3',
    },
  },
  {
    id: '2',
    name: 'Elegant Gold Necklace',
    popularityScore: 85,
    weight: 25.2,
    images: {
      yellow: 'https://picsum.photos/300/300?random=4',
      white: 'https://picsum.photos/300/300?random=5',
      rose: 'https://picsum.photos/300/300?random=6',
    },
  },
  {
    id: '3',
    name: 'Modern Gold Bracelet',
    popularityScore: 75,
    weight: 18.7,
    images: {
      yellow: 'https://picsum.photos/300/300?random=7',
      white: 'https://picsum.photos/300/300?random=8',
      rose: 'https://picsum.photos/300/300?random=9',
    },
  },
];

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  private async getGoldPrice(): Promise<number> {
    try {
      // Fallback gold price - gerçek uygulamada API'den çekilmeli
      return 65.5; // USD per gram
    } catch (error) {
      console.log('Gold API error, using fallback price');
      return 65.5;
    }
  }

  private calculatePrice(product: any, goldPrice: number): number {
    return (product.popularityScore / 100 + 1) * product.weight * goldPrice;
  }

  async findAll(filters?: any) {
    const goldPrice = await this.getGoldPrice();

    let filteredProducts = mockProducts;

    // Filtreleme
    if (filters) {
      filteredProducts = mockProducts.filter((product) => {
        const price = this.calculatePrice(product, goldPrice);
        const rating = (product.popularityScore / 100) * 5;

        let pass = true;
        if (filters.minPrice && price < filters.minPrice) pass = false;
        if (filters.maxPrice && price > filters.maxPrice) pass = false;
        if (filters.minPopularity && rating < filters.minPopularity)
          pass = false;

        return pass;
      });
    }

    return filteredProducts.map((product) => ({
      ...product,
      price: parseFloat(this.calculatePrice(product, goldPrice).toFixed(2)),
      rating: parseFloat(((product.popularityScore / 100) * 5).toFixed(1)),
    }));
  }
}
