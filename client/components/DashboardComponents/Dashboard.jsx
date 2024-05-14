import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { mainListItems } from "./ListItems";
import Home from "../Home";
import Goal from "../Goal";
import SaveUpLogo from "./SaveUpLogo";
import  Stack from "@mui/material/Stack";
import Avatar from '@mui/material/Avatar';
import { VscBellDot } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


export default function Dashboard() {

  function createData(
    bills,
    totalAmount,
    deadline,
    priority,
    badges,
    id,
    amountPaid
  ) {
    return {
      bills,
      totalAmount,
      deadline,
      priority,
      badges,
      id,
      amountPaid,
    };
  }
  //dummy data for now we will have to map the rows to the file once we have the forms created
  const mockData = [
    createData(
      "Rent",
      1250.0,
      "November 03,2024",
      "Critical",
      "new account badge",
      "1",
      250.0
    ),
    createData(
      "Utilites",
      500.0,
      "September 13,2024",
      "High",
      "new account badge",
      "2",
      100.0
    ),
    createData(
      "Car Insurance",
      300.0,
      "December 03,2024",
      "Low",
      "new account badge",
      "3",
      75.0
    ),
    createData(
      "Student Loans",
      650.0,
      "July 03,2024",
      "Critical",
      "new account badge",
      "4",
      460.0
    ),
  ];

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Box sx={{alignContent: "left", width: "100%"}}>
            <SaveUpLogo />
            </Box>
            <Box sx={{fontSize: "1.5em", paddingRight: 1}}>
            <VscBellDot />
            </Box>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
          <List sx={{marginTop: "auto"}}>
          <Divider />
          <Stack direction="row" sx={{justifyContent: "space-around", alignItems:"center"}}>
            <Avatar>JS</Avatar>
            <Typography>Jane Smith</Typography>
            <IoIosArrowDown />
          </Stack>
          </List>
        </Drawer>
        <Routes>
          <Route path="/" element={<Home goalData={mockData} />} />

          {/* <Route path="/goal/:goalID" element={<Goal goalData={mockData} />} /> */}
          <Route path="/goal/:goalID" element={<Goal goalData={mockData} />} />
        </Routes>
      </Box>
    </Router>
  );
}
