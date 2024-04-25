import React, { useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import {
  Nav,
  NavItem,
  Logo,
  MobileNavToggle,
  DesktopNav,
  MobileNav,
  SearchContainer,
  SearchInput,
  SearchButton,
} from './navigation.styles'

const Navigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [jwtToken, setJwtToken] = React.useState(localStorage.getItem('jwtToken'));

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // search for users
    // return list of users
    // load component passing in list
    // make each item clickable
  };

  const handleSearchSubmit = (event) => {
    // event.preventDefault();
    console.log('handleSearchSubmit clicked!');
    navigate(`/profile-search/${searchQuery}`);
  };

  const logout = () => {
    localStorage.setItem('jwtToken', '');
    localStorage.setItem('isAuthenticated', false);
    const isAuth = localStorage.getItem('isAuthenticated');

    console.log('inside logout isAuth is: '. isAuth);
    setJwtToken(localStorage.getItem('jwtToken'));
  };

  return (
    <div>
      <Nav>
        <Logo>Circles</Logo>
        {jwtToken !== "" && (
          <SearchContainer>
            <SearchInput
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
            <SearchButton onClick={() => handleSearchSubmit()}>Search</SearchButton>
          </SearchContainer>
        )}
        <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? 'Close' : 'Menu'}
        </MobileNavToggle>
        <DesktopNav>
          {jwtToken === "" && (
            <>
              <NavItem><a href="/home">Home</a></NavItem>
              <NavItem><a href='/sign-up'>Sign Up</a> </NavItem>
            </>
          )}
          {jwtToken !== "" && (
            <>
              <NavItem><a href="/admin-panel">Admin</a></NavItem>
              <NavItem><a href='/profile-page'>My Profile</a></NavItem>
              <NavItem><a href='/home' onClick={logout}>Logout</a></NavItem>
            </>
          )}
        </DesktopNav>
        <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
          {jwtToken === "" && (
            <>
              <NavItem><a href="/home">Home</a></NavItem>
              <NavItem><a href='/sign-up'>Sign Up</a> </NavItem>
            </>
          )}
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