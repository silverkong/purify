import React, { useState } from "react";
import CommentInput from "../components/CommentInput"
import CommentList from "../components/CommentList"

const CommentBox = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="commentBox">
        <section style={{marginTop:'1.25rem', marginLeft:'12rem'}}>
        <CommentList comments={comments} />
        <CommentInput onCommentSubmit={handleCommentSubmit} />
        </section>
    </div>
  )
}

export default CommentBox
