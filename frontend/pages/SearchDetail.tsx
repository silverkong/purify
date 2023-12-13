import styles from "../styles/Profile.module.css"
import React, { useEffect, useState } from "react"
import { useCanister } from "@connect2ic/react"
import { useDisconnect } from "wagmi"
// components
import Logo from "../components/Logo"
import ProfileTop from "../components/ProfileTop"
import ProfileBottomButton from "../components/ProfileBottomButton"
import CommentBox from "../components/CommentBox"

import { useAccount } from "wagmi"

//image
import message from "../image/message.png"

const baseURL = "https://base.llamarpc.com/"
// interface ProfileProps {
//   principal: string
// }
export default function SearchDetail() {
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

  // const queryAll = async () => {
  //   await queryProfile()
  // }

  return (
    <div>
      <Logo />

      <section className={styles.section_profile_bottom_title}>
        <img src={message} className={styles.msgImg} />
        <ProfileBottomButton
          className={holding ? "" : styles.btn_profile_bottom_active}
          content="Comment"
          onClick={() => setHolding(false)}
        />
      </section>
    </div>
  )
}
