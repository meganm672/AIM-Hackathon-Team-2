import React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import DashboardTabs from "./DashboardComponents/DashboardTabs";
import { Button } from "@mui/material";
import { IoIosInformationCircleOutline } from "react-icons/io";


export default function Home({ goalData }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100%",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" >
        <Typography variant="h4">Welcome Jane</Typography>
        <Button sx={{color: "#1c7488" }}>
          Take a tour 
        <IoIosInformationCircleOutline />
        </Button>
        <Grid container spacing={1}>
          {/* Tabs */}
          <Grid item xs={12} md={12} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "79vw",
                // marginBottom:4
              }}
            >
              <DashboardTabs goalData={goalData} />
            </Paper>
          </Grid>
          {/* Tabs /> */}
        </Grid>
      </Container>
    </Box>
  );
}
