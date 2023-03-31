import React from "react";

import "../AnalyticItem/analyticItem.css";

const AnalyticItem = ({ item }) => {
  let { category, amount, symbol, percentage } = item;
  amount = 20;
  return (
    <>
      <div className="analyticItem">
        <div className=" itemValue">
          <h4>{category}</h4>

          <p>{symbol} </p>
        </div>
        <div className="itemData">
          <p>{percentage}</p>
        </div>
      </div>
    </>
  );
};

export default AnalyticItem;
