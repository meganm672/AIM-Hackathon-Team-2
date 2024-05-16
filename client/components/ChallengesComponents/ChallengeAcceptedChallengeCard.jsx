import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChallengeAcceptedBadge from "../Badges/ChallengeAcceptedBadge";
import LinearProgressWithLabel from '../DashboardComponents/Utils';
import { Stack,Box, IconButton, Chip } from '@mui/material';
import { GoTrash } from "react-icons/go";



const ChallengeAcceptedChallengeCard = () => {
    const chipStyle = {
        borderRadius: "4px", 
        backgroundColor: "#D3D3FF",
        color: "#6744C9"
      };
    return (
        <div>
             <Card sx={{ minWidth: 275, maxWidth:275 }}>
      <CardContent>
        <Stack direction="row">

        <ChallengeAcceptedBadge />
        <Stack direction="column">

        <Typography sx={{ fontSize: 14, paddingLeft:1, fontWeight:"bold" }} >
         Challenge Accepted
        </Typography>
        <Typography variant="caption" sx={{marginLeft: 1}} >
          Awarded for signing up for an optional budgeting challenge
        </Typography>
        </Stack>
        </Stack>
        <Box>

        <Typography variant='caption'>
            Goal: <b>Childcare</b>
        </Typography>
        </Box>
       <Box sx={{marginTop: 4}}>

        <LinearProgressWithLabel
                variant="determinate"
                value={50}
              />
       </Box>
    
      </CardContent>
      <CardActions sx={{justifyContent:"space-between"}}>
        <IconButton size="small" sx={{backgroundColor:"#F2F6FA", borderRadius:" 4px"}}>
            <GoTrash />
        </IconButton>
        <Chip style={chipStyle} label="15 days left"/>
      </CardActions>
    </Card>
        </div>
    );
};

export default ChallengeAcceptedChallengeCard;