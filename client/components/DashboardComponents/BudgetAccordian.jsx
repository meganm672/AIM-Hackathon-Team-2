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

const BudgetAccordian = ({ goalData, selectedCategories, handleAddGoal }) => {
  const [openCreateModal, setOpenCreateModel] = useState(false);

  const [addGoalToCategory, setAddGoalToCategory] = useState("");
  // Create Goal states
  const [goalName, setGoalName] = useState("");
  const [deadline, setDeadline] = useState(dayjs());
  const [totalAmount, setTotalAmount] = useState();
  const [priority, setPriority] = useState("");
  //reminder buttons
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const submitGoal = (category) => {
    console.log(category);
    const data = {
      bills: goalName,
      deadline: deadline.format("MMMM DD, YYYY"),
      totalAmount,
      priority: priority[0],
      id: Math.floor(Math.random() * 1000),
      amountPaid: 0,
      badges: "new account badge",
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
              sx={{ flexDirection: "row-reverse", backgroundColor: "#F2F8FD" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left" sx={{ width: "50%" }} >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              {accordionOpen[category] && (
                <Button
                  sx={{ color: "#1F648E" }}
                  onClick={() => {
                    setAddGoalToCategory(category);
                    handleOpenCreateGoalModal();
                  }}
                >
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right" sx={{ width: "70%" }}>
                ${calculateTotalSaved(category)}
              </Typography>
              <BsThreeDotsVertical />
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
              <DialogTitle>Create Goal</DialogTitle>
              <Divider />
              <DialogContent>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                  <FormLabel>Goal Name</FormLabel>
                  <TextField
                    id="gaol-name"
                    variant="outlined"
                    value={goalName}
                    placeholder="Enter goal name..."
                    onChange={(e) => setGoalName(e.target.value)}
                    required
                  />
                  <FormLabel>Amount</FormLabel>
                  <TextField
                    id="filled-basic"
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
                  {/* <InputLabe÷l id="set-goal-priority">Set Priority</InputLabe÷l> */}

                  <Stack direction="row">
                    <Stack>

                      <FormLabel>Due date</FormLabel>
                      <DatePicker
                        value={deadline}
                        onChange={(newValue) => {
                          setDeadline(newValue);
                        }}
                        sx={{ width: "70%" }}
                      />
                    </Stack>
                    <Stack>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        value={priority}
                        label="Set Priority"
                        labelId="set-goal-priority"
                        onChange={handlePriorityChange}
                        renderValue={(selected) => selected.join(", ")}
                        sx={{ minWidth: 120, m: 1, width: "70%" }}
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
                          },
                          '& .MuiButton-label': {
                            textTransform: 'capitalize',
                            fontSize: '14px',
                          }
                        }}
                      >
                        <ToggleButton value="weekly"
                        >
                          Weekly
                        </ToggleButton>
                        <ToggleButton value="monthly"
                        >
                          Monthly
                        </ToggleButton>
                        <ToggleButton value="yearly"
                        >
                          Yearly
                        </ToggleButton>
                        <ToggleButton value="custom"
                        >
                          Custom
                        </ToggleButton>
                      </ToggleButtonGroup>
                        <FormLabel>Every</FormLabel>
                        <Select>
                          <MenuItem value="Week">Week</MenuItem>
                          <MenuItem value="Month">Month</MenuItem>
                          <MenuItem value="Year">Year</MenuItem>
                        </Select>
                    </Stack>
                  </Box>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCreateGoalModal}
                sx={{
                  backgroundColor: "#F1F3F4", // Gray color
  color: "#706F6F",
                }}
                >Cancel</Button>
                <Button
                  onClick={() => {
                    submitGoal(addGoalToCategory);
                  }}
                  sx={{
                    backgroundColor: "#1C7488",
                    color: "#FFFFFF"
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
