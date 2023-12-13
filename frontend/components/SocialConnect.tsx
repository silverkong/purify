import React, { useEffect } from "react"
import styles from "../styles/Profile.module.css"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/dist/connectors/injected"
import { useWeb3Modal } from "@web3modal/wagmi/react"

const SocialConnect = ({
  handleSocialFi,
  socialFi,
  purify,
  principal,
  setIndex,
  setRerender,
}) => {
  const { address } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const updateIndex = async (type: number) => {
    console.log("update index", type)
    await purify.update_index(principal, address, type)
    setRerender(true)
    const _index = await purify.query_index(principal)
    setIndex(_index)
    console.log("index", _index)
  }

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
        disabled={!socialFi}
        onClick={async () => {
          console.log("connect", socialFi)
          disconnect()
          await open()
          socialFi && (await updateIndex(socialFi))
        }}
      >
        connect
      </button>
    </div>
  )
}

export default SocialConnect
