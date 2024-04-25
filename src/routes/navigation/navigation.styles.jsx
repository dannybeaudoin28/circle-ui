import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

export const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: #444;
  border: 1px solid #666;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #bada55;
    background-color: #555;
  }
`;

export const SearchButton = styled.button`
  background-color: #444;
  border: 1px solid #666;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #555;
    border-color: #bada55;
  }
`;
