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

import { useAccount } from "wagmi"

const baseURL = "https://base.llamarpc.com/"
// interface ProfileProps {
//   principal: string
// }
export default function Profile({ principal }) {
  // Canisters
  const [httpOutcalls] = useCanister("httpOutcalls")
  const [purify] = useCanister("purify")

  const [holding, setHolding] = useState(false)

  // Profile Query
  const [index, setIndex] = useState(null)
  const [profile, setProfile] = useState(null)
  const [comments, setComments] = useState(null)

  const [connected, setConnected] = useState([])
  const { disconnect } = useDisconnect()

  // Name, PFP
  const [name, setName] = useState("")
  const [pfp, setPfp] = useState("")
  const [holdings, setHoldings] = useState<string[]>()

  const { address, isConnected } = useAccount()

  useEffect(() => {
    queryIndex()
    queryProfile()
  }, [])

  useEffect(() => {
    if (isConnected) {
      queryAll()
    }
  }, [isConnected])

  const queryAll = async () => {
    await queryFriendTech()
    await queryHolder()
    await queryIndex()
    await queryProfile()
  }

  const queryIndex = async () => {
    console.log("Querying index")
    const index = await purify.query_index(principal)
    console.log("Index queried")
    console.log(index)
    setIndex(index)
  }

  const queryProfile = async () => {
    console.log("Querying profile")
    const profile = await purify.query_profile(principal)
    const comments = await purify.query_comments(principal)
    console.log("Profile queried")
    console.log(profile)
    setProfile(profile)
    setComments(comments)
    setName(profile[1])
    setPfp(profile[2])
  }

  const queryFriendTech = async () => {
    console.log("queryFriendTech")
    console.log("address", address)
    console.log("httpOutcalls", httpOutcalls)
    try {
      const res = await httpOutcalls.queryFriendTech(address)
      if (!res) return
      const jsonRes = JSON.parse(res as string)
      console.log("success!", jsonRes)
      setName(jsonRes.twitterName)
      await purify.update_profile(principal, jsonRes.twitterName, 0)
      await purify.update_profile(principal, jsonRes.twitterPfpUrl, 1)
      await purify.update_index(principal, address, 0)
      console.log("updated profile")
    } catch (err) {
      console.log("error!", err)
    }
  }

  const queryHolder = async () => {
    console.log("queryHolder")
    console.log("address", address)
    console.log("httpOutcalls", httpOutcalls)
    try {
      const res = await httpOutcalls.queryHolder(address)
      if (!res) return
      const jsonRes = JSON.parse(res as string)
      const holdingsArr = Object.keys(jsonRes).map((key) => jsonRes[key])
      setHoldings(holdingsArr)
      console.log("success!", holdingsArr)
      console.log("updated profile")
    } catch (err) {
      console.log("error!", err)
    }
  }

  return (
    <div>
      <Logo />
      <ProfileTop name={name} pfp={pfp} principal={principal} />
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
            {holdings && holdings.map((holding) => <div>{holding}</div>)}
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
