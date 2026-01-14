import React from "react";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
  styled,
  Container,
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
  {
    name: "ChatManagement",
    path: "/admin/ChatManagement",
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
  const location = useLocation();

  const logoutHandler = () => {
    console.log("log out");
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab, index) => (
          <Link
            key={tab.path || index}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
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
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToApp />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const isadmin = true;

if (!isadmin) {
  console.log("NO admin ");
}

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Menu Button */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1200,
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <Menu />}
        </IconButton>
      </Box>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: { md: '300px' },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <SideBar />
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: 'calc(100% - 300px)' },
          p: { xs: 2, md: 3 },
          backgroundColor: '#ffffff',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isMobile}
        onClose={handleClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '70vw',
          },
        }}
      >
        <SideBar w="100%" />
      </Drawer>
    </Box>
  );
};

export default AdminLayout;