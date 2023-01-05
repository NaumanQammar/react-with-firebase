import {React,useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Files from './pages/Files';
import Users from './pages/Users';
import Login from "./Login";

import 'bootstrap/dist/css/bootstrap.min.css';
function App () {
  
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
          setauthenticated(loggedInUser);
        }
      }, []);
  if(authenticated) return (
    <Router>
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
        <div className='dashboard-body'>
            <Routes>
                <Route path="*" element={<div></div>} />
                <Route exact path="/" element={< Users />} />
                <Route exact path="/files" element={< Files />} />
            </Routes>
        </div>
    </div>
  </Router>
  )
else return (<Login />)
  
}

export default App;