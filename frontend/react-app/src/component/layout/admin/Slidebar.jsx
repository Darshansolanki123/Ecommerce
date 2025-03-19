import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  IconButton,
  Collapse,
  Backdrop,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MenuIcon from "@mui/icons-material/Menu";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect Mobile View

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Backdrop for closing when clicking outside on mobile */}
      {isMobile && mobileOpen && (
        <Backdrop open={mobileOpen} onClick={handleClose} sx={{ zIndex: 1200 }} />
      )}

      {/* Sidebar Container */}
      <Box
        sx={{
          width: 260,
          backgroundColor: "#1a1a2e",
          color: "white",
          position: "fixed",
          top: 64, // Below header
          left: isMobile ? (mobileOpen ? 0 : "-260px") : 0, // Always visible on desktop
          height: "calc(100vh - 64px)",
          overflowY: "auto",
          zIndex: 1300,
          transition: isMobile ? "left 0.4s ease-in-out" : "none", // Smooth transition only on mobile
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Hamburger Icon (Only on Mobile, inside sidebar) */}
          {isMobile && (
            <ListItem
              button
              onClick={handleDrawerToggle}
              sx={{
                justifyContent: "flex-start",
                backgroundColor: "#1a1a2e",
                "&:hover": { backgroundColor: "#16213e" },
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                <MenuIcon fontSize="large" />
              </ListItemIcon>
            </ListItem>
          )}

          {/* Sidebar Menu Items */}
          <List sx={{ flexGrow: 1 }}>
            <ListItem button component={Link} to="/admin/dashboard">
              <ListItemIcon sx={{ color: "white" }}>
                <DashboardIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Products (Collapsible Menu) */}
            <ListItem button onClick={() => setOpenProducts(!openProducts)}>
              <ListItemIcon sx={{ color: "white" }}>
                <ImportExportIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>

            {/* Submenu Items */}
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/admin/products" sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "white" }}>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="All" />
                </ListItem>
                <ListItem button component={Link} to="/admin/product" sx={{ pl: 4 }}>
                  <ListItemIcon sx={{ color: "white" }}>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
                </ListItem>
              </List>
            </Collapse>

            {/* Orders Section */}
            <ListItem button component={Link} to="/admin/orders">
              <ListItemIcon sx={{ color: "white" }}>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>

            <ListItem button component={Link} to="/admin/users">
              <ListItemIcon sx={{ color: "white" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem button component={Link} to="/admin/reviews">
              <ListItemIcon sx={{ color: "white" }}>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Floating Hamburger Icon (Only Visible in Mobile) */}
      {isMobile && !mobileOpen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 72,
            left: 16,
            zIndex: 1400,
            backgroundColor: "#1a1a2e",
            color: "white",
            "&:hover": { backgroundColor: "#16213e" },
            transition: "background-color 0.3s ease, transform 0.3s ease-in-out",
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      )}
    </>
  );
};

export default Sidebar;
