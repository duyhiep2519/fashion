import React, { useState } from "react";
import "./ProductCard.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineDelete,
} from "react-icons/ai";
import { QuickView, QuickShop } from "components";
import ClipLoader from "react-spinners/ClipLoader";
import { getPriceSale, getPrice } from "helper/price";
import axiosClient from "api/axiosClient";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistByUser } from "redux/ducks/cartSlice";
function ProductCard(props) {
  const { product, wishlist } = props;
  const [imgBackground, setImageBackground] = useState(product.image[0]);
  const [show, setShow] = useState(false);
  const [showQuickShop, setShowQuickShop] = useState(false);
  const [loadingShop, setLoadingShop] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const dispatch = useDispatch();

  //add to wishlist
  function addToWishlist(id) {
    axiosClient
      .post(`/wishlist/addToWishlist?productId=${id}`)
      .then((response) => {
        dispatch(getWishlistByUser(response));
        toast.success("Product has been added to wishlist", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
      });
  }
  //add to wishlist
  function removeFromWishlist(id) {
    axiosClient
      .delete(`/wishlist/removeFromWishlist?productId=${id}`)
      .then((response) => {
        dispatch(getWishlistByUser(response));
        toast.success("Product has been removed", {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Somethings wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
        });
      });
  }
  return (
    <>
      <QuickShop
        product={product}
        show={showQuickShop}
        setShow={() => setShowQuickShop(false)}
      />
      <QuickView
        product={product}
        show={show}
        setShowModal={() => setShow(false)}
      />
      <div
        className="product"
        onMouseOver={() => setImageBackground(product.image[1])}
        onMouseOut={() => setImageBackground(product.image[0])}
      >
        <div
          className="product-img"
          style={{ backgroundImage: `url(${imgBackground})` }}
        ></div>

        <div className="product-lable">
          {wishlist ? (
            <span
              className="wishlist-label"
              onClick={() => removeFromWishlist(product._id)}
            >
              <AiOutlineDelete />
            </span>
          ) : (
            <span
              className="wishlist-label"
              onClick={() => addToWishlist(product._id)}
            >
              <AiOutlineHeart />
            </span>
          )}
          {product.sale && (
            <span className="info-label--sale">-{product.sale}%</span>
          )}
          {product.isNewProduct && <span className="info-label--new">New</span>}
        </div>
        <div className="product-button">
          <div className="btn-quickview">
            <span className="btn-quickview--text">
              {loadingView ? (
                <ClipLoader color="aqua" loading={loadingView} size={15} />
              ) : (
                "Quick View"
              )}
            </span>
            <span
              onClick={() => {
                setLoadingView(true);
                setTimeout(() => {
                  setShow(true);
                  setLoadingView(false);
                }, 1000);
              }}
              className="btn-quickview--icon"
            >
              {loadingView ? (
                <ClipLoader color="aqua" loading={loadingView} size={15} />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
          <div className="btn-quickshop">
            <span className="btn-quickshop--text">
              {loadingShop ? (
                <ClipLoader color="aqua" loading={loadingShop} size={15} />
              ) : (
                "Quick Shop"
              )}
            </span>
            <span
              onClick={() => {
                setLoadingShop(true);
                setTimeout(() => {
                  setShowQuickShop(true);
                  setLoadingShop(false);
                }, 1000);
              }}
              className="btn-quickshop--icon"
            >
              {loadingShop ? (
                <ClipLoader color="aqua" loading={loadingShop} size={15} />
              ) : (
                <AiOutlineShoppingCart />
              )}
            </span>
          </div>
        </div>
        <div className="product-size">{product.size}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">
          {product.sale ? (
            <div>
              <span className="span-price-sale">{getPrice(product.price)}</span>{" "}
              -{" "}
              <span className="span-sale">
                {getPriceSale(product.price, product.sale)}
              </span>
            </div>
          ) : (
            <span className="span-price">{getPrice(product.price)}</span>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
