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
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { VscBellDot } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import BudgetBossBadge from "../Badges/BudgetBossBadge";
import ChallengeAcceptedBadge from "../Badges/ChallengeAcceptedBadge";
import ChallengeChampionBadge from "../Badges/ChallengeChampionBadge";
import ChallengeConqurereBadge from "../Badges/ChallengeConqurereBadge";
import DebtSlayerBadge from "../Badges/DebtSlayerBadge";
import GoalGrubberBadge from "../Badges/GoalGrubberBadge";
import LongGamePlayerBadge from "../Badges/LongGamePlayerBadge";
import OverachieverBadge from "../Badges/OverachieverBadge";
import ScroogeMcSavingsBadge from "../Badges/ScroogeMcSavingsBadge";
import SteadySaverBadge from "../Badges/SteadySaverBadge";
import StreakStarterBadge from "../Badges/StreakStarterBadge";
import axios from 'axios';
import { useState, useEffect } from 'react';


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
      priority: priority.toLowerCase(),
      badges,
      id,
      amountPaid,
    };
  }

  const [categories, setCategories] = useState([]);
  const [mockData, setMockData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

        const goalsData = await axios.get('https://aim-hackathon-team-2.onrender.com/api/goals/');  // Replace with your actual endpoint URL
        const goals = goalsData.data;

        const updatedMockData = {};
        fetchedCategories.forEach(category => {
          updatedMockData[category.category_name] = [];
        });

        goals.forEach(goal => {
          const categoryName = fetchedCategories.find(cat => cat.id === goal.category)?.category_name;
          const { goal_name, total_amount, completed_amount, deadline, priority } = goal; // Destructuring for cleaner code
          // Assuming "bills" is the field you want to represent in createData (adapt based on your needs)
          const bills = goal_name; // Replace with the appropriate field from your API response
          const goal_data = createData(bills, total_amount, deadline, priority.toLowerCase(), [], goal.id, completed_amount);
          if (categoryName) {
            updatedMockData[categoryName].push(goal_data);
          } else {
            console.warn(`Goal with ID ${goal.id} has an invalid category ID.`);
          }
        });

        setMockData(updatedMockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);




  async function fetchCategories() {
    try {
      const response = await axios.get('https://aim-hackathon-team-2.onrender.com/api/categories/');  // Replace with your actual endpoint URL
      const categoriesData = response.data;
      return categoriesData; // Assuming 'name' is the field for category name
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  const listGoals = () => {
    let allGoals = [];
    for (const [key, value] of Object.entries(mockData)) {
      allGoals.push(value);
    }
    return allGoals.flat(1);
  };

  const handleAddGoal = (category, data) => {
    let { bills, totalAmount, deadline, priority, badges, id, amountPaid } =
      data;
    mockData[category].push(
      createData(bills, totalAmount, deadline, priority, badges, id, amountPaid)
    );
  };
  const handleCreateCategory = (category) => {
    mockData[category] = [];
    return;
  };

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
            <Box sx={{ alignContent: "left", width: "100%" }}>
              <SaveUpLogo />
            </Box>
            <Box sx={{ fontSize: "1.5em", paddingRight: 1 }}>
              <VscBellDot />
            </Box>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
          <List sx={{ marginTop: "auto" }}>
            <Divider />
            <Stack
              direction="row"
              sx={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <Avatar>JS</Avatar>
              <Typography>Jane Smith</Typography>
              <IoIosArrowDown />
            </Stack>
          </List>
        </Drawer>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                goalData={mockData}
                handleAddGoal={handleAddGoal}
                handleCreateCategory={handleCreateCategory}
                listGoals={listGoals}
              />
            }
          />

          {/* <Route path="/goal/:goalID" element={<Goal goalData={mockData} />} /> */}
          <Route path="/goal/:goalID" element={<Goal goalData={mockData} />} />
        </Routes>
      </Box>
    </Router>
  );
}
