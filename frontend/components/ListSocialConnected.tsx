import React from "react"
import styles from "../styles/Profile.module.css"
// images
import lgFriendTech from "../assets/lg_friend_tech.png"

const ListSocialConnected = ({ onClick }) => {
  return (
    <div className={styles.box_connected_social_list}>
      <div className={styles.box_social_img}>
        <img src={lgFriendTech} alt="friend tech" />
      </div>
      <span className={styles.txt_social_name}>friend.tech</span>
      <span className={styles.txt_social_address}>0x1b0BC...Dad9</span>
      <button className={styles.btn_social_disconnect} onClick={onClick}>
        disconnect
      </button>
    </div>
  )
}

export default ListSocialConnected
