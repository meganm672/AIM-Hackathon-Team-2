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

  async function fetchGoals() {
    try {
      const response = await axios.get('https://aim-hackathon-team-2.onrender.com/api/goals/'); // Replace with your actual endpoint URL
      const goalsData = response.data;
      // Filter goals with category "needs"
      const needsGoals = goalsData.filter(goal => goal.category === 'needs');
      // Now you have the filtered needsGoals data, ready for mapping
      const mappedNeedsGoals = needsGoals.map(need => {
        const { goal_name, total_amount, completed_amount, deadline, priority } = need;
        const bills = goal_name; // Replace with the appropriate field from your API response
        return createData(bills, total_amount, deadline, priority.toLowerCase(), [], need.id, completed_amount); // Assuming badges is empty for now
      });
      console.log(mappedNeedsGoals)
      // Use mappedNeedsGoals in your component
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  }

  fetchGoals();
  //dummy data for now we will have to map the rows to the file once we have the forms created
  const mockData = {
    Needs: [
      createData(
        "Rent",
        1000.0,
        "01 May 2025",
        "Critical",
        [
          {
            label: "Debt Slayer",
            icon: <DebtSlayerBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Challenge Accepted",
            icon: <ChallengeAcceptedBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "1",
        250.0
      ),
      createData(
        "Utilites",
        500.0,
        "11 Nov 2025",
        "High",
        [
          {
            label: "Challenge Accepted",
            icon: <ChallengeAcceptedBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Challenge Conqurere",
            icon: <ChallengeConqurereBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "2",
        100.0
      ),
      createData(
        "Childcare",
        1700.0,
        "20 Oct 2026",
        "Medium",
        [
          {
            label: "Goal Grubber",
            icon: <GoalGrubberBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Overachiever",
            icon: <OverachieverBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "3",
        100.0
      ),
      createData(
        "Student Loans",
        1000.0,
        "13 Dec 2026",
        "Low",
        [
          {
            label: "Steady Saver",
            icon: <SteadySaverBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Streak Starter",
            icon: <StreakStarterBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "4",
        460.0
      ),
      createData(
        "Car Payment",
        300.0,
        "20 Dec 2026",
        "Low",
        [
          {
            label: "Budget Boss",
            icon: <BudgetBossBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Challenge Champion",
            icon: <ChallengeChampionBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "5",
        75.0
      ),
    ],
    Bills: [
      createData(
        "Rent",
        1250.0,
        "03 Nov 2024",
        "Critical",

        [
          {
            label: "Budget Boss",
            icon: <BudgetBossBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Challenge Champion",
            icon: <ChallengeChampionBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "6",
        250.0
      ),
      createData(
        "Utilites",
        500.0,
        "13 Sept 2024",
        "High",
        [
          {
            label: "Steady Saver",
            icon: <SteadySaverBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Streak Starter",
            icon: <StreakStarterBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "7",
        100.0
      ),
      createData(
        "Car Insurance",
        300.0,
        "10 Dec 2025",
        "Low",
        [
          {
            label: "Goal Grubber",
            icon: <GoalGrubberBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Overachiever",
            icon: <OverachieverBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "8",

        75.0
      ),
      createData(
        "Student Loans",
        650.0,
        "03 July 2024",
        "Critical",
        [
          {
            label: "Debt Slayer",
            icon: <ScroogeMcSavingsBadge />,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
          },
          {
            label: "Challenge Accepted",
            icon: <LongGamePlayerBadge />,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
          },
        ],
        "9",
        460.0
      ),
    ],
  };

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
