import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../App";
import {
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { useMoralis } from "react-moralis";
// header icons start
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import Brightness7Icon from "@mui/icons-material/Brightness4";
import Brightness4Icon from "@mui/icons-material/Brightness4";
// header icons end

function QuickMenu() {
  const { logout } = useMoralis();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: "yellow" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: 3 / 2,
            paddingTop: 0,
            paddingBottom: 0,
            overflow: "visible",
            color: "balck",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/d")}>
          <ListItemIcon>
            <CandlestickChartOutlinedIcon
              fontSize="small"
              sx={{ color: "yellow" }}
            />
          </ListItemIcon>
          Dex
        </MenuItem>
        <MenuItem onClick={() => navigate("/n")}>
          <ListItemIcon>
            <LandscapeOutlinedIcon fontSize="small" sx={{ color: "yellow" }} />
          </ListItemIcon>
          Nex
        </MenuItem>
        <Divider />
        <MenuItem>
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1, color: "yellow" }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "yellow" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default QuickMenu;
