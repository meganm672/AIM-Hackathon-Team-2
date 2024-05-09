import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import BudgetAccordian from './BudgetAccordian';

const DashboardTabs = () => {
  return (
    <>
      <Tabs defaultValue={0}>
        <TabList underlinePlacement={top}>
          <Tab>Goals</Tab>
          <Tab>Challenges</Tab>
        </TabList>
        <TabPanel value={0}>
          <Box sx={{height:"65vh"}}>
            <Paper elevation={2}  >
              <Typography>Catagories</Typography>

              <Divider />
              <Typography>Total Balance:</Typography>
              <BudgetAccordian />
            </Paper>
          </Box>
        </TabPanel>
        <TabPanel value={1}>
          <b>Second</b> tab panel
        </TabPanel>
      </Tabs>
    </>
  );
};

export default DashboardTabs;