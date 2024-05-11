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

export default function Goal({ goalData }) {
  let [open, setOpen] = useState(false);
  let [addMoney, setAddMoney] = useState(0);
  let { goalID } = useParams();
  let currentGoal = goalData.filter((data) => {
    return data.id === goalID;
  });
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleAddMoneyPush = (value) => setAddMoney(value);

  const handleSubmitAddMoney = (e) => {
    e.preventDefault();
    handleCloseModal();
    currentGoal[0].currentAmount += Number(addMoney);
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
              <div>
                <h2>{currentGoal[0].bills}</h2>
                <p>{currentGoal[0].priority}</p>
              </div>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "50vh",
                }}
              >
                <p>${currentGoal[0].currentAmount}</p>
                <div>
                  <p>{currentGoal[0].totalAmount}</p>
                  <p>{currentGoal[0].deadline}</p>
                </div>
                <div>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={handleOpenModal}
                  >
                    <AddIcon />
                  </Fab>
                  <p>Add Money</p>
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
                        onChange={(e) => setAddMoney(e.target.value)}
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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
