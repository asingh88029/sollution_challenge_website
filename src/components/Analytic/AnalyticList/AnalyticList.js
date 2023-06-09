import React from "react";

import AnalyticItem from "../AnalyticItem/AnalyticItem";
import "../AnalyticList/analyticList.css";

const AnalyticList = ({ items }) => {
  return (
    <section className="analyticsItems">
      {items.map((item) => {
        return <AnalyticItem key={Math.random()} item={item} />;
      })}
    </section>
  );
};

export default AnalyticList;
