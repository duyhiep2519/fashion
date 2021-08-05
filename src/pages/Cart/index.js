import axiosClient from "api/axiosClient";
import { QuickShop } from "components";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegSadTear } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUser } from "redux/ducks/cartSlice";
import { getPrice, getPriceSale } from "helper/price";
import FadeLoader from "react-spinners/FadeLoader";
import "./Cart.scss";
import { Link } from "react-router-dom";

function Cart() {
  const { isLogin } = useSelector((state) => state.user);
  const [cart, setCart] = useState();
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    function fetchCart() {
      axiosClient
        .get("/cart/cartInfo")
        .then((response) => {
          setLoadPage(true);
          setTimeout(() => {
            dispatch(getCartByUser(response));
            setCart(response);
            setLoadPage(false);
          }, 1000);
        })
        .catch((error) => {});
    }
    fetchCart();
  }, [showEdit, dispatch]);

  // handle changeQuantity
  function handleChangeQuantity(id, quantity) {
    axiosClient
      .put(`/cart/changeQuantityFromCart?productId=${id}`, {
        orderQuantity: quantity,
      })
      .then((response) => {
        dispatch(getCartByUser(response));
        setCart(response);
      })
      .catch((error) => {});
  }
  // handle delete
  function handleDelete(id, quantity) {
    axiosClient
      .put(`/cart/removeItemFromCart?productId=${id}`, {
        orderQuantity: quantity,
      })
      .then((response) => {
        dispatch(getCartByUser(response));
        setCart(response);
      })
      .catch((error) => {});
  }

  return (
    <>
      {loadPage ? (
        <div className="detail--loading">
          <FadeLoader loading={loadPage} size={60} color="#36D7B7" />
        </div>
      ) : (
        <div className="cart">
          <div className="cart__header">
            <span>Shopping Cart</span>
          </div>
          {isLogin ? (
            <div className="cart__body">
              {cart &&
                cart.items.map((item, index) => (
                  <>
                    <QuickShop
                      product={item.product}
                      show={showEdit}
                      setShow={() => setShowEdit(false)}
                      key={index + "s"}
                    />
                    <div key={index} className="cart__item row">
                      <div className="cart__info col l-5 m-5 c-12">
                        <img alt="item.product" src={item.product.image[0]} />
                        <div className="cart__name">
                          <span>{item.product.name}</span>
                          <p>
                            <BiEdit
                              onClick={() => {
                                setShowEdit(true);
                                console.log(item.product.name);
                              }}
                            />
                            <AiOutlineDelete
                              onClick={() => handleDelete(item.product._id)}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="cart__price col l-2 m-2 c-12">
                        {item.product.sale
                          ? getPriceSale(item.product.price, item.product.sale)
                          : getPrice(item.product.price)}
                      </div>
                      <div className="cart__quantity col l-3 m-3 c-12">
                        <div className="cart__btn">
                          <div className="cart__input">
                            <span
                              onClick={() =>
                                handleChangeQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <AiOutlineMinus />
                            </span>
                            <input
                              type="text"
                              name="quantity"
                              value={item.quantity}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                handleChangeQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <AiOutlinePlus />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="cart__total col l-2 m-2 c-12">
                        <span>Total</span>:{" "}
                        {getPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </>
                ))}
            </div>
          ) : (
            <div className="cart__noLogin">
              <div>
                Oops! <FaRegSadTear />
              </div>
              <p>
                You need to <Link to="/login">login</Link> to view cart
              </p>
            </div>
          )}
          <div className="cart__payment"></div>
        </div>
      )}
    </>
  );
}

export default Cart;
