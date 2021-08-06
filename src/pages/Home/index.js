import axiosClient from "api/axiosClient";
import { GridContent, ProductCard, Section, Slider } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Scroll from "react-scroll";
import FadeLoader from "react-spinners/FadeLoader";
import {
  getProductByPage,
  getProductByPageFail,
} from "redux/ducks/productSlice";
import "./Home.scss";
import { toast } from "react-toastify";

function Home() {
  let scroll = Scroll.animateScroll;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    function fetchPage() {
      axiosClient
        .get(`/product`, {
          params: { page: page, limit: limit },
        })
        .then((response) => {
          setLoading(true);
          setTimeout(() => {
            dispatch(getProductByPage(response));
            setLoading(false);
            toast.info("Great shopping experience here!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }, 100);
        })
        .catch((error) => {
          dispatch(getProductByPageFail(error.message));
        });
    }

    fetchPage();
  }, [page, limit, dispatch]);
  const { list } = useSelector((state) => state.product);

  return (
    <>
      {loading ? (
        <div className="detail--loading">
          <FadeLoader loading={loading} size={60} color="#36D7B7" />
        </div>
      ) : (
        <div className="home">
          <Slider />
          <GridContent />
          <Section title="trending" subtitle="Top view in this week" />
          <div className="grid wide">
            <div className="row">
              {list &&
                list.map((product, index) => (
                  <div key={index} className="col l-3 m-6 c-6">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </div>
          <div
            className={`showmore ${limit === 20 && "showmore--disabled"}`}
            onClick={() => {
              if (limit <= 20) {
                setLimit(limit + 5);
              }
            }}
          >
            Show more...
          </div>
          <Section title="best seller" subtitle="Top sale in this week" />
          <div className="grid wide">
            <div className="row">
              {list &&
                list.slice(2, 8).map((product, index) => (
                  <div key={index} className="col l-3 m-4 c-6">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </div>
          <div
            className={`showmore ${limit === 20 && "showmore--disabled"}`}
            onClick={() => {
              if (limit <= 20) {
                setLimit(limit + 5);
              }
            }}
          >
            Show more...
          </div>
          <div className="pagination">
            <ul className="pagination-list">
              {page > 1 && (
                <li
                  onClick={() => {
                    setPage(page - 1);
                    scroll.scrollToTop();
                  }}
                  className="pagination-item"
                >
                  Prev
                </li>
              )}
              <li
                onClick={() => {
                  setPage(1);
                  scroll.scrollToTop();
                }}
                className={`pagination-item ${page === 1 && "active"}`}
              >
                1
              </li>
              <li
                onClick={() => {
                  setPage(2);
                  scroll.scrollToTop();
                }}
                className={`pagination-item ${page === 2 && "active"}`}
              >
                2
              </li>
              <li
                onClick={() => {
                  setPage(3);
                  scroll.scrollToTop();
                }}
                className={`pagination-item ${page === 3 && "active"}`}
              >
                3
              </li>
              <li
                onClick={() => {
                  setPage(4);
                  scroll.scrollToTop();
                }}
                className={`pagination-item ${page === 4 && "active"}`}
              >
                4
              </li>
              {page < 4 && (
                <li
                  onClick={() => {
                    setPage(page + 1);
                    scroll.scrollToTop();
                  }}
                  className="pagination-item"
                >
                  Next
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
