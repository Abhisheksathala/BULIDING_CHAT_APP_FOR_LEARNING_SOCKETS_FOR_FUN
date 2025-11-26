import React from 'react';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';

// sample data
import { userChatData } from '../constants/sampleData.js';
// Header
import Header from './Header';
// com
import Profile from '../specific/Profile.jsx';

// Higher Order Component
const AppLayout = (WrappedComponent) => {
  const handleDeleteChat = () => {
    console.log('delete chat ');
  };

  return (props) => {
    return (
      <>
        <div className="overflow-hidden w-full">
          <Title title="Home Page" description="Welcome to the chat app" />
          <Header />
          <div className="flex h-screen w-full bg-yellow-500">
            <div className=" h-screen w-full hidden sm:block">
              <ChatList
                chats={userChatData}
                chatId={'1'}
                newMessagesAlert={[
                  {
                    chatId: '1',
                    count: 4,
                  },
                ]}
                handleDeleteChat={handleDeleteChat}
              />
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
