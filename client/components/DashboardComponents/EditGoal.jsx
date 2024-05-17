import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Divider, FormLabel, Select, MenuItem, Stack, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import LinearProgressWithLabel from './Utils';
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import { GoTrash } from "react-icons/go";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const EditGoal = ({ open, handleClose, goal }) => {
    if (!goal) return null;

    const [deadline, setDeadline] = useState(dayjs());
    const [priority, setPriority] = useState("");
    const [reminderInterval, setReminderInterval] = useState("Week");

    const handleReminderIntervalChange = (event) => {
        setReminderInterval(event.target.value);
    };

    const handlePriorityChange = (event) => {
        const { value } = event.target;
        setPriority(Array.isArray(value) ? value : [value]);
    };

    //reminder buttons
    const [alignment, setAlignment] = useState("left");

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const calculateProgress = () => {
        if (!goal.totalAmount || goal.totalAmount === 0) return 0;
        return (goal.amountPaid / goal.totalAmount) * 100;
    };



    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Stack direction="row" sx={{ justifyContent: "space-between" }} >

                    <DialogTitle>{goal.bills}</DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Divider />
                <DialogContent>

                    <LinearProgressWithLabel
                        value={calculateProgress()}
                    />
                     <Stack>
                    <Stack direction="row">

                    <Stack direction="row">
                        <Stack sx={{ width: "50%", p: .5 }}>

                            <FormLabel>Due date</FormLabel>
                            <DatePicker
                                value={deadline}
                                onChange={(newValue) => {
                                    setDeadline(newValue);
                                }}
                            />
                        </Stack>
                        <Stack sx={{ width: "50%", m: .5 }}>
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

                    </Stack>
                       
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
                                    // width: "100%"
                                }}
                            >
                                <ToggleButton value="weekly"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Weekly
                                </ToggleButton>
                                <ToggleButton value="monthly"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Monthly
                                </ToggleButton>
                                <ToggleButton value="yearly"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Yearly
                                </ToggleButton>
                                <ToggleButton value="custom"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Custom
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <FormLabel>Every</FormLabel>
                            <Select
                                value={reminderInterval}
                                onChange={handleReminderIntervalChange}
                                sx={{width: "100%"}}
                            >
                                <MenuItem value="Week">Week</MenuItem>
                                <MenuItem value="Month">Month</MenuItem>
                                <MenuItem value="Year">Year</MenuItem>
                                <MenuItem value="Custom">Custom</MenuItem>
                            </Select>
                        </Stack>
                                {/* <Card sx={{ margin:2, minWidth: 250, maxWidth:250, minHeight:250, backgroundColor:"#F2F8FD"  }}>
                                        <CardContent>
                                            You dont have any badges yet
                                        </CardContent>
                                </Card> */}
                    <Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                        <IconButton size="small" sx={{marginRight: 18, backgroundColor:"#1C7488", borderRadius:" 4px"}}>
                <GoTrash />
            </IconButton>
                    <Button
                        onClick={handleClose}
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
                        Edit Goal
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditGoal;