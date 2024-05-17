import React, { useState } from "react";
import { BsFillFilterSquareFill } from "react-icons/bs";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import ChallengeConquerorChallengeCard from "./ChallengeConqurereChallengeCard";
import BudgetBossChallengeCard from "./DebtSlayerChallengeCard";
import ChallengeAcceptedChallengeCard from "./ChallengeAcceptedChallengeCard";
import StreakStarterChallengeCard from "./StreakStarterChallengeCard";
import ChallengeChampionChallengeCard from "./ChallengeChampionChallengeCard";
import GoalGrubberChallengeCard from "./GoalGrubberChallengeCard";
import DebtSlayerChallengeCard from "./DebtSlayerChallengeCard";
const ChallengesPage = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Paper elevation={2} sx={{ backgroundColor: "#F2F8FD", padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ margin: 1 }}
        >
          <Typography variant="h5">History</Typography>
          <div>
            <Button
              variant="contained"
              sx={{ color: "#FFFFFF", backgroundColor: "#1F648E" }}
              onClick={handleClickOpen}
            >
              + Add Challenges
            </Button>
            <IconButton sx={{ color: "#1F648E" }}>
              <BsFillFilterSquareFill />
            </IconButton>
          </div>
        </Stack>
        <Grid container spacing={2}>
          <Grid item>
            <DebtSlayerChallengeCard />
          </Grid>
          <Grid item>
            <ChallengeAcceptedChallengeCard />
          </Grid>
          <Grid item>
            <ChallengeChampionChallengeCard />
          </Grid>
          <Grid item>
            <ChallengeConquerorChallengeCard />
          </Grid>
          <Grid item>
            <GoalGrubberChallengeCard />
          </Grid>
          <Grid item>
            <StreakStarterChallengeCard />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ChallengesPage;
