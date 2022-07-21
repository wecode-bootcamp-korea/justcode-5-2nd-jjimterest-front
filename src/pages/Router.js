import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Boardpage from './Boardpage/Boardpage';
import Finpage from './Finpage/Finpage';
import Homepage from './Homepage/Homepage';
import Loginpage from './Login/Loginpage';
import Mypage from './Mypage.js/Mypage';
import Setting from './Mypage.js/Setting';
import Userpage from './Mypage.js/Userpage';
import ScrollToTop from '../components/Scroll/Scroll';
import SettingM from './Mypage.js/SettingM';
import Boardarrange from './Boardpage/Boardarrange';
import Userboard from './Boardpage/Userboard';
import { useState, useEffect } from 'react';
import BASE_URL from '../config';

function Router() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjU4MzY4MzE5fQ.0Z8XRjodmNbm07fjSsAAir14VY255DWt-cXh1FYCy3M';
  const [myName, setMyName] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(`http://${BASE_URL}:10010/edit-profile`, {
          method: 'GET',
          headers: {
            // Authorization: localStorage.getItem('access_token'),
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      setMyName(`${result[0]}`);
    };
    fetchData();
  }, [myName]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route
          path="/mypage"
          element={<Mypage myName={myName && myName.name} />}
        />
        <Route path="/settings" element={<Setting />} />
        <Route path="/mypage/:boardname" element={<Boardpage />} />
        <Route path="/:nickname" element={<Userpage />} />
        <Route path="/settings/account-settings" element={<SettingM />} />
        <Route path="/mypage/:boardname/_tools" element={<Boardarrange />} />
        <Route path="/:nickname/:boardname/" element={<Userboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
