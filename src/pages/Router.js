import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Finpage from './Finpage/Finpage';
import Homepage from './Homepage/Homepage';
import Loginpage from './Login/Login';
import Mypage from './Mypage.js/Mypage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
