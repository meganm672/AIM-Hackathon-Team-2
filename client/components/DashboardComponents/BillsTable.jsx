import React from "react";
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
const BillsTable = ({ goalData }) => {
  //     function createData(bills, totalAmount, deadline, priority, badges) {
  //         return { bills, totalAmount, deadline, priority, badges };
  //       }
  // //dummy data for now we will have to map the rows to the file once we have the forms created
  //       const rows = [
  //         createData('Rent', "$1250.00", "November 03,2024", "Critical", "new account badge"),
  //         createData('Utilites', "$500.00", "September 13,2024", "High", "new account badge"),
  //         createData('Car Insurance', "$300.00", "December 03,2024", "Low", "new account badge"),
  //         createData('Student Loans', "$650.00", "July 03,2024", "Critical", "new account badge"),
  //       ];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Bills</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Deadline</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Badges</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goalData.map((row) => (
              <TableRow
                key={row.bills}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Link to={`/goal/${row.bills}`}>
                  <TableCell component="th" scope="row">
                    {row.bills}
                  </TableCell>
                  <TableCell align="right">{row.totalAmount}</TableCell>
                  <TableCell align="right">{row.deadline}</TableCell>
                  <TableCell align="right">{row.priority}</TableCell>
                  <TableCell align="right">{row.badges}</TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button>
        <AddBoxOutlinedIcon />
        Add New Goal
      </Button>
    </div>
  );
};

export default BillsTable;