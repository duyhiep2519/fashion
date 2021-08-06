import React, { useEffect, useState } from "react";
import "./Wishlist.scss";
import axiosClient from "api/axiosClient";
import { ProductCard } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistByUser } from "redux/ducks/cartSlice";
import FadeLoader from "react-spinners/FadeLoader";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState();

  const [loadPage, setLoadPage] = useState(false);
  useEffect(() => {
    function fetchWishlist() {
      axiosClient
        .get("/wishlist")
        .then((response) => {
          setLoadPage(true);
          setTimeout(() => {
            dispatch(getWishlistByUser(response));
            setWishlist(response);
            setLoadPage(false);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchWishlist();
  }, [dispatch]);

  return (
    <>
      {loadPage ? (
        <div className="detail--loading">
          <FadeLoader loading={loadPage} size={60} color="#36D7B7" />
        </div>
      ) : (
        <div className="wishlist">
          {wishlist && wishlist.items.length > 0 ? (
            <div className="grid wide">
              <div className="row">
                {wishlist.items.map((item, index) => (
                  <div className="col l-3 m-6 c-12" key={index}>
                    <ProductCard product={item.product} wishlist={true} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="wishlist--empty">
              <span>
                <AiOutlineHeart />
              </span>
              <h1>WISHLIST IS EMPTY.</h1>
              <p>
                You don't have any products in the wishlist yet. <br /> You will
                find a lot of interesting products on our "Shop" page.
              </p>
              <Link to="/">Return to shop</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Wishlist;
