import axiosClient from "api/axiosClient";
import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillMail,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import FadeLoader from "react-spinners/FadeLoader";
import { toast } from "react-toastify";
import { getCartByUser } from "redux/ducks/cartSlice";
import { Suggestion, RecentView } from "components";
import SwiperCore, { EffectFade, Navigation, Pagination, Zoom } from "swiper";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/zoom/zoom.min.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "./Detail.scss";
import { getPrice, getPriceSale } from "helper/price";

SwiperCore.use([EffectFade, Zoom, Navigation, Pagination]);

//sizeArray
const sizeArray = ["S", "M", "L", "XL"];

function Detail() {
  const { slug } = useParams();

  const dispatch = useDispatch();
  //state
  const [product, setProduct] = useState();
  const [size, setSize] = useState(sizeArray[0]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/product/detail?slug=${slug}`)
      .then((response) => {
        setLoadPage(true);
        setTimeout(() => {
          setProduct(response);
          setLoadPage(false);
        }, 1000);
      })
      .catch((error) => {});
  }, [slug]);
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
      {product ? (
        <>
          <div className="detail">
            <div className="detail grid">
              <div className="detail__body row">
                <div className="detail__slide col l-6 m-6 c-12">
                  <Swiper
                    navigation={true}
                    pagination={{ clickable: true }}
                    effect="fade"
                    zoom={true}
                  >
                    {product.image.map((item, index) => (
                      <SwiperSlide>
                        <div key={index} className="swiper-zoom-container">
                          <img alt="slidd" src={item} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {product.isNewProduct && (
                    <span className="detail__new--label">NEW</span>
                  )}
                  {product.sale && (
                    <span className="detail__sale--label">
                      -{product.sale}%
                    </span>
                  )}
                </div>
                <div className="detail__content col l-6 m-6 c-12">
                  <h1 className="detail__name">{product.name}</h1>
                  <p className="detail__price">
                    {product.sale ? (
                      <>
                        <span className="price-old">
                          {getPrice(product.price)}{" "}
                        </span>
                        <span className="price">
                          {getPriceSale(product.price, product.sale)}
                        </span>
                      </>
                    ) : (
                      <span>{getPrice(product.price)}</span>
                    )}
                  </p>

                  <p className="detail__description">{product.description}</p>
                  <div className="detail__size">
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

                  <div className="detail__btn">
                    <div className="detail__input">
                      <span onClick={() => setQuantity(quantity - 1)}>
                        <AiOutlineMinus />
                      </span>
                      <input type="text" name="quantity" value={quantity} />
                      <span onClick={() => setQuantity(quantity + 1)}>
                        <AiOutlinePlus />
                      </span>
                    </div>
                    <div className="detail__addToCart">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product._id, quantity);
                          setLoading(true);

                          setTimeout(() => {
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
                          <ClipLoader
                            loading={loading}
                            size={15}
                            color="aqua"
                          />
                        ) : (
                          "Add To Cart"
                        )}
                      </button>
                    </div>
                    <div className="detail__wishlist">
                      <AiOutlineHeart />
                    </div>
                  </div>
                  <div className="detail__img">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/trust_img2_360x.png?v=1587092488"
                      alt="imagess"
                    />
                  </div>
                  <div className="detail__category">
                    <span>Categories : </span>
                    {product.category}
                  </div>
                  <div className="detail__tag">
                    <span>Tags : </span>
                    {product.tag}
                  </div>
                  <ul className="detail__social">
                    <li>
                      <a href="https://www.facebook.com/duyhiep2519">
                        <AiFillFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/eliot_2519/">
                        <AiFillInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="https://mail.google.com/mail/u/0/#inbox">
                        <AiFillMail />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        <AiOutlineTwitter />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Suggestion />
          <RecentView />
        </>
      ) : (
        <div className="detail--loading">
          <FadeLoader loading={loadPage} size={60} color="#36D7B7" />
        </div>
      )}
    </>
  );
}

export default Detail;
