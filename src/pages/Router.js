import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Boardpage from './Boardpage/Boardpage';
import Finpage from './Finpage/Finpage';
import Homepage from './Homepage/Homepage';
import Loginpage from './Login/Loginpage';
import Mypage from './Mypage.js/Mypage';
import Setting from './Mypage.js/Setting';
import ScrollToTop from '../components/Scroll/Scroll';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/finpage" element={<Finpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/mypage/:boardname" element={<Boardpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
