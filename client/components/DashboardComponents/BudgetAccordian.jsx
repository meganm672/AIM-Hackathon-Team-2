import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import InputLabel from "@mui/material/InputLabel";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import GoalsTable from "./GoalsTable";
import { Typography, Button, Box, FormLabel, Stack } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

const BudgetAccordian = ({ goalData, selectedCategories, handleAddGoal }) => {
  const [openCreateModal, setOpenCreateModel] = useState(false);

  const [addGoalToCategory, setAddGoalToCategory] = useState("");
  // Create Goal states
  const [goalName, setGoalName] = useState("");
  const [deadline, setDeadline] = useState(dayjs());
  const [totalAmount, setTotalAmount] = useState();
  const [priority, setPriority] = useState("");
  //reminder buttons
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const submitGoal = (category) => {
    const data = {
      bills: goalName,
      deadline: deadline.format("MMMM DD, YYYY"),
      totalAmount,
      priority: priority[0],
      id: Math.floor(Math.random() * 1000),
      amountPaid: 0,
      badges: [],
    };

    handleAddGoal(category, data);
    handleCloseCreateGoalModal();
  };
  //
  const handleOpenCreateGoalModal = () => {
    setOpenCreateModel(true);
  };

  const handleCloseCreateGoalModal = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenCreateModel(false);
      setDeadline(dayjs());
      setGoalName("");
      setTotalAmount();
      setPriority("");
    }
  };
  const handlePriorityChange = (event) => {
    const { value } = event.target;
    setPriority(Array.isArray(value) ? value : [value]);
  };

  // Initialize accordionOpen state with all categories closed
  const initialAccordionState = selectedCategories.reduce((acc, category) => {
    acc[category] = false;
    return acc;
  }, {});
  // Determine if the accordion should be controlled or uncontrolled based on initial state
  const isControlledAccordion = Object.values(initialAccordionState).some(
    (value) => value !== undefined
  );

  const [accordionOpen, setAccordionOpen] = useState(initialAccordionState);

  const [reminderInterval, setReminderInterval] = useState("Week");

  const handleReminderIntervalChange = (event) => {
    setReminderInterval(event.target.value);
  };


  const calculateTotalSaved = (category) => {
    return goalData[category].reduce((total, goal) => {
      return total + goal.amountPaid;
    }, 0);
  };
  const handleAccordionChange = (category) => {
    setAccordionOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };
  return (
    <div>
      {Object.keys(goalData).map((category) => (
        <div key={category}>
          <Accordion
            key={category}
            expanded={
              isControlledAccordion ? accordionOpen[category] : undefined
            }
            onChange={() => handleAccordionChange(category)}
            sx={{ margin: 2 }}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse", backgroundColor: "#F2F8FD", alignItems: "center" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left" sx={{marginTop:.6, marginRight: 2}}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              {accordionOpen[category] ? (
                <>
                  <Button
                    sx={{ color: "#1F648E", marginRight: "auto"}}
                    onClick={() => {
                      setAddGoalToCategory(category);
                      handleOpenCreateGoalModal();
                    }}
                  >
                    <FaCirclePlus />
                    Add Goals
                  </Button>

                  <Typography align="right">
                    ${calculateTotalSaved(category)}
                  </Typography>
                  <BsThreeDotsVertical />
                </>
              ) : (
                <>
                  <Typography sx={{ marginLeft: "auto" }}>
                    ${calculateTotalSaved(category)}
                  </Typography>
                  <BsThreeDotsVertical />
                </>
              )}
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#F2F8FD" }}>
              {/* <CategoryTable goalData={goalData[category]} /> */}
              <GoalsTable goalData={goalData[category]} category={category} />
            </AccordionDetails>
          </Accordion>
          {/* add goal form */}
          <Box sx={{ width: "60%" }}>
            <Dialog
              disableEscapeKeyDown
              open={openCreateModal}
              onClose={handleCloseCreateGoalModal}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>

                <DialogTitle>Create Goal</DialogTitle>
                <IconButton onClick={handleCloseCreateGoalModal}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Divider />
              <DialogContent>
                <Box sx={{ m: 1, minWidth: 100 }}>
                  <Stack direction="column">

                    <FormLabel>Goal Name</FormLabel>
                    <TextField
                      id="goal-name"
                      variant="outlined"
                      value={goalName}
                      placeholder="Enter goal name..."
                      onChange={(e) => setGoalName(e.target.value)}
                      required
                    />
                    <FormLabel>Amount</FormLabel>
                    <TextField
                      id="amount"
                      placeholder="$0.00"
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
                  </Stack>
                  <Stack direction="row">

                    <Stack sx={{ width: "50%", m: 1 }}>

                      <FormLabel>Due date</FormLabel>
                      <DatePicker
                        value={deadline}
                        onChange={(newValue) => {
                          setDeadline(newValue);
                        }}
                      />
                    </Stack>
                    <Stack sx={{ width: "50%", m: 1 }}>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        value={priority}
                        id="Set-priority"
                        label="Set Priority"
                        labelId="set-goal-priority"
                        onChange={handlePriorityChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        <MenuItem value="Critical">Critical</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </Stack>
                  </Stack>
                  <Box>
                    <Stack>
                      <FormLabel>Set a reminder</FormLabel>
                      <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        sx={{
                          '& .Mui-selected': {
                            backgroundColor: '#1C7488',
                            color: '#FFFFFF',
                          }
                        }}
                      >
                        <ToggleButton value="weekly"
                        sx={{textTransform: "capitalize"}}
                        >
                          Weekly
                        </ToggleButton>
                        <ToggleButton value="monthly"
                         sx={{textTransform: "capitalize"}}
                        >
                          Monthly
                        </ToggleButton>
                        <ToggleButton value="yearly"
                         sx={{textTransform: "capitalize"}}
                        >
                          Yearly
                        </ToggleButton>
                        <ToggleButton value="custom"
                         sx={{textTransform: "capitalize"}}
                        >
                          Custom
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <FormLabel>Every</FormLabel>
                      <Select
                        value={reminderInterval}
                        onChange={handleReminderIntervalChange}
                      >
                        <MenuItem value="Week">Week</MenuItem>
                        <MenuItem value="Month">Month</MenuItem>
                        <MenuItem value="Year">Year</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                      </Select>
                    </Stack>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseCreateGoalModal}
                  sx={{
                    backgroundColor: "#F1F3F4", // Gray color
                    color: "#706F6F",
                    textTransform: "capitalize"
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    submitGoal(addGoalToCategory);
                  }}
                  sx={{
                    backgroundColor: "#1C7488",
                    color: "#FFFFFF",
                    textTransform: "capitalize"
                  }}
                >
                  Create Task
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default BudgetAccordian;
