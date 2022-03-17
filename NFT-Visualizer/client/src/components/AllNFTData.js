import React, {useState, useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import css from "./index.module.css"
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    color: theme.palette.text.secondary,
  }));

  const heights = []

const AllNFTContainer = (props) => {

    const {nftData, tokenCount} = props
    console.log('AllNFT => ', nftData, tokenCount)

    useEffect(() => {
        filTheHeight() 
    },[])

    const filTheHeight = () => {
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
    return(
        <>
        <CssBaseline />
        <Container fixed>
            {nftData && <Box sx={{ width: '100%' }} className= {css.data_conatiner}>
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
                  <span>{item.symbol}</span>
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

export default AllNFTContainer