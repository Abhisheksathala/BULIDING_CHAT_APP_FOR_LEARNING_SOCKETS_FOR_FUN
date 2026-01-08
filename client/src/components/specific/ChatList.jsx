import React from 'react';

import ChatItem from '../shared/ChatItem';
import Applayout from "../layout/Applayout"

const ChatList = ({
  w = '100%',
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: '',
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <div className="w-full flex items-start flex-col">
      {chats?.map((data, index) => {
        const { name, avater, _id, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(({ chatId }) => {
          return chatId === _id;
        });

        const isOnline = members?.some((members) => onlineUsers.includes(_id));

        return (
          <>
            <ChatItem
              index={index}
              name={name}
              sameSender={chatId === _id}
              newMessageAlert={newMessageAlert}
              avater={avater}
              _id={_id}
              groupChat={groupChat}
              isOnline={isOnline}
              key={_id}
              handleDeleteChat={handleDeleteChat}
            />
          </>
        );
      })}
    </div>
  );
};

export default ChatList;
