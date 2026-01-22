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


// Higher Order Component
const AppLayout = (WrappedComponent) => {
  return (props) => {
    
    const {isLoading,data,isError,refetch , error } = useMyChatsQuery("")
    console.log(data)

    useErrors([{isError,error}])
  
    // useEffect(()=>{
    //   if(isError) toast.error(error?.data?.message || "somthing went wrong ")
    // },[isError,error])

  const handleDeleteChat = async (e,_id,groupChat) => {
   e.preventDefault()
  };


    return (
      <>
        <div className="overflow-hidden w-full ">
          <Title title="Home Page" description="Welcome to the chat app" />
          <Header />
          <div className="flex h-[calc(100vh-62px)] w-full bg-gray-100">
            <div className=" h-screen w-full hidden sm:block border-r border-gray-300">

              {
                isLoading ? "loading..." : <ChatList
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
              }
              
            </div>
            <div className="w-full h-full">
              <WrappedComponent {...props} />
            </div>
            <div className=" h-screen w-full hidden md:block">
              <Profile />
            </div>
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
