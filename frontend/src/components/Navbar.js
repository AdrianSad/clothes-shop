import React from "react";
import {FaBars, FaCartPlus} from "react-icons/all";
import styled from 'styled-components';
import logo from '../images/logo.svg';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {CartConsumer} from "../context/CartContext";
import {UserConsumer} from "../context/UserContext";
import {getCurrentUser} from "../api/user";
import {logout} from "../api/user";

export default function Navbar() {
    return (
        <CartConsumer>
            {value => {
                const {cartItems, handleSidebar, handleCart, hidden} = value;

                return (
                <UserConsumer>
                    {valueUser => {

                        const {showModal, userLogout, user} = valueUser;

                        return (
                            <NavWrapper hide={hidden}>

                                {hidden ?
                                    <div className="nav-center">

                                        <FaBars className="nav-icon" onClick={handleSidebar}/>

                                        <Link to="/"><img className="nav-logo-hidden" src={logo}
                                                          alt="Clothes Shop Logo"/></Link>

                                        <div className="nav-cart">
                                            <FaCartPlus className="nav-icon" onClick={handleCart}/>
                                            <div className="cart-items">
                                                {cartItems}
                                            </div>
                                        </div>

                                    </div>

                                    :
                                    <ul>
                                        <li>
                                            <Link to="/" className="nav-link">
                                                home
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/contact" className="nav-link">
                                                contact
                                            </Link>
                                        </li>

                                        <Link to="/"><img className="nav-logo" src={logo}
                                                          alt="Clothes Shop Logo"/></Link>
                                        <li>
                                            { user.token
                                                ? <a className="login-btn" onClick={userLogout}> Logout </a>
                                                    : <a className="login-btn" onClick={showModal}> Login </a>
                                            }
                                        </li>

                                        <li>
                                            <Link to="/cart" className="nav-link">
                                                cart
                                                <div className="text-cart">
                                                    {cartItems}
                                                </div>
                                            </Link>
                                        </li>

                                    </ul>
                                }
                            </NavWrapper>
                        );
                    }}
                </UserConsumer>
                );
            }}

        </CartConsumer>
    );
}

const NavWrapper = styled.nav`
    //position: -webkit-sticky;
    position:  fixed;
    top: 0;
    width: 100%;
    padding: ${props => (props.hide ? "1rem 1.5rem" : "1.2rem 6rem")};
    transition: var(--mainTransition);
    background: var(--mainWhite);
    box-shadow: 0 1px 18px 0px var(--primaryColor);
    z-index: 2;
    .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //max-width: 1170px;
    margin: 0 auto;
    }

    .nav-logo{
    padding-right: 2rem;
    }
    
    @media screen and (max-width: 600px) {
    .nav-logo img {
    display: none;
    }
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
    
    .login-btn{
     background: transparent;
     border: none;
     font-size: 1.5rem;
     text-transform: capitalize;
     transition: var(--mainTransition);
    }
    
    .login-btn:hover{
      color: var(--primaryColor);
      cursor: pointer;
    }
    
    
    @media (max-width: 767px) {        
    padding: 1rem 1.5rem;       
   .nav-logo,
    .nav-logo-hidden{
      display: none;
   }
}

@media (max-width: 960px) {        
    padding: 1rem 1.5rem;   
    .nav-logo {
      display: none;
   }    
}

    `;