import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Boardpage from './Boardpage/Boardpage';
import Finpage from './Finpage/Finpage';
import Homepage from './Homepage/Homepage';
import Loginpage from './Login/Login';
import Mypage from './Mypage.js/Mypage';
import Setting from './Mypage.js/Setting';
import Userpage from './Mypage.js/Userpage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/mynickname" element={<Mypage />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/mynickname/:boardname" element={<Boardpage />} />
        <Route path="/:nickname" element={<Userpage />} />
        <Route path="/settings/account-settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
