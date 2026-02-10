import React from "react";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";

// sample data
import { userChatData } from "../constants/sampleData.js";
// Header
import Header from "./Header";
// com
import Profile from "../specific/Profile.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { useErrors } from "../../hooks/hook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import { setIsMobile } from "../../redux/reducers/misc.js";
import { getSocket } from "../../socket.jsx";

// Higher Order Component
const AppLayout = (WrappedComponent) => {
  return (props) => {
    const { isLoading, data, isError, error,refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);
    const handleDeleteChat = async (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Deleting chat:", _id, groupChat);
    };
    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);
    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };

    const socket = getSocket()
    console.log(socket.id)

    return (
      <>
        <div className="overflow-hidden w-full ">
          <Title title="Home Page" description="Welcome to the chat app" />
          <Header />

          {isLoading ? (
            <p>loading....</p>
          ) : (
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList
                w="80vw"
                chats={data?.chats}
                chatId={"1"}
                newMessagesAlert={[
                  {
                    chatId: "1",
                    count: 4,
                  },
                ]}
                handleDeleteChat={handleDeleteChat}
              />
            </Drawer>
          )}

          <div className="flex h-[calc(100vh-62px)] w-full bg-gray-100">
            <div className=" h-screen w-full hidden sm:block border-r border-gray-300">
              {isLoading ? (
                "loading..."
              ) : (
                <ChatList
                  chats={data?.chats}
                  chatId={"1"}
                  newMessagesAlert={[
                    {
                      chatId: "1",
                      count: 4,
                    },
                  ]}
                  handleDeleteChat={handleDeleteChat}
                />
              )}
            </div>
            <div className="w-full h-full">
              <WrappedComponent {...props} />
            </div>
            <div className=" h-screen w-full hidden md:block">
              <Profile  />
            </div>
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
