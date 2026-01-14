import React from "react";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Menu,
  Close,
  Dashboard,
  ManageAccounts,
  Group,
  ExitToApp,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent } from "react-router-dom";

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "Users",
    path: "/admin/user-managment",
    icon: <ManageAccounts />,
  },
  {
    name: "Group",
    path: "/admin/group-management",
    icon: <Group />,
  },
  {
    name: "messages",
    path: "/admin/messages",
    icon: <ManageAccounts />,
  },
];

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const SideBar = ({ w = "100%" }) => {
  const loaction = useLocation();

  const logoutHandler = () => {
    console.log("log out");
  };

  return (
    <>
      <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
        <Typography variant="h5" textTransform={"uppercase"}>
          Admin
        </Typography>
        <Stack spacing={"1rem"}>
          {adminTabs.map((tab, index) => {
            return (
              <>
                <Link
                  key={tab.path || index}
                  to={tab.path}
                  sx={
                    loaction.pathname === tab.path && {
                      bgcolor: "black",
                      color: "white",
                      ":hover": { color: "gray" },
                    }
                  }
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={"1rem"}
                  >
                    {tab.icon}
                    <Typography>{tab.name}</Typography>
                  </Stack>
                </Link>
              </>
            );
          })}

          <Link onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToApp />
              <Typography>Logout</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

const isadmin = true

if(!isadmin) {
  console.log("NO admin ")
}

const AdminLayout = ({ children }) => {
  const handleMobile = () => {};
  const handleClose = () => {};

  const isMobile = true;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <Menu />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <SideBar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#fffff" }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
