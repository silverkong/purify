import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import logo from "./assets/dfinity.svg"
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
  useCanister,
} from "@connect2ic/react"
// import "@connect2ic/core/style.css"
import * as purify from "../.dfx/local/canisters/purify"
import * as authentication from "../.dfx/local/canisters/authentication"
import { Purify } from "./components/Purify"

// Pages
import { Authenticator } from "./components/Authenticator"
import Login from "./pages/Login"
        import CreateOTP from '../frontend/pages/CreateOTP'; 

function App() {
  // const { isConnected, principal } = useConnect()

  const [TFAuthed, setTFAAuthed] = useState(false)
  const [principal, setPrincipal] = useState("")

  return (
    <main>
      {/* {isConnected && (
        <div>
          <div>Connected</div>
          <div>{principal}</div>
        </div>
      )} */}
      {/* <div>
        <ConnectButton />
      </div> */}
      {/* <ConnectDialog /> */}
      <div>
        <Purify TFAuthed={TFAuthed} principal={principal} />
      </div>
      {!TFAuthed && (
        <div>
          <Authenticator
            TFAuthed={TFAuthed}
            setTFAAuthed={setTFAAuthed}
            principal={principal}
            setPrincipal={setPrincipal}
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createOTP" element={<CreateOTP />} />
      </Routes>
    </main>
  )
}

const client = createClient({
  canisters: {
    purify,
    authentication,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
