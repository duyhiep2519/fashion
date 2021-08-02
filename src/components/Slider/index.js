import React, { useState } from "react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/components/pagination/pagination.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "./Slider.scss";

SwiperCore.use([Pagination]);

function Slider() {
  const [change, setChange] = useState(0);

  return (
    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={(e) => setChange(e.activeIndex)}
      className="swiper"
    >
      <SwiperSlide>
        <div className="swiper">
          <picture>
            <div
              className={`swiper__text ${
                change === 0 && "swiper__text--active"
              }`}
            >
              <span>SUMMER SALE 2020</span>
              <h1>NEW ARRIVAL COLLECTION</h1>
              <div className="swiper__btn">Explore Now</div>
            </div>
            <img
              alt="slide"
              srcSet="//cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_180x.jpg?v=1585640322 180w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_360x.jpg?v=1585640322 360w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_540x.jpg?v=1585640322 540w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_720x.jpg?v=1585640322 720w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_900x.jpg?v=1585640322 900w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_1080x.jpg?v=1585640322 1080w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_1296x.jpg?v=1585640322 1296w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_1512x.jpg?v=1585640322 1512w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_1728x.jpg?v=1585640322 1728w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_1950x.jpg?v=1585640322 1950w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_2100x.jpg?v=1585640322 2100w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_2260x.jpg?v=1585640322 2260w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_2450x.jpg?v=1585640322 2450w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_2700x.jpg?v=1585640322 2700w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_3000x.jpg?v=1585640322 3000w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_3350x.jpg?v=1585640322 3350w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_3750x.jpg?v=1585640322 3750w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider11_2bfeeb77-be99-4c7c-8354-a628a9d424d5_4100x.jpg?v=1585640322 4100w"
            ></img>
          </picture>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper">
          <picture>
            <div
              className={`swiper__text--right ${
                change === 1 && "swiper__text--activeRight"
              }`}
            >
              <span>SUMMER SALE 2020</span>
              <h1>NEW ARRIVAL COLLECTION</h1>
              <div className="swiper__btn">Explore Now</div>
            </div>
            <img
              alt="slide"
              srcSet="//cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_180x.jpg?v=1585640309 180w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_360x.jpg?v=1585640309 360w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_540x.jpg?v=1585640309 540w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_720x.jpg?v=1585640309 720w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_900x.jpg?v=1585640309 900w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_1080x.jpg?v=1585640309 1080w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_1296x.jpg?v=1585640309 1296w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_1512x.jpg?v=1585640309 1512w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_1728x.jpg?v=1585640309 1728w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_1950x.jpg?v=1585640309 1950w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_2100x.jpg?v=1585640309 2100w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_2260x.jpg?v=1585640309 2260w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_2450x.jpg?v=1585640309 2450w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_2700x.jpg?v=1585640309 2700w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_3000x.jpg?v=1585640309 3000w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_3350x.jpg?v=1585640309 3350w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_3750x.jpg?v=1585640309 3750w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider12_4d489365-da55-49c6-9504-a1f5f82b4111_4100x.jpg?v=1585640309 4100w"
            ></img>
          </picture>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="swiper">
          <picture>
            <div
              className={`swiper__text ${
                change === 2 && "swiper__text--active"
              }`}
            >
              <span>SUMMER SALE 2020</span>
              <h1>NEW ARRIVAL COLLECTION</h1>
              <div className="swiper__btn">Explore Now</div>
            </div>
            <img
              alt="slide"
              srcSet="//cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_180x.jpg?v=1585640180 180w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_360x.jpg?v=1585640180 360w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_540x.jpg?v=1585640180 540w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_720x.jpg?v=1585640180 720w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_900x.jpg?v=1585640180 900w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_1080x.jpg?v=1585640180 1080w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_1296x.jpg?v=1585640180 1296w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_1512x.jpg?v=1585640180 1512w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_1728x.jpg?v=1585640180 1728w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_1950x.jpg?v=1585640180 1950w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_2100x.jpg?v=1585640180 2100w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_2260x.jpg?v=1585640180 2260w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_2450x.jpg?v=1585640180 2450w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_2700x.jpg?v=1585640180 2700w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_3000x.jpg?v=1585640180 3000w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_3350x.jpg?v=1585640180 3350w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_3750x.jpg?v=1585640180 3750w, //cdn.shopify.com/s/files/1/0332/6420/5963/files/slider13_49090674-d1ef-4c34-95b9-19c1edac4d15_4100x.jpg?v=1585640180 4100w"
            ></img>
          </picture>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
