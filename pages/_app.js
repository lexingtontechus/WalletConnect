import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";

//import * as UAuthWeb3Modal from "@uauth/web3modal";
import UAuthSPA from "@uauth/js";
//import WalletConnectProvider from "@walletconnect/web3-provider";
//import Web3Modal from "web3modal";

export const uauthOptions = {
  clientID: process.env.NEXT_UAUTH_CLIENT_ID,
  redirectUri: process.env.NEXT_UAUTH_REDIRECT_URI,

  // Must include both the openid and wallet scopes.
  scope: "openid wallet",
};

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: "1",
    appName: "web3Modal",
    chains,
    projectId,
  }),

  provider,
  explorerAllowList: [
    // rainbow
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
    // Metamask
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    // Unstoppable Domains
    "8308656f4548bb81b3508afe355cfbb7f0cb6253d1cc7f998080601f838ecee3",
    //Unstoppable Wallet
    "7e90b95230bc462869bbb59f952273d89841e1c76bcc5319898e08c9f34bd4cd",
    //OpenSea
    "f759efd17edb158c361ffd793a741b3518fe85b9c15d36b9483fba033118aaf2",
  ],
  desktopWallets: [
    {
      id: "8308656f4548bb81b3508afe355cfbb7f0cb6253d1cc7f998080601f838ecee3",
      name: "Unstoppable",
      links: {
        native: "string",
        universal: "string",
      },
    },
  ],
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="light"
        themeColor="purple"
        themeBackground="gradient | themeColor"
        termsOfServiceUrl="https://example.com/terms-and-conditions"
        privacyPolicyUrl="https://example.com/privacy-policy"
    
      />
    </>
  );
}
