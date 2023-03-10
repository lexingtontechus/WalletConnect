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

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error(
    "You need to provide Wallet Connect NEXT_PUBLIC_PROJECT_ID env variable"
  );
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [
  mainnet,
  polygon,
  //avalanche,
  //arbitrum,
  //bsc,
  //optimism,
  //gnosis,
  //fantom,
];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: new modalConnectors({
    version: "2",
    appName: "4MoBeers",
    chains,
    projectId,
    mobileWallets: [
      {
        id: "8308656f4548bb81b3508afe355cfbb7f0cb6253d1cc7f998080601f838ecee3",
        name: "Unstoppable",
      },
    ],
    desktopWallets: [
      {
        id: "8308656f4548bb81b3508afe355cfbb7f0cb6253d1cc7f998080601f838ecee3",
        name: "Unstoppable",
      },
    ],
    walletImages: [
      {
        rainbow:
          "https://explorer-api.walletconnect.com/v3/logo/md/7a33d7f1-3d12-4b5c-f3ee-5cd83cb1b500?projectId=8bc78d25d0d8a616d7d8a3ddad523708",
        metaMask:
          "https://explorer-api.walletconnect.com/v3/logo/sm/5195e9db-94d8-4579-6f11-ef553be95100?projectId=8bc78d25d0d8a616d7d8a3ddad523708",
        unstoppable:
          "https://explorer-api.walletconnect.com/v3/logo/sm/4725dda0-4471-4d0f-7adf-6bbe8b929c00?projectId=8bc78d25d0d8a616d7d8a3ddad523708",
      },
    ],
    explorerAllowList: [
      // rainbow
      "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
      // Metamask
      "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
      // Unstoppable Domains
      "8308656f4548bb81b3508afe355cfbb7f0cb6253d1cc7f998080601f838ecee3",
      //Wallet Connect
      "7e90b95230bc462869bbb59f952273d89841e1c76bcc5319898e08c9f34bd4cd",
    ],
  }),
  provider,
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
        themeMode="dark"
        themeColor="purple"
        themeBackground="gradient | themeColor"
        termsOfServiceUrl="https://example.com/terms-and-conditions"
        privacyPolicyUrl="https://example.com/privacy-policy"
      />
    </>
  );
}
