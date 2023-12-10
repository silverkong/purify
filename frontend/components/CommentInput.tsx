import React, { useState } from "react";
import GoodBtn from "../components/GoodBtn"
import HateBtn from "../components/HateBtn"

const CommentInput = ({ onCommentSubmit }) => {
  const [isInputEmpty, setInputEmpty] = useState(true);

  const inputStyle = isInputEmpty ? inputStyleGray : inputStyleBlue;
  
  const btnStyle = isInputEmpty ? btnStyleGray : btnStyleBlue;
  const inputBoxStyle = { 
    display:"flex", 
    marginTop:'5rem'
  }
  const [comment, setComment] = useState("");
  const handleCommentSubmit = () => {
    if (!isInputEmpty) {
      onCommentSubmit(comment);
      setComment(""); 
      setInputEmpty(true);
    }
  };

  return (
    <div style={inputBoxStyle}>
        <GoodBtn/>
        <div style={{marginLeft:'0.94rem', marginRight:'0.94rem'}}/>
        <HateBtn/>
        <div style={inputBox}>
        <input
          style={inputStyle}
          placeholder="Write your comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setInputEmpty(e.target.value === "");
          }}
        />
        <button style={btnStyle} type="submit" onClick={handleCommentSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

const inputStyleGray = {
  border: "none",
  outline: "none",
  borderRadius: "1.5625rem",
  border: "1px solid #DDD",
  background: "#FFF",
  width: '53.4375rem',
  height: '4.375rem', 
  display:'flex', 
  marginLeft:'1.81rem'
};

const inputStyleBlue = {
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  borderRadius: "1.5625rem",
  border: "1px solid #06F",
  background: "#FFF",
  width: '53.4375rem',
  height: '4.375rem', 
  display:'flex', 
  marginLeft:'1.81rem'
};

const buttonStyle = {
  width: "3.57575rem",
  height: "4.375rem",
  flexShrink: "0",
  borderRadius: "1.5625rem",
  border: "1px solid #DDD",
  background: "#DDD",
};

const inputBox = {
    display:'flex'
};

const btnStyleGray = {
  width: "4.375rem",
  height: "4.375rem",
  flexShrink: "0",
  borderRadius: "1.5625rem",
  border: "1px solid #DDD",
  background: "#DDD",
  position: 'relative',
  marginLeft: '-70px'
};

const btnStyleBlue = {
  width: "4.375rem",
  height: "4.375rem",
  flexShrink: "0",
  borderRadius: "1.5625rem",
  border: "1px solid #06F",
  background: "#06F",
  position: 'relative',
  marginLeft: '-70px'
};

export default CommentInput;