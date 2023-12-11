import React, { useEffect } from "react"
import styles from "../styles/Profile.module.css"
import { useAccount, useDisconnect } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"

const SocialConnect = ({
  handleSocialFi,
  socialFi,
  purify,
  principal,
  setIndex,
}) => {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const updateIndex = async (type: number) => {
    await purify.update_index(principal, address, type)
    setIndex(await purify.query_index(principal))
  }
  useEffect(() => {
    if (isConnected && socialFi) {
      console.log(socialFi)
      updateIndex(socialFi)
    }
  }, [socialFi])
  return (
    <div className={styles.box_connected_social_add}>
      <select
        name="social"
        className={styles.select_social}
        onChange={handleSocialFi}
      >
        <option value="">select social</option>
        <option value="friendTech">friend.tech</option>
        <option value="starsArena">stars arena</option>
        <option value="postTech">posttech</option>
        <option value="nextId">next id</option>
      </select>
      <button
        className={styles.btn_social_connect}
        onClick={() => {
          disconnect()
          open()
        }}
      >
        connect
      </button>
    </div>
  )
}

export default SocialConnect
