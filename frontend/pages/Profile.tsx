import styles from "../styles/Profile.module.css"
import React, { useEffect, useState } from "react"
import { useCanister } from "@connect2ic/react"
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
  // Canisters
  const [httpOutcalls] = useCanister("httpOutcalls")
  const [purify] = useCanister("purify")

  const [holding, setHolding] = useState(false)

  // Profile Query
  const [index, setIndex] = useState(null)
  const [profile, setProfile] = useState(null)
  const [comments, setComments] = useState(null)

  const [connected, setConnected] = useState([])
  const [address, setAddress] = useState("")

  // Name, PFP
  const [name, setName] = useState("")

  useEffect(() => {
    queryIndex()
    queryProfile()
  }, [connected])

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
      console.log("updated profile")
    } catch (err) {
      console.log("error!", err)
    }
  }

  return (
    <div className="">
      <Logo />
      <ProfileTop name={name} principal={principal} />
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
            <ListSocialHolding onClick={() => {}} />
          </section>
        ) : (
          <section className={styles.section_connected_social}>
            <ListSocialConnected onClick={() => {}} />
            <SocialConnect onClick={() => {}} />
          </section>
        )}
      </section>
    </div>
  )
}
