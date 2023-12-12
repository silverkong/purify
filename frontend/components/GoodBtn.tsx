import React, { useState } from "react";
import BlueLike from "../image/Bluelike.png";
import GrayLike from "../image/GrayLike.png";

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

const GoodBtn = ({ isActive, onClick }) => {
  const [isBlueActive, setIsBlueActive] = useState(true);

  const handleClick = () => {
    setIsBlueActive(!isBlueActive);
    console.log("Good Button Clicked!"); // 좋아요 버튼 확인용
  };

  return (
    <div>
      <div style={isActive ? blue : gray} onClick={() => { onClick(); handleClick(); }}>
        <img src={isActive ? BlueLike : GrayLike} style={imgStyle} alt="GoodBtn" />
      </div>
    </div>
  );
};

export default GoodBtn;
