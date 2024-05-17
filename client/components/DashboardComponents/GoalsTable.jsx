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
                  {row.bills}
                  <LinearProgressWithLabel
                    variant="determinate"
                    value={(row.amountPaid / row.totalAmount) * 100}
                  />
                </TableCell>
                <TableCell align="right">{row.deadline}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.priority}
                    style={{
                      ...getPriorityCellStyle(row.priority),
                      ...chipStyle,
                    }}
                  />
                </TableCell>
                <TableCell align="right">${row.totalAmount}</TableCell>
                <TableCell align="right">
                  <Stack direction={"row"} spacing={1}>
                    <span>{row.badges[0].icon}</span>
                    <span>{row.badges[1].icon}</span>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Stack direction={"row"}>
                    <Link to={`/goal/${row.id}`}>
                      <IconButton style={buttonStyle}>
                        <PiPencilSimpleThin />
                      </IconButton>
                    </Link>
                    <IconButton style={buttonStyle}>
                      <BiTransfer />
                    </IconButton>
                  </Stack>
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
