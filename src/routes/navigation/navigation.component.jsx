import React from 'react';

import { Outlet } from 'react-router-dom';

import {
  Nav,
  NavItem,
  Logo,
  MobileNavToggle,
  DesktopNav,
  MobileNav
} from './navigation.styles'

const Navigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [jwtToken, setJwtToken] = React.useState(localStorage.getItem('jwtToken'))

  const logout = () => {
    localStorage.setItem('jwtToken', '');
    setJwtToken(localStorage.getItem('jwtToken'));
  };

  return (
    <div>
      <Nav>
        <Logo>My Logo</Logo>
        <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? 'Close' : 'Menu'}
        </MobileNavToggle>
        <DesktopNav>
          <NavItem><a href="/home">Home</a></NavItem>
          <NavItem><a href='/sign-up'>Sign Up</a> </NavItem>
          {jwtToken !== "" && (
            <>
              <NavItem><a href="/admin-panel">Admin</a></NavItem>
              <NavItem><a href='/profile-page'>My Profile</a></NavItem>
              <NavItem><a href='/home' onClick={logout}>Logout</a></NavItem>
            </>
          )}
        </DesktopNav>
        <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
          <NavItem><a href="/home">Home</a></NavItem>
          <NavItem><a href='/sign-up'>Sign Up</a> </NavItem>
          {jwtToken !== "" && (
            <>
              <NavItem><a href="/admin-panel">Admin</a></NavItem>
              <NavItem><a href='/profile-page'>My Profile</a></NavItem>
              <NavItem><a href='/home' onClick={logout}>Logout</a></NavItem>
            </>
          )}
        </MobileNav>
      </Nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Navigation;