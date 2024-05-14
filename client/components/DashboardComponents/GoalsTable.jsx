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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const GoalsTable = ({ goalData, category }) => {
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the first letter

  // State to store the selected priority for each goal
  const [selectedPriorities, setSelectedPriorities] = useState({});

  // Function to handle priority change
  const handlePriorityChange = (event, goalId) => {
    setSelectedPriorities({
      ...selectedPriorities,
      [goalId]: event.target.value, // Update the priority for the goal
    });
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
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Badges</TableCell>
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
                  <Link to={`/goal/${row.id}`}>{row.bills}</Link>
                  <LinearProgressWithLabel
                    variant="determinate"
                    value={(row.amountPaid / row.totalAmount) * 100}
                  />
                </TableCell>
                <TableCell align="right">{row.deadline}</TableCell>
                <TableCell align="right">
                  <Select
                    value={selectedPriorities[row.id] || row.priority} // Set the value to the priority of the current goal
                    label="Priority"
                    onChange={(event) => handlePriorityChange(event, row.id)} // Handle priority change
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">${row.totalAmount}</TableCell>
                <TableCell align="right">{row.badges}</TableCell>
                <TableCell align="right">
                  <Button>
                    <PiPencilSimpleThin />
                  </Button>
                  <Button>
                    <BiTransfer />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GoalsTable;
