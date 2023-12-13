import { useNavigate } from "react-router-dom"
import styles from "../styles/Login.module.css"
import ButtonSolid from "../components/ButtonSolid"

import lgPurifyText from "../assets/lg_purify_text.svg"
import React, { useEffect, useState } from "react"

// Mainnet II
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
  useCanister,
} from "@connect2ic/react"

// II DEV
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent"
// import { useCanister } from "@connect2ic/react"

interface LoginProps {
  TFAuthed: boolean
  setTFAAuthed: (value: boolean) => void
  // principal: string
  setPrincipal: (value: string) => void
}
const Login = ({
  TFAuthed,
  setTFAAuthed,
  // principal,
  setPrincipal,
}: LoginProps) => {
  // Mainnet II
  const { isConnected, principal } = useConnect()

  const [authentication] = useCanister("authentication")
  const [TFRegistered, setTFRegistered] = useState(false)

  // II
  // const [isConnected, setIsConnected] = React.useState(false)
  // const [principal, setPrincipal] = React.useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (isConnected) {
      setPrincipal(principal)
      login()
    }
  }, [isConnected])

  const login = async () => {
    const res = await authentication.query_secretProvided(principal)
    if (res) {
      setTFRegistered(true)
    }
    console.log("LOGIN RES", res)
    // if (res === true) {
    //   navigate("/verifyOTP")
    // } else {
    //   navigate("/createOTP")
    // }
    navigate("/createOTP")
  }

  return (
    <section className={styles.section_login}>
      <div className={styles.logo}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      <img className={styles.logo_text} src={lgPurifyText} alt="purify" />
      {/* <ButtonSolid content={"login"} onClick={login} /> */}
      <ConnectButton onConnect={login} />
      <ConnectDialog />
    </section>
  )
}

export default Login
