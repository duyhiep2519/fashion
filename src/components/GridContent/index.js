import React from "react";
import "./GridContent.scss";
import { Link } from "react-router-dom";

function GridContent() {
  return (
    <div className="gridcontent">
      <div className="  grid  ">
        <div className="row ">
          <div className="col l-6 m-6 c-12">
            <div
              style={{
                backgroundImage: `url("https://cdn.shopify.com/s/files/1/0332/6420/5963/files/young-beautiful-woman-looking-trendy-girl-casual-summer-clothes-positive-funny-model-winking_720x.jpg?v=1606209527")`,
              }}
              className="gridcontent__picture gridcontent__picture--large"
            >
              <Link
                className="gridcontent__btn"
                to="/search?type=women&search_q="
              >
                Women
              </Link>
            </div>
          </div>
          <div className="col l-6 m-6 c-12 ">
            <div className="row ">
              <div className="col l-6 m-6 c-6">
                <div className="row ">
                  <div
                    style={{
                      backgroundImage: `url("https://cdn.shopify.com/s/files/1/0332/6420/5963/files/bag2_360x.jpg?v=1581730050")`,
                    }}
                    className="gridcontent__picture gridcontent__picture--small  col l-12 c-12 m-12"
                  >
                    <Link
                      className="gridcontent__btn"
                      to="/search?type=acessories&search_q="
                    >
                      Acessories
                    </Link>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url("https://cdn.shopify.com/s/files/1/0332/6420/5963/files/lemai3020112688_m4_2-0_360x.jpg?v=1606229788")`,
                    }}
                    className="gridcontent__picture gridcontent__picture--small  col l-12 c-12 m-12"
                  >
                    {" "}
                    <Link
                      className="gridcontent__btn"
                      to="/search?type=footwear&search_q="
                    >
                      Footwear
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col l-6 m-6 c-6">
                <div
                  style={{
                    backgroundImage: `url("https://cdn.shopify.com/s/files/1/0332/6420/5963/files/p24-21_720x.jpg?v=1581731327")`,
                  }}
                  className="gridcontent__picture gridcontent__picture--large gridcontent__picture--watch"
                >
                  <Link
                    className="gridcontent__btn"
                    to="/search?type=watches&search_q="
                  >
                    Watches
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridContent;
