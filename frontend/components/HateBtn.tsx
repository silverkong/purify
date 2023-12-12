import React, { useState } from "react";
import BlueHate from "../image/BlueHate.png";
import GrayHate from "../image/GrayHate.png";

const blue = {
  width: "4.375rem",
  height: "4.375rem",
  flexShrink: "0",
  borderRadius: "0.9375rem",
  border: "1px solid #06F",
  background: "#FFF",
};

const gray = {
  width: "4.375rem",
  height: "4.375rem",
  flexShrink: "0",
  borderRadius: "0.9375rem",
  border: "1px solid #DDD",
  background: "#FFF",
};

const imgStyle = {
  marginTop: "1.31rem",
  marginLeft: "1.31rem",
};

const HateBtn = ({ isActive, onClick }) => {
  const [isBlueActive, setIsBlueActive] = useState(true);

  const handleClick = () => {
    setIsBlueActive(!isBlueActive);
    console.log("Hate Button Clicked!"); // 싫어요 버튼 확인용
  };

  return (
    <div>
       <div style={isActive ? blue : gray}  onClick={() => { onClick(); handleClick(); }}>
        <img src={isActive ? BlueHate : GrayHate} style={imgStyle} alt="HateBtn" />
      </div>
    </div>
  );
};

export default HateBtn;
