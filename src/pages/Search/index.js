import React, { useEffect, useState } from "react";
import "./Search.scss";
import { useLocation } from "react-router-dom";
import axiosClient from "api/axiosClient";
import { ProductCard } from "components";
import { ErrorPage } from "pages";

function Search() {
  const location = useLocation();
  const query = location.search;

  const [products, setProducts] = useState();

  useEffect(() => {
    function fetchData() {
      axiosClient
        .post(`/product/filter${query}`)
        .then((response) => {
          setProducts(response);
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, [query]);

  return (
    <>
      {products ? (
        <div className="search__page grid wide">
          <div className="search__page-header">
            {products.length} Results for search {query.replace("?", "")}{" "}
          </div>
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col l-3 m-6 c-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <ErrorPage />
        </div>
      )}
    </>
  );
}

export default Search;
