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
import { useNavigate } from "react-router-dom"

const baseURL = "https://base.llamarpc.com/"
// interface ProfileProps {
//   principal: string
// }
export default function Profile({
  principal,
  setPrincipal,
  setCommentPrincipal,
}) {
  // navigate
  const navigate = useNavigate()

  // Canisters
  const [httpOutcalls] = useCanister("httpOutcalls")
  const [purify] = useCanister("purify")
  const [authentication] = useCanister("authentication")

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
  const [holdings, setHoldings] = useState<any>()

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
    await queryIndex()
    await queryProfile()
    await queryFriendTech()
    await queryHolder()
  }

  const queryIndex = async () => {
    console.log("Querying index")
    const index = (await purify.query_index(principal)) as any[]
    console.log("Index queried")
    console.log(index)
    if (index.length === 0) {
      await purify.create_index(principal)
      console.log("Index created")
    } else {
      setIndex(index)
    }
  }

  const queryProfile = async () => {
    console.log("Querying profile")
    const profile = (await purify.query_profile(principal)) as any
    const comments = await purify.query_comments(principal)
    console.log("Profile queried")
    console.log(profile)
    if (profile.length === 0) {
      await purify.create_profile(principal)
      console.log("Profile created")
    } else {
      setProfile(profile)
      setComments(comments)
      setName(profile[1])
      setPfp(profile[2])
    }
  }

  const queryFriendTech = async () => {
    console.log("queryFriendTech")
    console.log("address", address)
    console.log("httpOutcalls", httpOutcalls)
    try {
      const res = await httpOutcalls.queryFriendTech(address)
      console.log("res", res)
      const jsonRes = JSON.parse(res as string)
      console.log("success!", jsonRes)
      setName(jsonRes.twitterName)
      await purify.update_profile(principal, jsonRes.twitterName, 0)
      await purify.update_profile(principal, jsonRes.twitterPfpUrl, 1)
      await purify.update_index(principal, address, 0)
      // 이더 -> 프린 으로 고치셈
      await authentication.update_ethAddress(address, principal)
      await authentication.update_ethAddress(address.toLowerCase(), principal)
      console.log("updated ethAddress", address, principal)
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
      // if (!res) return
      const jsonRes = JSON.parse(res as string)
      console.log(jsonRes.users)
      // const holdingsArr = Object.keys(jsonRes.users).map((key) => jsonRes[key])
      // const list1 = list2.map(innerList => innerList[1]);
      const holdingsArr = Object.entries(jsonRes.users)
      const holdingsUsersArr = holdingsArr.map((holding) => holding[1])
      console.log("holdingsArr", holdingsUsersArr)

      setHoldings(holdingsUsersArr)
      console.log("updated profile")
    } catch (err) {
      console.log("error!", err)
    }
  }

  const handleComment = async (commentAddress) => {
    // setCommentPrincipal(holding.principal)
    // 현재는 프린 -> 이더로 되어있음 고치셈
    const res = await authentication.query_ethAddress(commentAddress)
    if (!res) {
      console.log("Queryying with address", commentAddress)
      console.log("res", res)
      console.log("No Purify ACC found")
      return
    } else {
      console.log("Purify ACC found", res)
      setCommentPrincipal(res)
      navigate("/comment")
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
            {holdings &&
              holdings.map((holding) => (
                // <div key={holding.id}>{holding.twitterName}</div>
                <ListSocialHolding
                  key={holding.id}
                  name={holding.twitterName}
                  address={holding.address}
                  principal={holding.principal}
                  onClick={() => {
                    handleComment(holding.address)
                  }}
                />
              ))}
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
