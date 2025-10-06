import { useState } from 'react';
import type { ProductType } from '../types/product';
import StartsRating from './starts-rating';

type ProductProps = {
  product: ProductType;
  index: number;
};
type ColorKey = {
  name: 'white' | 'rose' | 'yellow';
  color: string;
  description: string;
};

const colorKeys = [
  { name: 'yellow', color: '#E6CA97', description: 'Yellow' },
  { name: 'rose', color: '#E1A4A9', description: 'rose' },
  { name: 'white', color: '#D9D9D9', description: 'white' },
] as const;

export default function Product({ product, index }: ProductProps) {
  const [selectedColor, setSelectedColor] = useState<ColorKey>(colorKeys[0]);

  const handleColorSelect = (color: ColorKey) => {
    setSelectedColor(color);
  };
  const popularityOutOfFive = (product.popularityScore * 5).toFixed(1);
  return (
    <>
      <div className="border rounded- p-4 shadow hover:shadow-lg ">
        <img
          src={product.images[selectedColor.name]}
          alt={`${product.name} - ${selectedColor}`}
          className="w-full object-cover"
        />
        <h3 className="text-lg font-Montserat font-medium text-[15px] mt-2 font-montserrat">
          {product.name}
        </h3>
        <p className="text-gray-600 font-Montserat font-normal text-[15px]">${product.price} USD</p>
        <div className="text-yellow-600 font-Avenir font-normal text-[14px]">
          <StartsRating rating={parseFloat(popularityOutOfFive)} /> {popularityOutOfFive} / 5
        </div>
        <div className="flex gap-2 my-4">
          {colorKeys.map((color, colorIndex) => (
            <div className="flex flex-col items-center" key={colorIndex}>
              <div
                className={`w-6 h-6 rounded-full border-2 cursor-pointer flex justify-center items-center  ${
                  selectedColor.name === color.name ? 'border-black border' : 'border-transparent'
                }`}
              >
                <button
                  onClick={() => handleColorSelect(color)}
                  className={`w-4 h-4 rounded-full cursor-pointer `}
                  style={{ backgroundColor: color.color }}
                />
              </div>
              <div className="font-Avenir font-normal text-[12px]">
                {selectedColor.description === color.description ? color.description : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
