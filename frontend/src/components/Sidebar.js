import React from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {CartConsumer} from "../context/CartContext";

export default function Sidebar() {
    return (
        <CartConsumer>
            {value => {
                const {links, sidebarOpen, handleSidebar, closeSidebar} = value;

                return <SideWrapper show={sidebarOpen} onClick={closeSidebar}>
                    <ul>
                        {links.map(link => {
                            return (
                                <li key={link.id}>
                                <Link to={link.path} className="sidebar-link" onClick={handleSidebar}>{link.text}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </SideWrapper>
            }}
        </CartConsumer>
    )
}

const SideWrapper = styled.nav`
  position: fixed;
  top: 83px;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--mainWhite);
  z-index: 1;
  transition: var(--mainTransition);
  transform: ${props => props.show ? 'translateX(0)' : 'translateX(-100%)'};
  box-shadow: ${props => props.show ? '-1px 15px 18px 0px var(--primaryColor)' : '0'};
  ul {
  list-style-type: none;
  padding: 0 !important;
  }
  .sidebar-link {
  display: block;
  font-size: 1.5rem;
  text-transform: capitalize;
  color: var(--mainBlack);
  padding: 0.5rem 1.5rem;
  background: transparent;
  transition: var(--mainTransition);
  }
  .sidebar-link:hover {
  background: var(--primaryColor);
  color: var(--mainWhite);
  padding: 0.5rem 1.5rem 0.5rem 2.5rem;
  text-decoration: none;
  }
  @media (min-width: 576px){
  width: 20rem;
  }
  
  @media (max-width: 960px) {        
      top: 57px;
  
}
`;
