import axiosClient from "api/axiosClient";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCartByUser } from "redux/ducks/cartSlice";
import "./CartSlide.scss";

function CartSlide(props) {
  const { show, setShow } = props;
  // const { cart } = useSelector((state) => state.cart);
  const [cart, setCart] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    function fetchCart() {
      axiosClient
        .get("/cart/cartInfo")
        .then((response) => {
          setCart(response);
          dispatch(getCartByUser(response));
        })
        .catch((error) => {});
    }
    fetchCart();
  }, [show, dispatch]);

  return (
    <>
      {show && (
        <div className="cartslide">
          <div className="cartslide__overlay"></div>
          {cart && cart.items ? (
            <div className="cartslide__body">
              <div className="cartslide__header">
                <span>Shopping Cart</span>
                <span onClick={() => setShow(false)}>
                  <AiOutlineClose />
                </span>
              </div>
              <div className="cartslide__notify">
                <span>Congratulations! You've got free shipping!</span>
              </div>
              <div className="cartslide__list">
                {cart.items.length < 4
                  ? cart.items.map((item, index) => (
                      <div className="cartslide__item" key={index}>
                        <img
                          src={item.product.image[0]}
                          alt="product"
                          className="cartslide__img"
                        />
                        <div className="cartslide__info">
                          <span className="cartslide__name">
                            {item.product.name}
                          </span>
                          <p className="cartslide__price">
                            ${item.product.price}
                          </p>
                          <div className="cartslide__input">
                            <span>
                              <AiOutlineMinus />
                            </span>
                            <input
                              type="text"
                              name="quantity"
                              value={item.quantity}
                            />
                            <span>
                              <AiOutlinePlus />
                            </span>
                          </div>
                          <div className="cartslide__delete">
                            <span>
                              <AiOutlineDelete />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  : cart.items.slice(0, 4).map((item, index) => (
                      <div className="cartslide__item" key={index}>
                        <img
                          src={item.product.image[0]}
                          alt="product"
                          className="cartslide__img"
                        />
                        <div className="cartslide__info">
                          <span className="cartslide__name">
                            {item.product.name}
                          </span>
                          <p className="cartslide__price">
                            ${item.product.price}
                          </p>
                          <div className="cartslide__input">
                            <span>
                              <AiOutlineMinus />
                            </span>
                            <input
                              type="text"
                              name="quantity"
                              value={item.quantity}
                            />
                            <span>
                              <AiOutlinePlus />
                            </span>
                          </div>
                          <div className="cartslide__delete">
                            <span>
                              <AiOutlineDelete />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="cartslide__checkout">
                <div className="cartslide__subtotal">
                  <span>Subtotal:</span>
                  <span>$65.00</span>
                </div>
                <div className="cartslide__btn">
                  <div
                    onClick={() => setShow(false)}
                    className="cartslide__view"
                  >
                    <Link to="/cart">View Cart</Link>
                  </div>
                  <div>Checkout</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cartslide__body">
              <div className="cartslide__header">
                <span>Shopping Cart</span>
                <span onClick={() => setShow(false)}>
                  <AiOutlineClose />
                </span>
              </div>
              <div className="cartslide__notify">
                <span>You have no cart!!</span>
              </div>

              <div className="cartslide__checkout">
                <div className="cartslide__btn">
                  <div
                    onClick={() => setShow(false)}
                    className="cartslide__view"
                  >
                    <Link to="/cart">View Cart</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CartSlide;
