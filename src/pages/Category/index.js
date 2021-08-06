import React, { useState, useEffect } from "react";
import "./Category.scss";
import axiosClient from "api/axiosClient";
import { ProductCard } from "components";
import FadeLoader from "react-spinners/FadeLoader";
import { AiOutlineFilter } from "react-icons/ai";

const categories = [
  "Acessories",
  "Bottom",
  "Denim",
  "Dress",
  "Jackets",
  "Jewellry",
  "Men",
  "Women",
  "Top",
  "T-Shirt",
  "Shoe",
  "Sneaker",
];

function Category() {
  const [option, setOption] = useState({
    type: "all",
    sort_by: "",
  });
  console.log(option);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      axiosClient
        .get(`/product/category?type=${option.type}&sort_by=${option.sort_by}`)
        .then((response) => {
          setTimeout(() => {
            setProducts(response);
            setLoading(false);
          }, 500);
        });
    }
    fetchData();
  }, [option]);

  return (
    <div className="category">
      <div className="category__header">
        <ul>
          {categories.map((item, index) => (
            <li
              key={index}
              onClick={() => setOption({ ...option, type: item })}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="category__header-mobile">
        <select
          onChange={(e) => setOption({ ...option, type: e.target.value })}
        >
          <option>Category</option>
          {categories.map((category) => (
            <option value={category.toLowerCase()}>{category}</option>
          ))}
        </select>
      </div>
      <div className="category__title">
        <span>{option.type}</span>
      </div>
      <div className="category__feature">
        <span>
          <AiOutlineFilter /> Filter
        </span>
        <select
          onChange={(e) => setOption({ ...option, sort_by: e.target.value })}
        >
          <option value="">Feature</option>
          <option value="best-seller">Best Selling</option>
          <option value="name-ascending">A-Z</option>
          <option value="name-descending">Z-A</option>
          <option value="price-ascending">Price, low to high</option>
          <option value="price-descending">Price, high to low</option>
        </select>
      </div>
      <div className="category__product grid wide">
        {loading ? (
          <div className="detail--loading">
            <FadeLoader loading={loading} size={60} color="#36D7B7" />
          </div>
        ) : (
          <div className="row">
            {products &&
              products.map((product, index) => (
                <div key={index} className="col l-3 m-6 c-6">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
