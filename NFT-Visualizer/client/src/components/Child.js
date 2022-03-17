import React from "react"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {
    AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
  

const ChildConatiner = (props) => {

    const {data} = props
    return(
        <>
        {data && data.map((item) => <AccordionDetails>
            <div>
                <div>
                    {item.trait_type}
                </div>
                <div>
                <BorderLinearProgress variant="determinate" value={(item.value / item.max_value) * 100} />
                </div>
            </div>
        </AccordionDetails>)}
        </>
    )
}

export default ChildConatiner