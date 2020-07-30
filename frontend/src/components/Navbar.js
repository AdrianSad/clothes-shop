import React from "react";
import {FaBars, FaCartPlus} from "react-icons/all";
import styled from 'styled-components';
import {ProductConsumer} from "../context";
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';

export default function Navbar({hidden}) {
    return (
        <ProductConsumer>
            {value => {
                const {cartItems, handleSidebar, handleCart, links, cartOpen, sidebarOpen} = value;

                return (
                    <NavWrapper hide={hidden || cartOpen || sidebarOpen}>

                        {hidden || cartOpen || sidebarOpen ?
                            <div className="nav-center">

                                <FaBars className="nav-icon" onClick={handleSidebar}/>

                                <Link to="/"><img className="nav-logo" src={logo} alt="Clothes Shop Logo"/></Link>

                                <div className="nav-cart">
                                    <FaCartPlus className="nav-icon" onClick={handleCart}/>
                                    <div className="cart-items">
                                        {cartItems}
                                    </div>
                                </div>

                            </div>

                            :
                            <ul>
                                {links.map(link => link.id !== 3 ? (
                                        <li key={link.id}>
                                            <Link to={link.path} className="nav-link">
                                                {link.text}
                                                {link.id === 5 &&
                                                <div className="text-cart">
                                                    {cartItems}
                                                </div>}
                                            </Link>

                                        </li>
                                    ) :
                                    <Link to="/"><img className="nav-logo" src={logo} alt="Clothes Shop Logo"/></Link>
                                )}
                            </ul>
                        }
                    </NavWrapper>
                );
            }}
        </ProductConsumer>
    );
}

const NavWrapper = styled.nav`
    //position: -webkit-sticky;
    position:  fixed;
    top: 0;
    width: 100%;
    padding: ${props => (props.hide ? "1rem 1.5rem" : "1.5rem 3rem")};
    transition: var(--mainTransition);
    background: var(--mainWhite);
    box-shadow: 0 1px 18px 0px var(--primaryColor);
    z-index: 1;
    .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //max-width: 1170px;
    margin: 0 auto;
    }
    .nav-icon {
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--mainTransition);
    }
    .nav-cart {
    position: relative; 
    }
    .cart-items{
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.85rem;
    position: absolute;
    top: -8px;
    right: -8px;
    padding: 0 5px;
    border-radius: 50%;
    }
    ul{
    display:flex;  
    align-items: center;
    justify-content: space-between;
    list-style:none;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    }
    ul li{
    float: none;
    display: inline-block;
    }
    
    .nav-link{
    font-size: 1.5rem;
    text-transform: capitalize;
    color: var(--mainBlack);
    transition: var(--mainTransition);
    }
    .nav-link:hover{
      color: var(--primaryColor);
    }
    
    .text-cart{
    position:relative;
    top: -8px;
    padding: 0 5px;
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.9rem;
    border-radius: 50%;
    display: inline;
    }

    `;