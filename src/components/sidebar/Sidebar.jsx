import "./sidebar.css";
import React, { useState ,useCallback} from "react";
import { Amplify } from 'aws-amplify';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { FiHome ,FiTrendingUp, FiHardDrive , FiLogOut, FiSettings} from 'react-icons/fi';
export default function Sidebar({}) {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const homeClick = useCallback(() => navigate('/', {replace: true}), [navigate]);
  const devicesClick = useCallback(() => navigate('/devices', {replace: true}), [navigate]);
  const logClick = useCallback(() => navigate('/log', {replace: true}), [navigate]);
  const settingsClick = useCallback(() => navigate('/settings', {replace: true}), [navigate]);
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem" onClick={homeClick}><FiHome/>Home </li>
                    <li className="sidebarListItem" onClick={devicesClick}><FiHardDrive/>&nbsp;Devices</li>
                    <li className="sidebarListItem" onClick={logClick}><FiTrendingUp/>&nbsp;Logs</li>
                    <li className="sidebarListItem" onClick={settingsClick}><FiSettings/>&nbsp;Settings</li>
                    <li className="sidebarListItem" onClick={signOut}><FiLogOut/>&nbsp;Sign Out</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
/*
const Sidebar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chart">Blogs</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Sidebar;*/
