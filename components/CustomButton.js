import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@nextui-org/react";

export default function CustomButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? "DISCONNECT" : "CONNECT";

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    <Button.Group
      bordered
      color="gradient"
      auto
      shadow
      ripple="true"
      animated="true"
    >
      {isConnected && <Button>One</Button>}
      <Button onClick={onClick} disabled={loading}>
        {loading ? "LOADING..." : label}
      </Button>
    </Button.Group>
  );
}
