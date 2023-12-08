import React from "react"
import styles from "../styles/Profile.module.css"
// images
import lgFriendTech from "../assets/lg_friend_tech.png"

const ListSocialHolding = ({ onClick }) => {
  return (
    <div className={styles.box_holding_social_list}>
      <div className={styles.box_social_img}>
        <img src={lgFriendTech} alt="friend tech" />
      </div>
      <span className={styles.txt_social_name}>friend.tech</span>
      <span className={styles.txt_social_username}>0x1b0BC...Dad9</span>
      <button className={styles.btn_social_detail} onClick={onClick}>
        detail
      </button>
    </div>
  )
}

export default ListSocialHolding
