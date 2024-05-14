import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DatePicker } from "@mui/x-date-pickers";
import BudgetAccordian from "./BudgetAccordian";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
const DashboardTabs = ({ goalData, handleAddGoal }) => {
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModel] = useState(false);
  // Create Gaol states
  const [goalName, setGoalName] = useState("");
  const [deadline, setDeadline] = useState(dayjs("2022-04-17"));
  const [totalAmount, setTotalAmount] = useState(0);
  const [priority, setPriority] = useState("");

  const submitGoal = () => {
    const data = {
      bills: goalName,
      deadline,
      totalAmount,
      priority,
      id: Math.floor(Math.random() * 1000),
      amountPaid: 0,
      badges: "new account badge",
    };
    handleAddGoal(data);
    handleCloseCreateGoalModal();
  };
  //

  const [selectedCategories, setSelectedCategories] = useState([]); // Default to displaying bills table
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleOpenCreateGoalModal = () => {
    setOpenCreateModel(true);
  };

  const handleCloseCreateGoalModal = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenCreateModel(false);
    }
  };
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(Array.isArray(value) ? value : [value]);
  };
  const handlePriorityChange = (event) => {
    const { value } = event.target;
    setPriority(Array.isArray(value) ? value : [value]);
  };

  const calculateTotalSaved = (category) => {
    console.log(category, goalData[category]);
    if (!goalData.category) return 0;
    return goalData[category].reduce((total, goal) => {
      if (selectedCategories.includes(category)) {
        return total + goal.amountPaid;
      }
      return total;
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
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "2em" }}
                  onClick={handleClickOpen}
                >
                  Add Category
                </Button>
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
                <Button
                  variant="contained"
                  sx={{ color: "#FFFFFF", backgroundColor: "#1F648E" }}
                  onClick={handleClickOpen}
                >
                  + Add New Category
                </Button>
              </div>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select A Category</DialogTitle>
                <DialogContent>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                      sx={{ minWidth: 120, m: 1 }}
                    >
                      <MenuItem value="Bills">Bills</MenuItem>
                      <MenuItem value="Debt">Debt</MenuItem>
                      <MenuItem value="Needs">Needs</MenuItem>
                      <MenuItem value="Subscriptions">Subscriptions</MenuItem>
                      <MenuItem value="Wants">Wants</MenuItem>
                      <MenuItem value="Vacation">Vacations</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
              </Dialog>
              <Dialog
                disableEscapeKeyDown
                open={openCreateModal}
                onClose={handleCloseCreateGoalModal}
              >
                <DialogTitle>Create Goal</DialogTitle>
                <DialogContent>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      value={priority}
                      placeholder="Status"
                      onChange={handlePriorityChange}
                      renderValue={(selected) => selected.join(", ")}
                      sx={{ minWidth: 120, m: 1 }}
                    >
                      <MenuItem value="Critical">Critical</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                    <TextField
                      id="gaol-name"
                      variant="outlined"
                      value={goalName}
                      placeholder="Goal name"
                      onChange={(e) => setGoalName(e.target.value)}
                    />
                    <DatePicker
                      value={deadline}
                      onChange={(newValue) => {
                        let newDate = dayjs(newValue.toDate()).format(
                          "YYYY-MM-DD"
                        );

                        setDeadline(newDate);
                      }}
                    />
                    <TextField
                      id="filled-basic"
                      placeholder="Amount"
                      variant="outlined"
                      value={totalAmount}
                      onChange={(e) => {
                        let num = Number(e.target.value);

                        if (isNaN(num)) {
                          return setTotalAmount(0);
                        }
                        return setTotalAmount(num);
                      }}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreateGoalModal}>Cancel</Button>
                  <Button onClick={submitGoal}>Ok</Button>
                </DialogActions>
              </Dialog>
              <Divider />
              <Typography>
                Total Amount Saved: ${calculateTotalBalance()}
              </Typography>
              <BudgetAccordian
                goalData={goalData}
                selectedCategories={selectedCategories}
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

export default DashboardTabs;
