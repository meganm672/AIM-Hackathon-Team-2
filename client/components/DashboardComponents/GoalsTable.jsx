import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LinearProgressWithLabel from "./Utils";
import { PiPencilSimpleThin } from "react-icons/pi";
import { BiTransfer } from "react-icons/bi";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditGoal from "./EditGoal";
import TransferForm from "./TransferForm";
const priorityColorMap = {
  low: { backgroundColor: "#E4FDEB", color: "#48C76A" }, // Green
  medium: { backgroundColor: "#FFF3B4", color: "#E7B147" }, // Yellow
  high: { backgroundColor: "#F9E7D9", color: "#E78A47" }, // Orange
  critical: { backgroundColor: "#FFEBEB", color: "#EB5757" }, // Red
};

const chipStyle = {
  borderRadius: "4px",
};

const buttonStyle = {
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  backgroundColor: "#F1F3F4",
  color: "#706F6F",
  fontSize: 15,
};

const GoalsTable = ({ goalData, category }) => {
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1); 
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);

  const handleEditClick = (goal) => {
    setCurrentGoal(goal);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentGoal(null);
  };

  const handleTransferClick = (goal) => {
    setCurrentGoal(goal);
    setTransferDialogOpen(true);
  };

  const handleTransferDialogClose = () => {
    setTransferDialogOpen(false);
    setCurrentGoal(null);
  };


  const getPriorityCellStyle = (priority) => {
    const { backgroundColor, color } = priorityColorMap[priority] || {};
    return {
      backgroundColor: backgroundColor || "inherit",
      color: color || "inherit",
      textTransform: "capitalize",
    };
  };


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox defaultChecked />
              </TableCell>
              <TableCell>{capitalizedCategory}</TableCell>
              <TableCell >Due Date</TableCell>
              <TableCell >Priority</TableCell>
              <TableCell >Total Amount</TableCell>
              <TableCell >Badges</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goalData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.bills}
                  <LinearProgressWithLabel
                    variant="determinate"
                    value={(row.amountPaid / row.totalAmount) * 100}
                  />
                </TableCell>
                <TableCell >{row.deadline}</TableCell>
                <TableCell >
                  <Chip
                    label={row.priority}
                    style={{
                      ...getPriorityCellStyle(row.priority),
                      ...chipStyle,
                    }}
                  />
                </TableCell>
                <TableCell >${row.totalAmount}</TableCell>
                <TableCell>
                  <Stack direction={"row"} spacing={1}>
                    <span>{row.badges[0].icon}</span>
                    <span>{row.badges[1].icon}</span>
                  </Stack>
                </TableCell>
                <TableCell align="right">

                  <Stack direction={"row"} spacing={1}>
                    <IconButton style={buttonStyle} onClick={() => handleEditClick(row)}>
                      <PiPencilSimpleThin />
                    </IconButton>
                    <IconButton style={buttonStyle} onClick={() => handleTransferClick(row) }>
                      <BiTransfer />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditGoal
        open={editDialogOpen}
        handleClose={handleEditDialogClose}
        goal={currentGoal}
      />
      <TransferForm 
      open={transferDialogOpen}
      handleClose={handleTransferDialogClose}
      goal={currentGoal}
      />
    </div>
  );
};

export default GoalsTable;
