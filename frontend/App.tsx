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
import * as httpOutcalls from "../.dfx/local/canisters/httpOutcalls"
import { Purify } from "./components/Purify"

// Pages
import { Authenticator } from "./components/Authenticator"
import Login from "./pages/Login"
import CreateOTP from "../frontend/pages/CreateOTP"
import VerifyOTP from "./pages/VerifyOTP"

// SocialQuery
import { SocialQuery } from "./components/SocialQuery"
import Profile from "./pages/Profile"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { mainnet, base, arbitrum } from "viem/chains"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { publicProvider } from "wagmi/providers/public"

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLET_PROJECT

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [mainnet, base, arbitrum],
  [publicProvider()],
)

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })
function App() {
  // const { isConnected, principal } = useConnect()

  const [TFAuthed, setTFAAuthed] = useState(false)
  const [principal, setPrincipal] = useState("")

  return (
    <WagmiConfig config={wagmiConfig}>
    <Routes>
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
      {TFAuthed && (
        <div>
          <SocialQuery principal={principal} />
        </div>
      )}

        <Route
          path="/"
          element={
            <Login
              TFAuthed={TFAuthed}
              setTFAAuthed={setTFAAuthed}
              principal={principal}
              setPrincipal={setPrincipal}
            />
          }
        />
        <Route
          path="/createOTP"
          element={<CreateOTP principal={principal} />}
        />
        <Route
          path="/verifyOTP"
          element={
            <VerifyOTP principal={principal} setTFAAuthed={setTFAAuthed} />
          }
        />
        <Route path="/profile" element={<Profile principal={principal} />} />
      </Routes>
    </WagmiConfig>
  )
}

const client = createClient({
  canisters: {
    purify,
    authentication,
    httpOutcalls,
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
