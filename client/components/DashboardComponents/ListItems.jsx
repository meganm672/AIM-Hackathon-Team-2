import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { RxDashboard } from "react-icons/rx";
import { PiChartBar, PiBank } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <RxDashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PiChartBar />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PiBank />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <IoSettingsOutline/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </>
);

