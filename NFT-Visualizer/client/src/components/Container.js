import React, {useState, useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import css from "./index.module.css"
import axios from "axios";
import {getRandomInt} from "./utils"
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import ChildConatiner from "./Child";
import EtherumImg from "../assets/ethreum.png"
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    color: theme.palette.text.secondary,
  }));

  const heights = []

const NFTContainer = (props) => {

    const {wallet, accountAddress} = props
    const [nftSymbol, setNFTSymbol] = useState('');
    const [nftName, setNFTName] = useState('');
    const [nftBaseURI, setNFTBaseURI] = useState('');
    const [nftData, setNFTData] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        getBasicData();
    }, [])

    useEffect(() => {
        if(nftBaseURI){
            getNFTDataFromServer()
            filTheHeight()
        }
    }, [nftBaseURI])

    const filTheHeight = async () => {
        const tokenCount = (await wallet.tokenCount()).toNumber();
        let i = 0;
        while(i < tokenCount){
            let randomValue = getRandomInt(250, 500);
            if(heights.length === 0){
                heights.push(randomValue);
                i++;
            }else{
                if(heights.indexOf(randomValue) === -1){
                    heights.push(randomValue);
                    i++;
                }else{
                    i--;
                }
            }
        }
    }

    const getBasicData = async () => {
        setLoading(true)
        const _symbol = await wallet.symbol();
        const _name = await wallet.name();
        const _baseUri = await wallet.baseUri();
        setNFTName(_name);
        setNFTBaseURI(_baseUri);
        setNFTSymbol(_symbol);
        setLoading(false)
    }

    const getNFTDataFromServer = async () => {
        setDataLoading(true)
        const tokenCount = (await wallet.tokenCount()).toNumber();
        const accounts = Array(tokenCount).fill(accountAddress || process.env.REACT_APP_MY_ADDRESS);
        const ids = Array.from({length: tokenCount}, (_, i) => i + 1);
        const _balances = await wallet.balanceOfBatch(accounts, ids);
        let res = []
        for(let i = 1; i <= tokenCount; i++){
            const {data} = await axios.get(`${nftBaseURI}img${i}.json`)
            data.amount = _balances[i-1].toNumber();
            res.push(data)
        }
        console.log('res is => ', res)
        setNFTData(res)
        setDataLoading(false)
    }

    if(loading){
        return(
            <>
            <div style={{margin: 'auto', textAlign: 'center', fontSize: '15px'}}>
                    loading...
            </div>
            </>
        )
    }
    return(
        <>
        <CssBaseline />
        <Container fixed>
            <Box sx={{height: '12vh', display: 'flex', justifyContent: 'space-evenly', alignContent: 'center',
        flexDirection: 'row' }} className={css.main_conatiner}>
                <Card sx={{ width: 200, height: 50, textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {nftName}
                </Typography>
                </Card>
                <Card sx={{ width: 200, height: 50, textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {nftSymbol}
                </Typography>
                </Card>
            </Box>
            {dataLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems:
        'center' }}>
                        <CircularProgress />
            </Box>}
            {nftData && !dataLoading && <Box sx={{ width: '100%' }} className= {css.data_conatiner}>
            <Masonry columns={3} spacing={2}>
        {nftData.map((item, index) => (
          <Paper key={index}>
            <StyledAccordion sx={{ minHeight: heights[index] }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.name}
                <img src = {item.image} width={'320px'} />
                <div className= {css.imp}>
                  <img src= {EtherumImg} width={'40px'} />
                  <span>{item.amount}</span>
                </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                  {item.description}
                  <ChildConatiner data = {item.attributes} />
              </AccordionDetails>
            </StyledAccordion>
          </Paper>
        ))}
      </Masonry>
    </Box>}
        </Container>
        </>
    )
}

export default NFTContainer