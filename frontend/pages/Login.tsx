import { useNavigate } from "react-router-dom"
import styles from "../styles/Login.module.css"
import ButtonSolid from "../components/ButtonSolid"

import lgPurifyText from "../assets/lg_purify_text.svg"
import React, { useState } from "react"

// II DEV
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent"
import { useCanister } from "@connect2ic/react"

interface LoginProps {
  TFAuthed: boolean
  setTFAAuthed: (value: boolean) => void
  principal: string
  setPrincipal: (value: string) => void
}
const Login = ({
  TFAuthed,
  setTFAAuthed,
  principal,
  setPrincipal,
}: LoginProps) => {
  const [authentication] = useCanister("authentication")
  const [TFRegistered, setTFRegistered] = useState(false)

  // II
  const [isConnected, setIsConnected] = React.useState(false)
  // const [principal, setPrincipal] = React.useState(null)

  const navigate = useNavigate()

  const login = async () => {
    const authClient = await AuthClient.create()
    const internetIdentity = import.meta.env.VITE_INTERNET_IDENTITY
    authClient.login({
      identityProvider: `http://localhost:4943/?canisterId=${internetIdentity}`,
      onSuccess: () => {
        console.log("Logged in")
        setIsConnected(true)
      },
    })

    const identity = await authClient.getIdentity()
    setPrincipal(identity.getPrincipal().toString())
    console.log("principal", identity.getPrincipal().toString())
    const agent = new HttpAgent({ identity })

    const res = await authentication.query_secretProvided(
      identity.getPrincipal().toString(),
    )
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
      <ButtonSolid content={"login"} onClick={login} />
    </section>
  )
}

export default Login
