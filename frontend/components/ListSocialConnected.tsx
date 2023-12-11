import React, { useEffect, useState } from "react"
import styles from "../styles/Profile.module.css"
import { useAccount, useDisconnect } from "wagmi"
// images
import lgFriendTech from "../assets/lg_friend_tech.png"

function makeSimpleAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4)
}
const ListSocialConnected = ({ disconnect ,address }) => {
  
  return (
    <div className={styles.box_connected_social_list}>
      {address &&
        <div>
          <div className={styles.box_social_img}>
            <img src={lgFriendTech} alt="friend tech" />
          </div>
          <span className={styles.txt_social_name}>friend.tech</span>
            <span className={styles.txt_social_address}>
              {makeSimpleAddress(address)}
            </span>
            <button className={styles.btn_social_disconnect} onClick={disconnect}>
              disconnect
            </button>
        </div>
      }
    
    </div>
  )
}

export default ListSocialConnected
