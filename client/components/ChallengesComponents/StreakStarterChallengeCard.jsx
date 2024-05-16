import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgressWithLabel from '../DashboardComponents/Utils';
import { Stack,Box, IconButton, Chip } from '@mui/material';
import { GoTrash } from "react-icons/go";
import StreakStarterBadge from "../Badges/StreakStarterBadge"
const StreakStarterChallengeCard = () => {
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

        <StreakStarterBadge />
        <Stack direction="column">

        <Typography sx={{ fontSize: 14, paddingLeft:1, fontWeight:"bold" }} >
         Streak Starter
        </Typography>
        <Typography variant="caption" sx={{marginLeft: 1}} >
          Awarded for starting a streak
        </Typography>
        </Stack>
        </Stack>
        <Box>

        <Typography variant='caption'>
            Goal: <b>Student Loans</b>
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
        <Chip style={chipStyle} label="5 days left"/>
      </CardActions>
    </Card>
        </div>
    );
};

export default StreakStarterChallengeCard;