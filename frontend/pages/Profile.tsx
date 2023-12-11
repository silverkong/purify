import styles from "../styles/Profile.module.css"
import React, { ChangeEvent, useEffect, useState } from "react"
import { useCanister } from "@connect2ic/react"
import { useConnect, useDisconnect } from "wagmi"
// components
import Logo from "../components/Logo"
import ProfileTop from "../components/ProfileTop"
import ProfileBottomButton from "../components/ProfileBottomButton"
import ListSocialHolding from "../components/ListSocialHolding"
import ListSocialConnected from "../components/ListSocialConnected"
import SocialConnect from "../components/SocialConnect"

import { useAccount } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useNavigate } from "react-router-dom"

enum SocialFi {
  NextId,
  PostTech,
  FriendTech,
  StarsArena,
}
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
  const [index, setIndex] = useState<string[]>()
  const [profile, setProfile] = useState<string[]>()
  const [comments, setComments] = useState(null)

  const [connected, setConnected] = useState([])
  const { disconnect } = useDisconnect()
  // const {connect} = useConnect()
  const { open: connect } = useWeb3Modal()

  // Name, PFP
  const [name, setName] = useState("")
  const [pfp, setPfp] = useState("")
  const [holdings, setHoldings] = useState<any>()

  const { address, isConnected } = useAccount()
  const [socialFi, setSocialFi] = useState<SocialFi>()

  useEffect(() => {
    connectWalletAndQuery();
    
  },[])
  const connectWalletAndQuery = async () => {
    await connect()
    console.log("connected")
    await queryAll()
  }
  // useEffect(() => {
  //   queryIndex()
  //   queryProfile()
  // }, [])

  const queryAll = async () => {
    await queryIndex()
    await queryProfile()
    await queryFriendTech()
    await queryHolder()
  }
  
  const handleSocialFi = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "friendTech") {
      setSocialFi(SocialFi.FriendTech)
    } else if (e.target.value === "starsArena") {
      setSocialFi(SocialFi.StarsArena)
    } else if (e.target.value === "postTech") {
      setSocialFi(SocialFi.PostTech)
    } else if (e.target.value === "nextId") {
      setSocialFi(SocialFi.NextId)
    }
  }
  const queryIndex = async () => {
    console.log("Querying index")
    const index = (await purify.query_index(principal)) as string[]
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
    const profile = (await purify.query_profile(principal)) as string[]
    const comments = await purify.query_comments(principal)
    console.log("Profile queried")
    console.log(profile)
    if (profile.length === 0) {
      await purify.create_profile(principal)
      console.log("Profile created")
    } else {
      setProfile(profile)
      setComments(comments as string)
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
      await purify.update_index(principal, address, 2)
      // 이더 -> 프린 으로 고치셈
      await authentication.update_ethAddress(address, principal)
      await authentication.update_ethAddress(address.toLowerCase(), principal)
      console.log("updated ethAddress", address, principal)
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
            {index &&
              index.map((address, key) => (
                <ListSocialConnected
                  key={key}
                  address={address}
                  disconnect={() => disconnect()}
                />
              ))}
            <SocialConnect
              handleSocialFi={handleSocialFi}
              socialFi={socialFi}
              purify={purify}
              principal={principal}
              setIndex={setIndex}
            />
          </section>
        )}
      </section>
    </div>
  )
}
