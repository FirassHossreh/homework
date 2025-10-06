import { useEffect, useState } from 'react';
import './App.css';
import ProductSlider from './components/product-swiper';
import axios from 'axios';
import type { ProductType } from './types/product';

function App() {
  const [products, setProducts] = useState<ProductType[]>();
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`https://case-study-9sbf.onrender.com/products`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="">
      <h1 className="text-center font-Avenir font-normal text-[45px] my-4">Product List</h1>
      {products && <ProductSlider Products={products} />}
    </div>
  );
}

export default App;
