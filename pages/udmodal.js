import { connectors } from "web3modal"
import * as UAuthWeb3Modal from '@uauth/web3modal'
import UAuthSPA from '@uauth/js'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

export const uauthOptions = {
  clientID: process.env.NEXT_UAUTH_CLIENT_ID,
  redirectUri: process.env.NEXT_UAUTH_REDIRECT_URI,

  // Must include both the openid and wallet scopes.
  scope: "openid wallet",
};
