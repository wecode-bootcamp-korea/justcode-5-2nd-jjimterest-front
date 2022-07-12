import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Finpage from './Finpage/Finpage';
import Homepage from './Homepage/Homepage';
import Loginpage from './Login/Login';
import Mypage from './Mypage.js/Mypage';
import ScrollToTop from '../components/Scroll/Scroll';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
