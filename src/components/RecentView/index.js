import axiosClient from "api/axiosClient";
import { ProductCard, Section } from "components";
import React, { useEffect, useState } from "react";
import "swiper/components/pagination/pagination.min.css";
// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "../Suggestion/Suggest.scss";

// install Swiper modules
SwiperCore.use([Pagination]);

function RecentView() {
  const [listSuggest, setListSuggest] = useState();

  useEffect(() => {
    function fetchPage() {
      axiosClient
        .get(`/cart/cartInfo`)
        .then((response) => {
          setListSuggest(response.items);
        })
        .catch((error) => {});
    }

    fetchPage();
  }, []);
  return (
    <>
      <Section title="Recently viewed products" />
      <div className="suggestion grid wide">
        <Swiper slidesPerView={"auto"} spaceBetween={30} className="mySwiper">
          {listSuggest &&
            listSuggest.map((item, index) => (
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

export default RecentView;
