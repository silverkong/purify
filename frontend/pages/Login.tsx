import { useNavigate } from "react-router-dom"
import styles from "../styles/Login.module.css"
import ButtonSolid from "../components/ButtonSolid"

import lgPurifyText from "../assets/lg_purify_text.svg"
import React from "react"

const Login = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.section_login}>
      <div className={styles.logo}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
      <img className={styles.logo_text} src={lgPurifyText} alt="purify" />
      <ButtonSolid content={"login"} onClick={() => navigate("/profile")} />
    </section>
  )
}

export default Login
