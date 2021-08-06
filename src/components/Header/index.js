import { Badge, CartSlide, Search } from "components";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import {
  AiOutlineClose,
  AiOutlineGift,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, userLogin, userLogout } from "redux/ducks/userSlice";
import { getCartByUser } from "redux/ducks/cartSlice";
import "./Header.scss";
import axiosClient from "api/axiosClient";
import logo from "assets/logo.png";

function Header() {
  const { isLogin, user } = useSelector((state) => state.user);
  const { cart, wishlist } = useSelector((state) => state.cart);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    function fetchUser() {
      axiosClient
        .get(`/user`)
        .then((response) => {
          dispatch(getUser(response));
        })
        .catch((error) => {});
    }
    function fetchCart() {
      axiosClient
        .get("/cart/cartInfo")
        .then((response) => {
          dispatch(getCartByUser(response));
        })
        .catch((error) => {});
    }
    fetchCart();
    fetchUser();
  }, [dispatch]);

  const [showCart, setShowCart] = useState(false);
  //handle  google login
  function responseSuccessGoogle(response) {
    axiosClient
      .post("/user/login", {
        idToken: response.tokenId,
      })
      .then((res) => {
        dispatch(userLogin(res));
        setTimeout(() => {
          window.location.reload(false);
          document.body.style.overflow = "unset";
        }, 1000);
      })
      .catch((error) => {});
  }
  function responseErrorGoogle(response) {
    console.log(response);
  }
  return (
    <>
      <Search show={showSearch} setShow={setShowSearch} />
      <CartSlide show={showCart} setShow={setShowCart} />
      <div className="header grid ">
        <input type="checkbox" id="auth-checkbox" />
        <label htmlFor="auth-checkbox" className="auth__overlay"></label>
        <div className="auth">
          <div className="auth__title">
            <span>Google Auth</span>
            <span>
              <label htmlFor="auth-checkbox">
                <AiOutlineClose />
              </label>
            </span>
          </div>
          {isLogin ? (
            <div className="auth__google-logout">
              <div
                onClick={() => {
                  dispatch(userLogout());
                  setTimeout(() => {
                    window.location.reload(false);
                    document.body.style.overflow = "unset";
                  }, 1000);
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="auth__google">
              <GoogleLogin
                className="google-login"
                clientId="766423151097-um2alq61rhsnce9ar0af6a9hdp031d0n.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
              <span>Login with Google Account</span>
            </div>
          )}
        </div>
        <div className="tabBottom">
          <ul className="tabBottom-list">
            <li className="tabBottom-item">
              <Link to="/">
                <span>
                  <AiOutlineHome />
                  Home
                </span>
              </Link>
            </li>
            <li className="tabBottom-item">
              <Link to="/sale">
                <span>
                  <AiOutlineGift />
                  Sale
                </span>
              </Link>
            </li>
            <li className="tabBottom-item">
              <Link to="/wishlist">
                <span className="itemForBadge">
                  <AiOutlineHeart />{" "}
                  <span className="badgeForItem">
                    {wishlist && wishlist.items.length
                      ? wishlist.items.length
                      : 0}
                  </span>{" "}
                  Wishlist
                </span>
              </Link>
            </li>
            <li className="tabBottom-item">
              {isLogin && user != null ? (
                <label htmlFor="auth-checkbox">
                  <img alt="userphoto" src={user.photo}></img>{" "}
                </label>
              ) : (
                <label htmlFor="auth-checkbox">
                  <AiOutlineUser />
                </label>
              )}
            </li>
          </ul>
        </div>
        {/* Header pc */}
        <div className="header__section row ">
          <div className="header__section-left col l-4 m-4 c-12">
            <Link to="/">
              <AiOutlinePhone /> +84857623119
            </Link>
            <Link to="/">
              <AiOutlineMail /> duyhiep2519@gmail.com
            </Link>
          </div>
          <div className="header__section-center col l-4 m-4 c-12">
            Summer sale discount off 50%! Shop Now
          </div>
          <div className="header__section-right col l-4 m-4 c-12">English</div>
        </div>
        <div className="header__nav">
          <label htmlFor="menu-checkbox" className="header__nav-menu">
            <AiOutlineMenu />
          </label>
          <input id="menu-checkbox" type="checkbox" />
          <label htmlFor="menu-checkbox" className="nav__menu-overlay"></label>
          <div className="nav__menu">
            <ul className="nav__menu-list">
              <label htmlFor="menu-checkbox">
                <AiOutlineClose />
              </label>
              <li className="nav__menu-item">Blog</li>
              <li className="nav__menu-item">Portfolio</li>
              <li className="nav__menu-item">
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="nav__menu-item">
                {" "}
                <Link to="/sale">Sale</Link>
              </li>
              <li className="nav__menu-item last-child">
                <Link to="/category">Categories</Link>
              </li>
            </ul>
          </div>
          <div className="header__nav-logo">
            <Link to="/">
              <img alt="header-logo" src={logo} />
            </Link>
          </div>

          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/category">Categories</Link>
            </li>

            <li className="header__nav-item">
              <Link to="/sale">Sale</Link>
            </li>
          </ul>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <span onClick={() => setShowSearch(true)}>
                <AiOutlineSearch />
              </span>
            </li>

            <li className="header__nav-item">
              <Link to="/wishlist">
                <AiOutlineHeart />
                <Badge index={wishlist ? wishlist.items.length : 0} />
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                onClick={() => {
                  setShowCart(true);
                }}
              >
                <AiOutlineShoppingCart />
                <Badge
                  index={
                    cart && cart.items && cart.items.length > 0
                      ? cart.items.length
                      : 0
                  }
                ></Badge>
              </Link>
            </li>
            <li className="header__nav-item">
              {isLogin && user != null ? (
                <label htmlFor="auth-checkbox">
                  <img alt="userphoto" src={user.photo}></img>{" "}
                </label>
              ) : (
                <label htmlFor="auth-checkbox">
                  <AiOutlineUser />
                </label>
              )}
            </li>
          </ul>
          <ul className="header__nav-list--mobile">
            <li className="header__nav-item">
              <Link to="/">
                <AiOutlineSearch />
              </Link>
            </li>

            <li className="header__nav-item">
              <Link to="/cart">
                <AiOutlineShoppingCart />
                <Badge
                  index={
                    cart && cart.items && cart.items.length > 0
                      ? cart.items.length
                      : 0
                  }
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
