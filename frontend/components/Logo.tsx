import React from "react"
import smallLogo from "../assets/lg_purify_full.svg"

const headerStyle = {
  position: "fixed" as const,
  top: "0",
  width: "100%",
  height: "6.25rem",
  flexShrink: "0",
  background: "#FFF",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
  zIndex: "1",
}

const logoStyle = {
  marginLeft: "200px",
  marginTop: "1.88rem",
}

const Logo = () => {
  return (
    <header style={headerStyle}>
      <img src={smallLogo} style={logoStyle} />
    </header>
  )
}

export default Logo
