import React, { useState } from "react";
import "./ProductCard.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineEye,
} from "react-icons/ai";
import { QuickView, QuickShop } from "components";
import ClipLoader from "react-spinners/ClipLoader";

function ProductCard(props) {
  const { product } = props;
  const [imgBackground, setImageBackground] = useState(product.image[0]);
  const [show, setShow] = useState(false);
  const [showQuickShop, setShowQuickShop] = useState(false);
  const [loadingShop, setLoadingShop] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
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
          <span className="wishlist-label">
            <AiOutlineHeart />
          </span>
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
              <span className="span-price-sale">${product.price}</span> -{" "}
              <span className="span-sale">
                ${product.price - product.price * (product.sale / 100)}
              </span>
            </div>
          ) : (
            <span className="span-price">${product.price}</span>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
