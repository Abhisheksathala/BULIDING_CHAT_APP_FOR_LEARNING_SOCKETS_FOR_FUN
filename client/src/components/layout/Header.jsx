import React, { Suspense } from 'react';

// ICON
import { BiMenuAltLeft } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import { CiBellOn } from 'react-icons/ci';
import { IoMdExit } from 'react-icons/io';
import { BsPerson } from 'react-icons/bs';
import BackDorp from '../shared/BackDorp';

// NAV
import { useNavigate } from 'react-router-dom';

// PAGES
const SearchDialog = React.lazy(() => import('../specific/Search'));
const NewGroup = React.lazy(() => import('../specific/NewGroup'));
const Notifications = React.lazy(() => import('../specific/Notifications'));

const Header = () => {
  // NAVIGATION
  const naviget = useNavigate();

  // SATES
  const [mobile, setMobile] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [opennewGroup, setOpennewGroup] = React.useState(false);
  const [notifications, setNotifications] = React.useState(false);

  // FUNCTIONS
  const hadlemobileClick = () => {
    setMobile((prev) => !prev);
  };
  const handelOpenSearchDialog = () => {
    setSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setOpennewGroup((prev) => !prev);
  };
  const opennotification = () => {
    setNotifications((prev) => !prev);
  };
  const logouthandler = () => {
    return naviget('/userauthentication/login');
  };
  const navigettogroup = () => naviget('/groups');

  return (
    <div className={`w-full shadow-lg bg-orange-500 static`}>
      <div className="px-2 py-4 w-full flex item-center justify-between">
        <div className="flex items-center justify-start text-white">
          <p className="text-2xl font-semibold hidden  sm:block">Pingee</p>
          <div
            onClick={() => {
              hadlemobileClick();
            }}
            className="block sm:hidden"
          >
            <BiMenuAltLeft className="text-3xl hover:text-gray-200 transition-colors duration-300 ease-in-out cursor-pointer active:text-gray-500" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div
            onClick={() => {
              handelOpenSearchDialog();
            }}
          >
            <CiSearch className="text-2xl text-gray-300 font-semibold hover:text-gray-200 transition-colors duration-300 ease-in-out cursor-pointer active:text-gray-500" />
          </div>
          <div
            onClick={() => {
              openNewGroup();
            }}
          >
            <FaPlus className="text-2xl text-gray-300 hover:text-gray-200 transition-colors duration-300 ease-in-out cursor-pointer active:text-gray-500" />
          </div>
          <div
            onClick={() => {
              navigettogroup();
            }}
          >
            <BsPerson className="text-2xl text-gray-300 hover:text-gray-200 transition-colors duration-300 ease-in-out cursor-pointer active:text-gray-500" />
          </div>
          <div
            onClick={() => {
              opennotification();
            }}
          >
            <CiBellOn className="text-2xl text-gray-300 hover:text-gray-200 transition-colors duration-300 ease-in-out cursor-pointer active:text-gray-500" />
          </div>
          <div
            onClick={() => {
              logouthandler();
            }}
          >
            <IoMdExit className="text-2xl text-gray-300 hover:text-gray-200 transition-colors duration-300 ease-in-out cursor-pointer active:text-gray-500" />
          </div>
        </div>
      </div>
      {search && (
        <>
          <Suspense fallback={<BackDorp />}>
            <SearchDialog />
          </Suspense>
        </>
      )}
      {opennewGroup && (
        <>
          <Suspense fallback={<BackDorp />}>
            <NewGroup />
          </Suspense>
        </>
      )}
      {notifications && (
        <>
          <Suspense fallback={<BackDorp />}>
            <Notifications />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Header;
