import './App.css';
import FriendsPage from './components/FriendsPage/FriendsPage';
import LoginPage from './components/LoginPage/LoginPage';
import {Routes,Route} from 'react-router-dom';
import Notifications from './components/Notifications/Notifications';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/loginPage" element={<LoginPage/>}/>
        <Route path="/friendsPage" element={<FriendsPage/>}/>
        <Route path="/notificationsPage" element={<Notifications/>}/>
      </Routes>
    </div>
  );
}

export default App;
