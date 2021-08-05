import React, { useState, useEffect } from "react";
import "./Search.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import axiosClient from "api/axiosClient";
import { getPriceSale, getPrice } from "helper/price";
import FadeLoader from "react-spinners/FadeLoader";
import { Link } from "react-router-dom";

function Search(props) {
  const { show, setShow } = props;
  const [listRes, setListRes] = useState();
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [search, setSearch] = useState({
    type: "all",
    search_q: "",
  });

  useEffect(() => {
    function filterProduct() {
      setLoadingFilter(true);
      axiosClient
        .post(`/product/filter?type=${search.type}&search_q=${search.search_q}`)
        .then((response) => {
          setTimeout(() => {
            setListRes(response);
            setLoadingFilter(false);
          }, 800);
        })
        .catch((err) => {});
    }
    filterProduct();
  }, [search]);
  return (
    <>
      {show && (
        <div className="search">
          <div className="search__overlay"></div>
          <div className="search__body">
            <div className="search__header">
              <span>Search our site</span>
              <span onClick={() => setShow(false)}>
                <AiOutlineClose />
              </span>
            </div>
            <div className="search__filter">
              <div className="search__select">
                <select
                  onChange={(e) =>
                    setSearch({ ...search, type: e.target.value.toLowerCase() })
                  }
                  className="category"
                  id="category"
                >
                  <option value="All">All</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Women">Women</option>
                  <option value="Acessories">Acessories</option>
                  <option value="Jewellry">Jewellry</option>
                  <option value="Watches">Watches</option>
                  <option value="Women">Women</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Jackets">Jackets</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Best seller">Best seller</option>
                </select>
              </div>
              <div className="search__input">
                <input
                  type="text"
                  value={search.search_q}
                  onChange={(e) =>
                    setSearch({
                      ...search,
                      search_q: e.target.value.toLowerCase(),
                    })
                  }
                />{" "}
                {search.search_q ? (
                  <Link
                    to={`/search?type=${search.type}&search_q=${search.search_q}`}
                    className="btn-active"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    <AiOutlineSearch />
                  </Link>
                ) : (
                  <span className="btn-disabled" type="button">
                    <AiOutlineSearch />
                  </span>
                )}
              </div>
            </div>
            <div className="search__result">
              <div className="search__result-header">
                <span>Need some inspiration?</span>
              </div>

              <div className="search__result-content">
                <div className="search__scroll">
                  {loadingFilter ? (
                    <div className="detail--loading">
                      <FadeLoader
                        loading={loadingFilter}
                        size={60}
                        color="#36D7B7"
                      />
                    </div>
                  ) : (
                    <>
                      {" "}
                      {listRes &&
                        listRes.map((item, index) => (
                          <div key={index} className="search__product">
                            <img src={item.image[0]} alt="product" />
                            <div className="search__product-info">
                              <Link to={`/detail/${item.slug}`}>
                                {item.name}
                              </Link>
                              {item.sale ? (
                                <Link to={`/detail/${item.slug}`}>
                                  {getPrice(item.price)} -{" "}
                                  {getPriceSale(item.price, item.sale)}
                                </Link>
                              ) : (
                                <Link to={`/detail/${item.slug}`}>
                                  <p> {getPrice(item.price)}</p>
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
