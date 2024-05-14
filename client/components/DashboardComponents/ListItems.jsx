import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { RxDashboard } from "react-icons/rx";
import { PiChartBar, PiBank, PiThumbsUpLight } from "react-icons/pi";
import { IoSettingsOutline, IoMapOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";

export const mainListItems = (
  <>
    <ListItemButton sx={{color: "#1F648E"}}>
      <ListItemIcon sx={{fontSize: "1.5em",color: "#1F648E"}}>
        <RxDashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard"  />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{fontSize: "1.5em"}}>
        <PiBank />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{fontSize: "1.5em"}}>
        <PiChartBar />
      </ListItemIcon>
      <ListItemText primary="Statistics" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{fontSize: "1.5em"}}>
        <IoMapOutline />
      </ListItemIcon>
      <ListItemText primary="Budget" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{fontSize: "1.5em"}}>
        <GoPeople />
      </ListItemIcon>
      <ListItemText primary="Community" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{fontSize: "1.5em"}}>
        <PiThumbsUpLight />
      </ListItemIcon>
      <ListItemText primary="Advice" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{fontSize: "1.5em"}}>
        <IoSettingsOutline/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </>
);

