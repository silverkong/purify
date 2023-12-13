import React from "react"
import PuriImg from "../image/smallPurify.png"
import "../styles/components/UserComment.css"
import CommentList from "./CommentList"

const UserComment = ({ comments }) => {
  return (
    <div className="userCommnetBox">
      <CommentList comments={comments} />
    </div>
  )
}

export default UserComment
