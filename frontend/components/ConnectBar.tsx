import React from "react"
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
export default function ConnectBar() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button />
    </WagmiConfig>
  )
}
