import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconButton,
  Divider,
  FormLabel,
  Select,
  MenuItem,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

const TransferForm = ({
  open,
  handleClose,
  goal,
  listGoals,
  handleTransferMoney,
}) => {
  if (!goal) return null;
  const [deadline, setDeadline] = useState(dayjs(goal.deadline));
  const [priority, setPriority] = useState("");
  const [selectedGoalPrimary, setSelectedGoalPrimary] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [selectedTransferTo, setSelectedTransferTo] = useState("");
  const handleReminderIntervalChange = (event) => {
    setReminderInterval(event.target.value);
  };

  const handlePriorityChange = (event) => {
    const { value } = event.target;
    setPriority(Array.isArray(value) ? value : [value]);
  };
  const handleChangePrimary = (event) => {
    setSelectedGoalPrimary(event.target.value);
  };
  const handleChangeSecondary = (event) => {
    setSelectedTransferTo(event.target.value);
  };

  const submitTransfer = () => {
    handleTransferMoney(
      selectedGoalPrimary,
      selectedTransferTo,
      transferAmount,
      priority,
      deadline
    );
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle>Transfer</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <DialogContent>
          <FormLabel>From</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedGoalPrimary}
            label="Select-Goal"
            onChange={handleChangePrimary}
            sx={{ width: "100%" }}
          >
            {listGoals &&
              typeof listGoals === "function" &&
              listGoals().map((goal) => {
                return (
                  <MenuItem key={goal.id} value={goal.id}>
                    {goal.bills}
                  </MenuItem>
                );
              })}
          </Select>
          <FormLabel>To</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTransferTo}
            label="Select-Goal"
            onChange={handleChangeSecondary}
            sx={{ width: "100%" }}
          >
            {listGoals &&
              typeof listGoals === "function" &&
              listGoals().map((goal) => {
                return (
                  <MenuItem key={goal.id} value={goal.id}>
                    {goal.bills}
                  </MenuItem>
                );
              })}
          </Select>
          <Typography id="modal-modal-title">Amount</Typography>
          <TextField
            id="filled-basic"
            placeholder="$0.00"
            variant="outlined"
            value={transferAmount}
            onChange={(e) => {
              let num = Number(e.target.value);
              if (isNaN(num)) {
                return setTransferAmount(0);
              }
              return setTransferAmount(num);
            }}
            sx={{ width: "100%" }}
          />
          <Stack direction="row" sx={{ width: "100%" }}>
            <Stack sx={{ width: "50%", p: 0.5 }}>
              <FormLabel>Due date</FormLabel>
              <DatePicker
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue);
                }}
              />
            </Stack>
            <Stack sx={{ width: "50%", p: 0.5 }}>
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
          <Box></Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "#F1F3F4", // Gray color
              color: "#706F6F",
              textTransform: "capitalize",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitTransfer();
            }}
            sx={{
              backgroundColor: "#1C7488",
              color: "#FFFFFF",
              textTransform: "capitalize",
            }}
          >
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransferForm;
