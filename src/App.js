import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './routes/admin-panel/admin-panel.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignUp from './routes/sign-up/sign-up.component';
import ProfilePage from './routes/profile-page/profile-page.component';
import FriendPage from './routes/friend-page/friend-page.component';
import ProfileSearch from './routes/profile-search/profile-search.component';
import Messenger from './routes/messenger/messenger.component';

function App() {
  return (
    <Routes>
      {/* Render Navigation component for all routes */}
      <Route path="/" element={<Navigation />}>
        {/* Render Home component when the root URL matches */}
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='admin-panel' element={<AdminPanel />} />
        <Route path='profile-page' element={<ProfilePage />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='friend-page/:friendId' element={<FriendPage />} />
        <Route path='profile-search/:searchString' element={<ProfileSearch />} />
        <Route path='messenger/:sendId/:receiveId' element={<Messenger />} />
      </Route>
    </Routes>
  );
}

export default App;
