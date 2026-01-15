import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import axios from "axios"


// loader
import LayoutLoader from "./components/layout/Loader";

// admin pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
const ChatManagement = React.lazy(() =>
  import("../src/pages/admin/ChatManagement.jsx")
);
const Usermanagement = React.lazy(() =>
  import("../src/pages/admin/Usermanagement.jsx")
);
const Groupmanagement = React.lazy(() =>
  import("../src/pages/admin/Groupmanagment.jsx")
);
const Message = React.lazy(() => import("../src/pages/admin/Message.jsx"));

//user  PAGES
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Chat = React.lazy(() => import("./pages/Chat"));
const Groups = React.lazy(() => import("./pages/Groups"));
const NotFound = React.lazy(() => import("./pages/PagenotFound"));

// env imports 
import { server } from "./constants/config.js";

let user = true;


const App = () => {
    React.useEffect(()=>{
    // console.log(server)
    axios.get(`${server}/api`)
    },[])
  return (
    <Suspense
      fallback={
        <>
          <LayoutLoader />
        </>
      }
    >
      <Routes>
        {/*  */}
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Route>
        {/*  */}
        <Route element={<ProtectRoute user={!user} redirect="/" />}>
          <Route path="/userauthentication">
            <Route path="login" element={<Login type={"login"} />} />
            <Route path="register" element={<Login type={"signin"} />} />
          </Route>
        </Route>
        {/*  */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/ChatManagement" element={<ChatManagement />} />
        <Route path="/admin/user-managment" element={<Usermanagement />} />
        <Route path="/admin/group-management" element={<Groupmanagement />} />
        <Route path="/admin/messages" element={<Message />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
