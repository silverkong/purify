import { useCanister, useConnect } from "@connect2ic/react"
import React, { useEffect, useState } from "react"

const SocialQuery = () => {
  const [httpOutcalls] = useCanister("httpOutcalls")
  const [address, setAddress] = useState("")

  const queryFriendTech = async () => {
    console.log("queryFriendTech")
    console.log("address", address)
    console.log("httpOutcalls", httpOutcalls)
    try {
      const res = await httpOutcalls.queryFriendTech(address)
      if (!res) return
      const jsonRes = JSON.parse(res as string)
      console.log("success!", jsonRes)
    } catch (err) {
      console.log("error!", err)
    }
  }

  return (
    <div>
      <button onClick={queryFriendTech}>Fetch Friend Tech</button>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  )
}

export { SocialQuery }