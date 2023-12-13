import React from "react"
import PuriImg from "../image/smallPurify.png"
import "../styles/components/UserComment.css"

const UserComment = () => { //일단 UI만 먼저 짜자
  return (
    <div className="userCommnetBox">
        <img src = {PuriImg}/>
        <p className="commentText">그만 하고시퍼!</p>
    </div>
  )
}

export default UserComment
