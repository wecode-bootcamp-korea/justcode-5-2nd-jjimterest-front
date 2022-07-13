import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Boardpage from './Boardpage/Boardpage';
import Finpage from './Finpage/Finpage';
import Homepage from './Homepage/Homepage';
import Loginpage from './Login/Login';
import Mypage from './Mypage.js/Mypage';
import Setting from './Mypage.js/Setting';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/mypage/:boardname" element={<Boardpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
