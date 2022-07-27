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
import Allboardpage from './Boardpage/Allboardpage';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/main" element={<Homepage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/mypage/:boardname" element={<Boardpage />} />
        <Route path="/:nickname" element={<Userpage />} />
        <Route path="/settings/account-settings" element={<SettingM />} />
        <Route path="/mypage/:boardname/_tools" element={<Boardarrange />} />
        <Route path="/:nickname/:boardname/" element={<Userboard />} />
        <Route path="/:nickname/:boardname/all" element={<Allboardpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
