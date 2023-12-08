import React from "react"
import Logo from "../components/Logo"
import CreateOTPCode from "../components/CreateOTPCode"

const CreateOTP = ({ principal }) => {
  return (
    <div>
      <Logo />
      <CreateOTPCode principal={principal} />
    </div>
  )
}

export default CreateOTP
