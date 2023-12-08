import { useCanister } from "@connect2ic/react"
import Logo from "../components/Logo"
import React, { useEffect, useState } from "react"
import styles from "../styles/Profile.module.css"
const baseURL = "https://base.llamarpc.com/"
interface ProfileProps {
  principal: string
}
export default function Profile({ principal }: ProfileProps) {
  const [purify] = useCanister("purify")
  const [holding, setHolding] = useState(false)
  const [index, setIndex] = useState(null)
  const [connected, setConnected] = useState([])

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
      <section className={styles.section_profile_top}>
        <div className={styles.box_profile_img}>프로필 이미지</div>
        <div className={styles.box_profile_info}>
          <div className={styles.box_profile_info_top}>
            <h2>unnamed</h2>
            <span>icp id</span>
          </div>
          <div className={styles.box_profile_info_bottom}>
            <h1>0</h1>
            <span>point</span>
          </div>
        </div>
      </section>
      <section className={styles.section_profile_bottom_title}>
        <button
          className={holding ? "" : styles.btn_profile_bottom_active}
          onClick={() => setHolding(false)}
        >
          connected social
        </button>
        <button
          className={holding ? styles.btn_profile_bottom_active : ""}
          onClick={() => setHolding(true)}
        >
          holding
        </button>
      </section>
      <section>
        {holding ? (
          <section className={styles.section_holding}></section>
        ) : (
          <section className={styles.section_connected_social}></section>
        )}
      </section>
    </div>
  )
}
