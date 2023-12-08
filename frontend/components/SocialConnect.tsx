import React from "react"
import styles from "../styles/Profile.module.css"

const SocialConnect = ({ onClick }) => {
  return (
    <div className={styles.box_connected_social_add}>
      <select name="social" className={styles.select_social}>
        <option value="">select social</option>
        <option value="friendTech">friend.tech</option>
        <option value="starsarena">stars arena</option>
        <option value="posttech">posttech</option>
      </select>
      <button className={styles.btn_social_connect} onClick={onClick}>
        connect
      </button>
    </div>
  )
}

export default SocialConnect
