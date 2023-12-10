import React from "react"
import PuriImg from "../image/smallPurify.png" 

const ListStyle = { 
  display:'flex', 
  marginTop:"1rem"
}

const fontStyle = { 
  color: '#444',
  fontFamily: 'Poppins',
  fontSize: '1.125rem',
  fontStyle: 'normal',
  fontWeight: '500', 
  lineHeight: '1.375rem', 
  marginTop: '0.56rem', 
  marginLeft:'0.92rem'
}

const CommentList = ({ comments }) => {
    return (
      <div>
        {comments.map((comment, index) => (
          <div key={index} style={ListStyle}>
            <img src={PuriImg} alt={`User ${index + 1}`} />
            <p style={fontStyle}>{comment}</p>
          </div>
        ))}
      </div>
    );
  };

export default CommentList
