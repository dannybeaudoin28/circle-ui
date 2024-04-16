import { Routes, Route } from 'react-router-dom';

import './App.css';
import AdminPanel from './routes/admin-panel/admin-panel.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignUp from './routes/sign-up/sign-up.component';
import ProfilePage from './routes/profile-page/profile-page.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route path='/home' element={<Home /> } />        
        <Route path='/admin-panel' element={<AdminPanel />} />
        <Route path='/profile-page' element={<ProfilePage />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
