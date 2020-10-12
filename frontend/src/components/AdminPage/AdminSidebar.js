import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

class AdminSidebar extends Component {
    render() {
        return (
            <AdminSidebarWrapper>
                <ul>
                    <li><Link className="menu-link" to="/admin/users">Users</Link></li>
                    <li><Link className="menu-link" to="/admin/products">Products</Link></li>
                </ul>
            </AdminSidebarWrapper>
        );
    }
}

const AdminSidebarWrapper = styled.div`
 background: var(--mainWhite);
 //height: 100%;

ul {
 list-style-type: none;
 padding: 0 !important;
}

li {
 padding: 2rem 1rem;
 width: 100%;
 
 &:hover{
  background: var(--primaryColor);
  }
}

.menu-link {
 text-decoration: none;
 width: 100%;
 color: var(--mainBlack);
 transition: var(--mainTransition);
 
 &:hover{
  color: var(--mainWhite);
  cursor: pointer;
 }
}

`;

export default AdminSidebar;