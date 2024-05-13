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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
const DashboardTabs = ({ goalData, handleAddGoal }) => {
  const [open, setOpen] = React.useState(false);
  const [openCreateModal, setOpenCreateModel] = React.useState(false);
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
    setOpen(true);
  };

  const handleCloseCreateGoalModal = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(Array.isArray(value) ? value : [value]);
  };

  const calculateTotalSaved = (category) => {
    return goalData.reduce((total, goal) => {
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
          <Box sx={{ height: "65vh" }}>
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
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "2em" }}
                  onClick={handleCloseCreateGoalModal}
                >
                  Add Category
                </Button>
              </div>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select A Category or All Categoires</DialogTitle>
                <DialogContent>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                      sx={{ minWidth: 120, m: 1 }}
                    >
                      <MenuItem value="bills">Bills</MenuItem>
                      <MenuItem value="needs">Needs</MenuItem>
                      <MenuItem value="wants">Wants</MenuItem>
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
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                      sx={{ minWidth: 120, m: 1 }}
                    >
                      <MenuItem value="bills">Bills</MenuItem>
                      <MenuItem value="needs">Needs</MenuItem>
                      <MenuItem value="wants">Wants</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Ok</Button>
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
