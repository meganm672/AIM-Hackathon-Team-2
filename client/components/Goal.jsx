import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Goal({ goalData }) {
  let [open, setOpen] = useState(false);
  let { goalID } = useParams();
  let currentGoal = goalData.filter((data) => {
    return data.id === goalID;
  });
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

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
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography>
                  </Box>
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
