import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Modal, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import BudgetAccordian from "./BudgetAccordian";
import Button from "@mui/material/Button";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
const DashboardTabs = ({
  goalData,
  handleAddGoal,
  handleCreateCategory,
  listGoals,
}) => {
  const [open, setOpen] = useState(false);
  const [openAddMoney, setOpenAddMoney] = useState(false);
  const [amountAdd, setAmountAdd] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]); // Default to displaying bills table
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleClickOpenAddMoney = () => {
    setOpenAddMoney(true);
  };

  const handleCloseAddMoney = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenAddMoney(false);
    }
  };
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

  const submitNewCategory = (e) => {
    e.preventDefault();
    if (!categoryName) return;
    handleCreateCategory(categoryName);
    handleClose();
  };

  const calculateTotalSaved = (category) => {
    if (!goalData[category]) return 0;
    return goalData[category].reduce((total, goal) => {
      return total + goal.amountPaid;
    }, 0);
  };

  const calculateTotalBalance = () => {
    let totalBalance = 0;
    selectedCategories.forEach((category) => {
      totalBalance += calculateTotalSaved(category);
    });
    return totalBalance;
  };

  return (
    <>
      <Tabs defaultValue={0}>
        <TabList underlinePlacement={"left"}>
          <Tab>Goals</Tab>
          <Tab>Challenges</Tab>
        </TabList>
        <TabPanel value={0}>
          <Box sx={{ height: "100vh" }}>
            <Paper elevation={2}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Typography>Catagories</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  label={
                    <>
                      <IoIosSearch />
                      Search goal
                    </>
                  }
                  type="search"
                  variant="filled"
                />
                <Button>
                  <IoFilterOutline />
                </Button>
                <Button onClick={handleClickOpenAddMoney}>
                  <PaidRoundedIcon />
                </Button>
                <Button
                  variant="contained"
                  sx={{ color: "#FFFFFF", backgroundColor: "#1F648E" }}
                  onClick={handleClickOpen}
                >
                  + Add New Category
                </Button>
              </div>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Category Name</DialogTitle>
                <DialogContent>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <TextField
                      id="gaol-name"
                      variant="outlined"
                      value={categoryName}
                      placeholder="Enter category name..."
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={submitNewCategory}>Create Category</Button>
                </DialogActions>
              </Dialog>
              <Modal
                disableEscapeKeyDown
                open={openAddMoney}
                onClose={handleCloseAddMoney}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <form>
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
                      value={amountAdd}
                      onChange={(e) => {
                        let num = Number(e.target.value);
                        if (isNaN(num)) {
                          return setAmountAdd(0);
                        }
                        return setAmountAdd(num);
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

              <Divider />
              <Typography>
                Total Amount Saved: ${calculateTotalBalance()}
              </Typography>
              <BudgetAccordian
                goalData={goalData}
                selectedCategories={selectedCategories}
                handleAddGoal={handleAddGoal}
              />
            </Paper>
          </Box>
        </TabPanel>
        <TabPanel value={1}>
          <b>Second</b> tab panel
        </TabPanel>
      </Tabs>
    </>
  );
};
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
export default DashboardTabs;
