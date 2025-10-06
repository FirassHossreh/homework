import { useEffect, useState } from "react";
import "./App.css";
import ProductSlider from "./components/product-swiper";
import FilterBar from "./components/filter-bar";
import axios from "axios";
import type { ProductType } from "./types/product";
import { Spin } from "antd";
import "antd/dist/reset.css";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [goldPrice, setGoldPrice] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minPopularity: "",
    maxPopularity: "",
  });
  const [loading, setLoading] = useState(false);

  const getProducts = async (query = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://homework-pt46.onrender.com/products${query}`
      );
      setProducts(res.data.products);
      setGoldPrice(parseFloat(res.data.goldPriceUSD));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.minPopularity)
      params.append("minPopularity", filters.minPopularity);
    if (filters.maxPopularity)
      params.append("maxPopularity", filters.maxPopularity);
    getProducts(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      minPopularity: "",
      maxPopularity: "",
    });
    getProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-center font-Avenir font-normal text-[45px] my-4">
        Product List
      </h1>

      {goldPrice && (
        <p className="text-center text-gray-500 mb-6">
          Güncel Altın Fiyatı: <strong>{goldPrice} USD / gram</strong>
        </p>
      )}

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      {loading ? (
        <div className="flex justify-center my-20">
          <Spin size="large" tip="Ürünler yükleniyor..." />
        </div>
      ) : products.length > 0 ? (
        <ProductSlider Products={products} />
      ) : (
        <p className="text-center text-gray-500">
          Filtrenize uygun ürün bulunamadı.
        </p>
      )}
    </div>
  );
}

export default App;
