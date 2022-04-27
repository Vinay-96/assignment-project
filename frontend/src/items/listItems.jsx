import { ChartBar } from "../icons/chart-bar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const listItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <ChartBar />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </>
);
