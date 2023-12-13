import React from "react"
import PuriImg from "../assets/lg_purify.svg"

const ListStyle = {
  display: "flex",
  marginTop: "1rem",
}

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div style={ListStyle}>
            <img src={PuriImg} />
            <p>{`${comment.comment}`}</p>
          </div>
        ))}
    </div>
  )
}

export default CommentList
