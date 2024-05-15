import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import BudgetAccordian from "./BudgetAccordian";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
const DashboardTabs = ({ goalData, handleAddGoal, handleCreateCategory }) => {
  const [open, setOpen] = useState(false);

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

export default DashboardTabs;
