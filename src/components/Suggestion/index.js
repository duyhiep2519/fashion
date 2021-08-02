import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./Suggest.scss";
import { Section } from "components";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";
import { ProductCard } from "components";
import axiosClient from "api/axiosClient";

// install Swiper modules
SwiperCore.use([Pagination]);

function Suggestion() {
  const [listSuggest, setListSuggest] = useState();
  const [listRecent, setListRecent] = useState();

  useEffect(() => {
    function fetchPage() {
      axiosClient
        .get(`/product`, {
          params: { page: 1, limit: 20 },
        })
        .then((response) => {
          setListSuggest(response.result);
        })
        .catch((error) => {});
    }
    function fetchCart() {
      axiosClient
        .get("/cart/cartInfo")
        .then((response) => {
          setListRecent(response.items);
        })
        .catch((error) => {});
    }
    fetchCart();

    fetchPage();
  }, []);
  return (
    <>
      <Section title="You may so like" />
      <div className="suggestion grid wide">
        <Swiper slidesPerView={"auto"} spaceBetween={30} className="mySwiper">
          {listSuggest &&
            listSuggest.map((item, index) => (
              <div key={index}>
                <SwiperSlide>
                  <ProductCard product={item} />
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
      </div>
      <Section title="Recently viewed products" />
      <div className="suggestion grid wide">
        <Swiper slidesPerView={"auto"} spaceBetween={30} className="mySwiper">
          {listRecent &&
            listRecent.map((item, index) => (
              <div key={index}>
                <SwiperSlide>
                  <ProductCard product={item.product} />
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export default Suggestion;
