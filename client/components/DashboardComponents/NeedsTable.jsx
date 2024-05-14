
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LinearProgressWithLabel from "./Utils";
import { PiPencilSimpleThin } from "react-icons/pi";
import { BiTransfer } from "react-icons/bi";

const NeedsTable = ({ goalData }) => {
    return (
        <div>
            <Button>
                <AddBoxOutlinedIcon />
                Add New Goal
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Bills</TableCell>
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
                                key={row.bills}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/goal/${row.bills}`}>{row.bills}</Link>
                                    <LinearProgressWithLabel variant="determinate" value={(row.amountPaid / row.totalAmount) * 100} />
                                </TableCell>
                                <TableCell align="right">{row.deadline}</TableCell>
                                <TableCell align="right">{row.priority}</TableCell>
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

export default NeedsTable;