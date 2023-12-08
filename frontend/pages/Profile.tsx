import styles from "../styles/Profile.module.css"
import React, { useEffect, useState } from "react"
import { useCanister } from "@connect2ic/react"
import { useDisconnect } from "wagmi"
// components
import Logo from "../components/Logo"
import ProfileTop from "../components/ProfileTop"
import ProfileBottomButton from "../components/ProfileBottomButton"
import ListSocialHolding from "../components/ListSocialHolding"
import ListSocialConnected from "../components/ListSocialConnected"
import SocialConnect from "../components/SocialConnect"

const baseURL = "https://base.llamarpc.com/"
interface ProfileProps {
  principal: string
}
export default function Profile({ principal }: ProfileProps) {
  const [purify] = useCanister("purify")
  const [holding, setHolding] = useState(false)
  const [index, setIndex] = useState(null)
  const [connected, setConnected] = useState([])
  const { disconnect } = useDisconnect()
  useEffect(() => {
    queryIndex()
  }, [connected])

  const queryIndex = async () => {
    console.log("Querying index")
    const index = await purify.query_index(principal)
    console.log("Index queried")
    console.log(index)
    setIndex(index)
  }

  return (
    <div className="">
      <Logo />
      <ProfileTop />
      <section className={styles.section_profile_bottom_title}>
        <ProfileBottomButton
          className={holding ? "" : styles.btn_profile_bottom_active}
          content="connected social"
          onClick={() => setHolding(false)}
        />
        <ProfileBottomButton
          className={holding ? styles.btn_profile_bottom_active : ""}
          content="holding"
          onClick={() => setHolding(true)}
        />
      </section>
      <section>
        {holding ? (
          <section className={styles.section_holding}>
            <ListSocialHolding onClick={disconnect} />
            <ListSocialHolding onClick={disconnect} />
            <ListSocialHolding onClick={disconnect} />
            <ListSocialHolding onClick={disconnect} />
            <ListSocialHolding onClick={disconnect} />
          </section>
        ) : (
          <section className={styles.section_connected_social}>
            <ListSocialConnected onClick={disconnect} />
            <SocialConnect onClick={disconnect} />
          </section>
        )}
      </section>
    </div>
  )
}
