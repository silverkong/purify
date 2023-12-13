import styles from "../styles/Profile.module.css"
import React, { useEffect, useState } from "react"
import { useCanister } from "@connect2ic/react"
import { useDisconnect } from "wagmi"
// components
import Logo from "../components/Logo"
import ProfileTop from "../components/ProfileTop"
import ProfileBottomButton from "../components/ProfileBottomButton"
import CommentList from "../components/CommentList"

import { useAccount } from "wagmi"

//image
import message from "../image/message.png"

const baseURL = "https://base.llamarpc.com/"
// interface ProfileProps {
//   principal: string
// }
export default function SearchDetail({principal,commentPrincipal}) {
  // Canisters
  const [purify] = useCanister("purify")

  const [holding, setHolding] = useState(false)

  // Profile Query
  const [profile, setProfile] = useState(null)
  const [comments, setComments] = useState(null)

  const [connected, setConnected] = useState([])
  const { disconnect } = useDisconnect()

  // Name, PFP
  const [name, setName] = useState("")
  const [pfp, setPfp] = useState("")

  // Like, Dislike
  const [like, setLike] = useState(0)
  const [dislike, setDislike] = useState(0)

  // Commented
  const [commented, setCommented] = useState(false)

  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      queryProfile()
    }
  }, [isConnected])

  useEffect(() => {
    if (commented) {
      queryProfile()
      setCommented(false)
    }
  }, [commented])

  const queryProfile = async () => {
    console.log("Querying profile")
    if (commentPrincipal === null) {
      return
    }
    const profile = (await purify.query_profile(commentPrincipal)) as any
    const comments = await purify.query_comments(commentPrincipal)
    console.log("Profile queried")
    console.log(profile)
    if (profile.length === 0) {
      await purify.create_profile(commentPrincipal)
      console.log("Profile created")
    } else {
      setProfile(profile)
      setComments(comments)
      setName(profile[1])
      setPfp(profile[2])
      setLike(profile[3])
      setDislike(profile[4])
      console.log("Profile set", profile)
      console.log("Comments set", comments)
      console.log("Name set", name)
      console.log("Pfp set", pfp)
    }
  }

  return (
    <div>
      <Logo />
      {/* <ProfileTop
        name={name}
        pfp={pfp}
        principal={commentPrincipal}
        like={like}
        dislike={dislike}
      /> */}
      {/* 일단 각주처리 후 진행 */}
      <section className={styles.section_profile_bottom_title}>
        <img src={message} className={styles.msgImg} />
        <ProfileBottomButton
          className={holding ? "" : styles.btn_profile_bottom_active}
          content="Comment"
          onClick={() => setHolding(false)}
        />
      </section>
      <CommentList comments={comments} />
      {/* comment list 출력 */}
    </div>
  )
}
