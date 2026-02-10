import React, { useState } from "react";
import Applayout from "../components/layout/Applayout";
import { Box, Stack, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AttachFile, Send } from "@mui/icons-material";

import { InputBox } from "../components/styles/InputBox";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessages } from "../components/constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../components/constants/events";
import { useChatDetailsQuery } from "../redux/api/api";


const user = {
  _id: "user_002",
  name: "abhishek",
};

const Chat = ({chatId}) => {
  const ContainerRef = React.useRef(null);
  const FilemenuRef = React.useRef(null);
  const socket = getSocket();

const {isLoading,error,data,isError} = useChatDetailsQuery({chatId,skip:!chatId})
 

  const [message, setMessages] = useState();


  const members = data?.chat?.members

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Emitting message to the server 
    socket.emit(NEW_MESSAGE, {chatId, members, message})
    console.log(message);
    setMessages("");
  };

  return isLoading ? "loading" : (
    <Stack
      className="relative"
      height="100%"
      bgcolor={grey[100]}
      sx={{ overflow: "hidden" }}
    >
      {/* message render here  */}
      <Box
        boxSizing={"border-box"}
        sx={{
          flexGrow: 1,
          p: 2,
          spacing: "1rem",
          padding: "1rem",
          overflowX: "hidden",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        ref={ContainerRef}
      >
        {/* message render */}
        {sampleMessages.map((item, index) => (
          <>
            <MessageComponent key={index} message={item} user={user} />
          </>
        ))}
      </Box>

      <Box
        component="form"
        sx={{
          px: 2,
          py: 1.2,
          borderTop: `1px solid ${grey[300]}`,
          backgroundColor: "#fff",
        }}
        onSubmit={submitHandler}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton ref={FilemenuRef}>
            <AttachFile />
          </IconButton>

          <Box height={"2rem"} sx={{ flexGrow: 1 }}>
            <InputBox
              value={message}
              height={"2rem"}
              placeholder="Type a message…"
              onChange={(e) => {
                setMessages(e.target.value);
              }}
            />
          </Box>

          <IconButton
            sx={
              {
                // rotate:"-30deg"
              }
            }
            type="submit"
            color="primary"
          >
            <Send />
          </IconButton>
        </Stack>
      </Box>
      <FileMenu />
    </Stack>
  );
};

export default Applayout(Chat);
