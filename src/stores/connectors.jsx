import {InjectedConnector} from "@web3-react/injected-connector";
// import { NetworkConnector } from "@web3-react/network-connector";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {WalletLinkConnector} from "@web3-react/walletlink-connector";
import {LedgerConnector} from "@web3-react/ledger-connector";
import {TrezorConnector} from "@web3-react/trezor-connector";
import {FrameConnector} from "@web3-react/frame-connector";
import {FortmaticConnector} from "@web3-react/fortmatic-connector";
import {PortisConnector} from "@web3-react/portis-connector";
import {SquarelinkConnector} from "@web3-react/squarelink-connector";
import {TorusConnector} from "@web3-react/torus-connector";
import {AuthereumConnector} from "@web3-react/authereum-connector";

const POLLING_INTERVAL=12000;
const RPC_URLS={
  1: "https://eth-mainnet.alchemyapi.io/v2/tIh40leTPQfMnBjxhQgufOcR8XLsIEYj",
  4: "https://rinkeby.infura.io/v3/38e56806c8f4467ab892bd3911d54157"
};

export const injected=new InjectedConnector({
  supportedChainIds: [1,3,4,5,42]
});

// export const network = new NetworkConnector({
//   urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
//   defaultChainId: 1,
//   pollingInterval: POLLING_INTERVAL
// });

export const walletconnect=new WalletConnectConnector({
  rpc: {1: RPC_URLS[1]},
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink=new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: "Da-Fi Entropy"
});

export const ledger=new LedgerConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL
});

export const trezor=new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "https://8rg3h.csb.app/"
});

export const frame=new FrameConnector({supportedChainIds: [1]});

export const fortmatic=new FortmaticConnector({
  apiKey: "pk_live_ABD29B8F212A94C2",
  chainId: 1
});

export const portis=new PortisConnector({
  dAppId: "bca62abb-e573-4ad3-804c-46531cd17166",
  networks: [1,100]
});

export const squarelink=new SquarelinkConnector({
  clientId: "5f2a2233db82b06b24f9",
  networks: [1,100]
});

export const torus=new TorusConnector({chainId: 1});

export const authereum=new AuthereumConnector({chainId: 1});
