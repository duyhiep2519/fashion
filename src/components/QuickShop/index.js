import axiosClient from "api/axiosClient";
import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "./QuickShop.scss";
import { useDispatch } from "react-redux";
import { getCartByUser } from "redux/ducks/cartSlice";
import { Link } from "react-router-dom";
import { getPriceSale, getPrice } from "helper/price";
//sizeArray
const sizeArray = ["S", "M", "L", "XL"];

function QuickShop(props) {
  const { product, show, setShow } = props;
  const dispatch = useDispatch();

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
        <div className="quickshop">
          <div
            onClick={() => setShow(false)}
            className="quickshop__overlay"
          ></div>
          <div className="quickshop__body">
            <div className="quickshop__header">
              <img alt="product" src={product.image[0]} />
              <div className="quickshop__info">
                <p className="quickshop__name">{product.name}</p>
                {product.sale ? (
                  <div>
                    <span className="quickshop__price-old">
                      {getPrice(product.price)}
                    </span>{" "}
                    <span className="quickshop__price-new">
                      {getPriceSale(product.price, product.sale)}
                    </span>
                  </div>
                ) : (
                  <p className="quickshop__price">{getPrice(product.price)}</p>
                )}
              </div>
              <div onClick={() => setShow(false)} className="quickshop__close">
                <AiOutlineClose />
              </div>
            </div>
            <div className="quickshop__size">
              <p>SIZE : {size}</p>
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
            <div className="quickshop__btn">
              <div className="quickshop__input">
                <span
                  onClick={() => {
                    if (quantity > 0) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  <AiOutlineMinus />
                </span>
                <input
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <span
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  <AiOutlinePlus />
                </span>
              </div>
              <div className="quickshop__addToCart">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product._id, quantity);
                    setLoading(true);

                    setTimeout(() => {
                      setShow(false);
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
            </div>
            <div className="quickshop__detail">
              <Link to={`/detail/${product.slug}`}>
                View full details <AiOutlineArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickShop;
