import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";

export default function Goal({ goalData }) {
  let { goalID } = useParams();
  let currentGoal = goalData.filter((data) => {
    return data.id === goalID;
  });
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Goal</Typography>
        <Typography>ID:{currentGoal[0].bills} </Typography>
        <Grid container spacing={1}>
          {/* Tabs */}
          <Grid item xs={12} md={12} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "80vh",
                width: "79vw",
              }}
            >
              <div>
                <h2>{currentGoal[0].bills}</h2>
                <p>{currentGoal[0].priority}</p>
              </div>
              <div>
                <p>${}</p>
              </div>
            </Paper>
          </Grid>
          {/* Tabs /> */}
        </Grid>
      </Container>
    </Box>
  );
}
