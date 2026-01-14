import React from "react";
import AdminLayOut from "../../components/layout/AdminLayOut.jsx";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings,
  Notifications,
  Group,
  Person,
  Message,
} from "@mui/icons-material";
import moment from "moment";
import { SearchField } from "../../constants/StyledComponents.jsx";
import { CurvedButton } from "../../constants/StyledComponents.jsx";

const AppBar = () => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <AdminPanelSettings
            sx={{
              fontSize: "3rem",
            }}
          />
          <SearchField />
          <CurvedButton>search</CurvedButton>
          <Box flex={1} />
          <Typography
            display={{
              xs: "none",
              lg: "block",
            }}
            whiteSpace={"nowrap"}
            flex={1}
          >
            {moment().format("MMM Do YYYY")}
          </Typography>
          <Notifications />
        </Stack>
      </Paper>
    </>
  );
};

const Dashboard = () => {
  const Widges = () => {
    return (
      <>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={"2rem"}
          margin={"2rem 0"}
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Widget title={"user"} value={34} Icon={<Person />} />
          <Widget title={"chats"} value={14} Icon={<Group />} />
          <Widget title={"messages"} value={44} Icon={<Message />} />
        </Stack>
      </>
    );
  };
  return (
    <AdminLayOut>
      <Container component={"main"}>
        <AppBar />
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last message
            </Typography>
            <Typography variant="h5">{"chat"}</Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3rem",
              borderRadius: "1rem",
              display: "flex",
              width: "100%",
              Width: { xs: "100%", sm: "50%" },
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              height: "25rem",
            }}
          >
            {"Dougnut chat"}

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              {" "}
              <Group />
              <Typography> VS</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        <Widges />
      </Container>
    </AdminLayOut>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <>
      <Paper>
        <Stack alignItems={"center"} spacing={"1rem"}>
          <Typography>{value}</Typography>
          <Stack>
            {Icon ? Icon : ""}
            <Typography>{title}</Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default Dashboard;
