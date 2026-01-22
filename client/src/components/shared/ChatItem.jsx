import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AvaterCard from './AvaterCard';

const ChatItem = ({
  avater = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {

  console.log(avater)

  return (
    <>
      <Link
        to={`/chat/${_id}`}
        onContextMenu={(e) => {
          handleDeleteChat(e, _id, groupChat);
        }}
        className="w-full "
      >
        <div
          className={`flex items-center p-4   transition-colors ease-in-out duration-300 border-b-2 border-gray-300 justify-start gap-4 relative ${
            sameSender
              ? 'bg-blue-600 text-white transition-colors  duration-300 ease-in-out  hover:bg-blue-700'
              : 'bg-white hover:bg-gray-100  text-black transition-colors duration-300 ease-in-out '
          }`}
        >
          {/* "Times New Roman" */}
          {/* avater card */}
          <AvaterCard avater={avater} />
          <div className="">
            <p className="text-base font-semibold capitalize">{name}</p>
            {newMessageAlert && (
              <>
                <div className="capitalize flex items-center justify-center gap-2 relative">
                  {' '}
                  <span
                    className={` text-sm  rounded-full  w-5 h-5 flex items-center justify-center ${
                      sameSender
                        ? 'bg-white text-black border-white border'
                        : 'bg-black text-white border-black border'
                    }`}
                  >
                    {newMessageAlert?.count}
                  </span>{' '}
                  New message
                </div>
              </>
            )}
          </div>
          {isOnline && (
            <>
              <div>
                <p>Onine</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default memo(ChatItem);
