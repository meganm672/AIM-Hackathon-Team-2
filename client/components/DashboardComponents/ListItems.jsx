import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { IoChatbubbles } from "react-icons/io5";


export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Bank" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <IoChatbubbles />
      </ListItemIcon>
      <ListItemText primary="Messaging" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </>
);

