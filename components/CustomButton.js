import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button, css } from "@nextui-org/react";

export default function CustomButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
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
    <Button.Group>
      {isConnected && <Button>{address}</Button>}
      <Button
        onClick={onClick}
        disabled={loading}
        css={{ color: "#f4f4f5", background: "#9333ea" }}
        auto
        shadow
        ripple="true"
        animated="true"
      >
        {loading ? "CONNECTING ..." : label}
      </Button>
    </Button.Group>
  );
}
