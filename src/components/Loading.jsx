import React from "react";
import "../assets/styles/components/Loading.css";

const Loading = () => (
  <div className="center">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loading;
