import './App.css';
import FriendsPage from './components/FriendsPage/FriendsPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import {Routes,Route} from 'react-router-dom';
import Notifications from './components/Notifications/Notifications';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/ProfilePage/profile';
import FriendsPageNew from './components/FriendsPageNew/FriendsPage';
import ButtonAppBar from './components/Navbar/navbar';

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/loginPage" element={<LoginPage/>}/>
      <Route path="/signUpPage" element={<SignUpPage/>}/>
      <Route path="/friendsPage" element={<FriendsPage/>}/>
      <Route path="/friendsPageNew" element={<FriendsPageNew/>}/>
      <Route path="/notificationsPage" element={<Notifications/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
