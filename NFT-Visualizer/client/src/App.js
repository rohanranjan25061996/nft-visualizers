import {ethers} from "ethers"
import React, {useEffect, useState} from "react"
import {ABI} from "./ABI"
import Container from './components/Container';
import css from "./App.module.css"
import LoginModal from "./components/LoginModal"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMoralis } from "react-moralis";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import AllNFTContainer from "./components/AllNFTData";

// webiste link:  https://ournftvisualiser.netlify.app/

function App() {

  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false)
  const [accountAddress, setAccountAddress] = useState('')
  const [nftData, setNftData] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [noNft, setNoNft] = useState(false)
  const {logout, isAuthenticated, isWeb3Enabled, authenticate, user, enableWeb3, Moralis} = useMoralis();

  const {web3Loading, getweb3} = LoginModal();

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  const connectWallet = async () => {
    // await getweb3().then((res) => {
    //   console.log("getWeb3 response is => ", res)
    //   res.eth.getAccounts().then((res) => {
    //     setAccountAddress(res[0])
    //     setConnected(true)
    //   })
    // })
    let user = Moralis.User.current();
    user = await authenticate().then((res) => {
      setAccountAddress(res.get('ethAddress'))
      setConnected(true)
    })
  }

  const disconnectWallet = async () => {
  //  let ok =  await (await getweb3()).setProvider(null)
   setConnected(false)
   setAccountAddress('')
   await logout();
  }

  useEffect(() => {
    if(accountAddress){
      setDataLoading(true)
      getTokenData()
    }
  }, [accountAddress])

  const getTokenData = async () => {
    const options = {chain: 'rinkeby', addresses: accountAddress}
    const tokenData = await Moralis.Web3API.account.getNFTs(options);
    console.log("Token Address is => ", tokenData)
    const {result} = tokenData
    setCount(result.length)
    if(result.length === 0){
      setNoNft(true)
      setDataLoading(false)
    }else{
      getNFTData(result)
      setNoNft(false)
    }
  }

  const getNFTData = async (result) => {
    let arr = []
    for(let i = 0; i < result.length; i++){
      const uri = result[i].token_uri
      const {data} = await axios.get(uri)
      data.amount = result[i].amount
      data.name = result[i].name
      data.symbol = result[i].symbol
      arr.push(data)
    }
    setNftData(arr)
    setDataLoading(false)
    setNoNft(false)
  }

  // useEffect(() => {
  //   if(connected && accountAddress){
  //     const provider = new ethers.providers.JsonRpcBatchProvider(process.env.REACT_APP_RINKEBY_NETWORK_URL)

  //   const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ABI, provider);
  //   setWallet(wallet)
  //   }
  // }, [connected])

  useEffect(() => {
    if(nftData.length !== 0){
      console.log("nftData is => ", nftData)
    }
  }, [nftData])
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFT Visualizer
          </Typography>
          {accountAddress &&  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {accountAddress}
          </Typography>}
          <Button color="inherit" onClick = {connectWallet}>{web3Loading ? 'Connecting' : connected ? 'Connected' : 'Connect To Wallet'}</Button>
          {connected && <Button color="inherit" onClick = {disconnectWallet}>Disconnect</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    {/* {connected && <div className={css.super_main}>
      {wallet && connected && accountAddress && <Container wallet = {wallet} accountAddress = {accountAddress} />}
    </div>} */}
    {!connected && accountAddress === '' && <div>
    <h4>Please connect your wallet, to fetch all minted nft data of particular account address</h4>
      </div>}
     {dataLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems:
        'center' }}>
                        <CircularProgress />
            </Box>}
      {!dataLoading && !noNft && nftData && count && connected && <AllNFTContainer nftData = {nftData} tokenCount = {count} />}
      {noNft && <div>NFT is not minted with this account address</div>}
    </>
  );
}

export default App;
