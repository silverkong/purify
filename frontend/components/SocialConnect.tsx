import React from "react"
import styles from "../styles/Profile.module.css"
import { useAccount } from "wagmi"

const SocialConnect = ({ connect }) => {
  return (
    <div className={styles.box_connected_social_add}>
      <select name="social" className={styles.select_social}>
        <option value="">select social</option>
        <option value="friendTech">friend.tech</option>
        <option value="starsarena">stars arena</option>
        <option value="posttech">posttech</option>
        <option value="nextId">next id</option>
      </select>
      <button className={styles.btn_social_connect} onClick={connect}>
        connect
      </button>
    </div>
  )
}

export default SocialConnect
