import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LinearProgressWithLabel from "./DashboardComponents/Utils";
import { current } from "@reduxjs/toolkit";

export default function Goal({ goalData }) {
  let [open, setOpen] = useState(false);
  let [addMoney, setAddMoney] = useState(0);
  let { goalID } = useParams();
  console.log(goalData());
  let currentGoal = goalData().filter((data) => {
    return data.id == goalID;
  });
  console.log("current goal");
  console.log(currentGoal);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleAddMoneyPush = (value) => setAddMoney(value);

  const handleSubmitAddMoney = (e) => {
    e.preventDefault();
    if (typeof addMoney !== "number") {
      return;
    }
    handleCloseModal();
    currentGoal[0].amountPaid += addMoney;
    setAddMoney(0);
  };

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
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link underline="hover" color="inherit" href="/">
          Goals
        </Link>
        <Typography color="text.primary">Bills</Typography>
      </Breadcrumbs>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h4">{currentGoal[0].bills}</Typography>
                <Typography>{currentGoal[0].priority}</Typography>
              </div>
              <LinearProgressWithLabel
                variant="determinate"
                value={
                  (currentGoal[0].amountPaid / currentGoal[0].totalAmount) * 100
                }
              />
              <br></br>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "20vh",
                }}
              >
                <Typography>${currentGoal[0].amountPaid}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <Typography sx={{ margin: 1 }} variant="caption">
                      ${currentGoal[0].totalAmount}
                    </Typography>
                    <Typography variant="caption">
                      {currentGoal[0].deadline}
                    </Typography>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="add"
                      onClick={handleOpenModal}
                    >
                      <AddIcon />
                    </Fab>
                    <Typography>Add Money</Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ margin: 1 }}>
                    Goal
                  </Typography>
                  <Typography variant="caption">Date</Typography>
                </div>
                <Modal
                  open={open}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <form onSubmit={handleSubmitAddMoney}>
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Add Money
                      </Typography>
                      <TextField
                        id="filled-basic"
                        placeholder="$0.00"
                        variant="outlined"
                        value={addMoney}
                        onChange={(e) => {
                          let num = Number(e.target.value);
                          if (isNaN(num)) {
                            return setAddMoney(0);
                          }
                          return setAddMoney(num);
                        }}
                      />
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(5)}
                        >
                          $5
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(10)}
                        >
                          $10
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(25)}
                        >
                          $25
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(50)}
                        >
                          $50
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(100)}
                        >
                          $100
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(500)}
                        >
                          $500
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(1000)}
                        >
                          $1000
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddMoneyPush(10000)}
                        >
                          $10000
                        </Button>
                      </Box>
                      <Button variant="outlined" type="submit">
                        Add Money
                      </Button>
                    </Box>
                  </form>
                </Modal>
              </Paper>
            </Paper>
          </Grid>
          {/* Tabs /> */}
        </Grid>
      </Container>
    </Box>
  );
}
const style = {
  position: "absolute",
  padding: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  Typography: 4,
};
