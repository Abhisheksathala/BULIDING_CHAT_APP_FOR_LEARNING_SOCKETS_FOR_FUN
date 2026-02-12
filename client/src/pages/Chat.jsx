import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import InfiniteScroll from 'react-infinite-scroller';

// hook
import { useErrors, useSocketEvents } from "../hooks/hook";

// const user = {
//   _id: "user_002",
//   name: "abhishek",
// };

// TODO : adding infiniti scroll 

const Chat = ({ chatId, user }) => {
  const ContainerRef = React.useRef(null);
  const FilemenuRef = React.useRef(null);
  const socket = getSocket();

  console.log("chatId:", chatId);

  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [allMessages, setAllMessages] = useState([]);

  const { isLoading, error, data, isError } = useChatDetailsQuery({
    chatId,
    skip: !chatId,
  });

  const {
    data: oldmessagesData,
    error: messagesError,
    isLoading: messagesLoading,
    isError: messagesIsError,
  } = useGetMessagesQuery({ chatId, page });

  // console.log("oldmessagesData", oldmessagesData?.messages);

  console.log("oldmessagesData", oldmessagesData);

  const errors = [
    { isError, error },
    { messagesIsError, messagesError },
  ];

  const members = data?.chat?.members;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    console.log(message);
    setMessage("");
  };

  const newmessagesHanlder = useCallback((data) => {
    console.log(data);
    if (!data?.message) return;
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventeArr = useMemo(
    () => ({
      [NEW_MESSAGE]: newmessagesHanlder,
    }),
    [newmessagesHanlder],
  );

  useSocketEvents(socket, eventeArr);

  const allmessages = [...(oldmessagesData?.messages || []), ...messages];

  useErrors([errors]);

  useEffect(() => {
  const container = ContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    if (container.scrollTop === 0 && !messagesLoading) {
      if (page < (oldmessagesData?.totalpages || 1)) {
        setPage(prev => prev + 1);
      }
    }
  };

  container.addEventListener("scroll", handleScroll);

  return () => container.removeEventListener("scroll", handleScroll);
}, [page, messagesLoading, oldmessagesData]);

  // useEffect(()=>{
  //   Object.entries(handlers).forEach((e)=>{})
  //     socket.on(NEW_MESSAGE,(data)=>{console.log(data)})
  //     return ()=>{
  //       socket.off(NEW_MESSAGE,func_newmessagesHanlder)
  //     }
  // },[])

  return isLoading ? (
    "loading"
  ) : (
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
        {allmessages.map((item, index) => (
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
                setMessage(e.target.value);
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

//
