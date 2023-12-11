import React from "react"
import styles from "../styles/Profile.module.css"
// images
import lgFriendTech from "../assets/lg_friend_tech.png"
function makeSimpleAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4)
}
const ListSocialHolding = ({ onClick, name, address, principal }) => {
  
  return (
    <div className={styles.box_holding_social_list}>
      <div className={styles.box_social_img}>
        <img src={lgFriendTech} alt="friend tech" />
      </div>
      <span className={styles.txt_social_name}>{name}</span>
      <span className={styles.txt_social_username}>
        {makeSimpleAddress(address)}
      </span>
      <button className={styles.btn_social_detail} onClick={onClick}>
        detail
      </button>
    </div>
  )
}

export default ListSocialHolding
