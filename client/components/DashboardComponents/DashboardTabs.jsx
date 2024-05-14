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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";

const DashboardTabs = ({ goalData }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = useState(["bills"]); // Default to displaying bills table
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(Array.isArray(value) ? value : [value]);
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
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>

                <TextField
                  label={
                  <>
                  <IoIosSearch />
                  Search goal
                  </>}
                  type="search"
                  variant="filled"
                />
                <Button>
                    <IoFilterOutline />
                </Button>
                <Button variant="contained" sx={{ color: "#FFFFFF", backgroundColor: "#1F648E" }} onClick={handleClickOpen}>
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
                      <MenuItem value="bills">Bills</MenuItem>
                      <MenuItem value="debt">Debt</MenuItem>
                      <MenuItem value="needs">Needs</MenuItem>
                      <MenuItem value="subscriptions">Subscriptions</MenuItem>
                      <MenuItem value="wants">Wants</MenuItem>
                      <MenuItem value="vacation">Vacations</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
              </Dialog>
              <Divider />
              {/* <Typography>Total Amount Saved: ${calculateTotalBalance()}</Typography> */}
              <BudgetAccordian goalData={goalData} selectedCategories={selectedCategories} />
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
