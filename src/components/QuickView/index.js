import React, { useState } from "react";
import "./QuickView.scss";

import {
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineArrowRight,
} from "react-icons/ai";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
import axiosClient from "api/axiosClient";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getCartByUser } from "redux/ducks/cartSlice";
import { Link } from "react-router-dom";

SwiperCore.use([Pagination, EffectFade, Navigation]);

//sizeArray
const sizeArray = ["S", "M", "L", "XL"];

function QuickView(props) {
  const { product, show, setShowModal } = props;
  const dispatch = useDispatch();
  //state
  const [size, setSize] = useState(sizeArray[0]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  //handle addToCart
  function handleAddToCart(id, quantity) {
    axiosClient
      .put(`/cart/addToCart?productId=${id}`, {
        orderQuantity: quantity,
      })
      .then((response) => {
        dispatch(getCartByUser(response));
      })
      .catch((error) => {});
  }

  return (
    <>
      {show && (
        <div className="modal grid">
          <div className="modal__overlay"></div>
          <div className="modal__body row">
            <div className="modal__slide col l-6 m-6 c-12">
              <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                effect="fade"
              >
                {product.image.map((item, index) => (
                  <SwiperSlide>
                    <div key={index}>
                      <img alt="slidd" src={item} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {product.isNewProduct && (
                <span className="modal__new--label">NEW</span>
              )}
              {product.sale && (
                <span className="modal__sale--label">-{product.sale}%</span>
              )}
            </div>
            <div className="modal__content col l-6 m-6 c-12">
              <span className="modal__close" onClick={() => setShowModal()}>
                <AiOutlineClose />
              </span>
              <h1 className="modal__name">{product.name}</h1>
              <p className="modal__price">
                {product.sale ? (
                  <>
                    <span className="price-old">${product.price} </span>
                    <span className="price">
                      ${product.price - (product.price * product.sale) / 100}
                    </span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </p>
              <p className="modal__description">{product.description}</p>
              <div className="modal__size">
                SIZE : {size}
                <ul className="ul-size">
                  {sizeArray.map((item, index) => (
                    <li
                      key={index}
                      className={`item-size ${
                        sizeArray[index] === size && "active"
                      }`}
                      onClick={() => setSize(sizeArray[index])}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal__btn">
                <div className="modal__input">
                  <span onClick={() => setQuantity(quantity - 1)}>
                    <AiOutlineMinus />
                  </span>
                  <input type="text" name="quantity" value={quantity} />
                  <span onClick={() => setQuantity(quantity + 1)}>
                    <AiOutlinePlus />
                  </span>
                </div>
                <div className="modal__addToCart">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product._id, quantity);
                      setLoading(true);

                      setTimeout(() => {
                        setShowModal(false);
                        setLoading(false);
                        toast.success("Successful!", {
                          position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }, 1000);
                    }}
                  >
                    {loading ? (
                      <ClipLoader loading={loading} size={15} color="aqua" />
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
                <div className="modal__wishlist">
                  <AiOutlineHeart />
                </div>
              </div>
              <div className="modal__category">
                <span>Categories : </span>
                {product.category}
              </div>
              <div className="modal__tag">
                <span>Tags : </span>
                {product.tag}
              </div>
              <div className="modal__detail">
                <Link to={`/detail/${product.slug}`}>
                  View full details <AiOutlineArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickView;
