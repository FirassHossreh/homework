import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { ProductType } from "../types/product";
import "swiper/swiper-bundle.css";
import Product from "./product";
type ProductSliderProps = {
  Products: ProductType[];
};

export default function ProductSwiper({ Products }: ProductSliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {Products.map((product, index) => {
        return (
          <SwiperSlide key={index}>
            <Product product={product} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
