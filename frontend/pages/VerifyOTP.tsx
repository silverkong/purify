import { useNavigate } from "react-router-dom"
import React, { useRef, useState } from "react"
import "../styles/center.css"
import google from "../image/google.png"
import Logo from "../components/Logo"

import { authenticator as a } from "@otplib/preset-browser"

// II DEV
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent"
import { useCanister } from "@connect2ic/react"

const nicknameStyle = {
  color: "#444",
  fontFamily: "Poppins",
  fontSize: "1.875rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "1.875rem",
}

const buttonStyle = {
  width: "18.75rem",
  height: "3.75rem",
  flexShrink: "0",
  borderRadius: "1.875rem",
  background: "#06F",
  color: "#FFF",
  fontFamily: "Poppins",
  fontSize: "1.125rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "1rem",
  marginTop: "3.19rem",
}

const imgStyle = {
  marginTop: "3.06rem",
}

const inputBoxStyle = {
  marginTop: "2.5rem",
  display: "flex",
  gap: "0.5rem",
}

const inputStyle = {
  width: "4.375rem",
  height: "5.625rem",
  borderRadius: "1.25rem",
  border: "1px solid #DDD",
  background: "#FFF",
  gap: "0.88rem",
  color: "#444",
  textAlign: "center" as const,
  fontFamily: "Poppins",
  fontSize: "2.1875rem",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "2.1875rem",
}

const VerifyOTP = ({ principal, setTFAAuthed }) => {
  const [token, setToken] = useState("")
  const [authentication] = useCanister("authentication")
  const navigate = useNavigate()

  // II
  const [isConnected, setIsConnected] = React.useState(false)
  // const [principal, setPrincipal] = React.useState(null)

  const inputRefs = Array.from({ length: 6 }, (_, index) => useRef(null))

  const verifyAuthenticator = async () => {
    console.log("verifyAuthenticator")

    // Auth 모토코 쿼리
    const secret = await authentication.query_secretHash(principal)

    try {
      console.log("Verifying", token, secret)
      const isValid = await a.verify({ token, secret })
      console.log("isValid", isValid)

      setTFAAuthed(isValid)
      isValid && navigate("/profile")
    } catch (e) {
      console.error(e)
    }

    setToken("")
  }

  const handleInputChange = (index, e) => {
    if (/^\d$/.test(e)) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus()
      }
    }
  }
//
  return (
    <div>
      <Logo />
      <div className="center">
        <p style={nicknameStyle}>Verify OTP Code</p>
        <img src={google} style={imgStyle} />
        <div style={inputBoxStyle}>
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              style={inputStyle}
              type="text"
              maxLength={1}
              onChange={(e) => {
                handleInputChange(index, e.target.value)
                setToken(token + e.target.value)
              }}
            />
          ))}
        </div>
        <button style={buttonStyle} onClick={verifyAuthenticator}>
          Verify OTP
        </button>
      </div>
    </div>
  )
}

export default VerifyOTP
