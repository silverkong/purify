import { useCanister } from "@connect2ic/react"
import React, { useEffect, useState } from "react"
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
    <div>
      <header></header>
      <div></div>
      <div>
        <button onClick={() => setHolding(false)}>connected social</button>
        <button onClick={() => setHolding(true)}>holding</button>
      </div>
      <div>{holding ? <div></div> : <div></div>}</div>
    </div>
  )
}
