import React, { useState, useEffect } from "react";
import "./Sale.scss";
import axiosClient from "api/axiosClient";
import FadeLoader from "react-spinners/FadeLoader";
import { ProductCard } from "components";
import { toast } from "react-toastify";

function SalePage() {
  const [listSale, setListSale] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function fetchListSales() {
      axiosClient.get("/product/sale").then((response) => {
        setLoading(true);
        setTimeout(() => {
          setListSale(response);
          console.log(response);
          setLoading(false);
          toast.info("Best sale for you, check it out!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 600);
      });
    }
    fetchListSales();
  }, []);

  return (
    <>
      {loading ? (
        <div className="detail--loading">
          <FadeLoader loading={loading} size={60} color="#36D7B7" />
        </div>
      ) : (
        <div className="sale">
          <div className="grid wide">
            <div className="row">
              {listSale &&
                listSale.map((product, index) => (
                  <div key={index} className="col l-3 m-6 c-6">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SalePage;
