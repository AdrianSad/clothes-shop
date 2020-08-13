import React from "react";
import {FaBars, FaCartPlus} from "react-icons/all";
import styled from 'styled-components';
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';
import {CartConsumer} from "../context/CartContext";
import {UserConsumer} from "../context/UserContext";

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

                                            {
                                                user.token ? <li className="dropdown">
                                                        <p className="login-btn">{user.username}</p>
                                                        <div className="dropdown-content">
                                                            <Link to="/profile" className="dropdown-btn">Profile</Link>
                                                            <Link to="/products/new" className="dropdown-btn">New
                                                                Product</Link>
                                                            <p className="dropdown-btn" onClick={userLogout}>Logout</p>
                                                        </div>
                                                    </li>
                                                    : <li>
                                                        <p className="login-btn" onClick={showModal}> Login </p>
                                                    </li>
                                            }

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
    
    li .dropdown-btn{
  display: inline-block;
  color: var(--mainWhite);
  text-decoration: none;
  transition: var(--mainTransition);
}

  li.dropdown {
  display: inline-block;
  }
  
  .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}

  .dropdown-content .dropdown-btn {
  color: black;
  padding: 1rem;
  text-decoration: none;
  display: block;
  text-align: left;
  margin: 0;
}

 .dropdown-content .dropdown-btn:hover{
  background: var(--primaryColor);
  color: var(--mainWhite);
  cursor: pointer;
}

  .dropdown-content .dropdown-btn {background-color: #f1f1f1;}

  .dropdown:hover .dropdown-content {
  display: block;
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
     margin: 0;
    }

    .login-btn:hover{
      color: var(--primaryColor);
      cursor: pointer;
    }

    @media only screen and (max-width: 768px) {  
    padding: ${props => (props.hide ? "1rem 1.5rem" : "0rem")};  
    .nav-logo{
      display: none;
   }    
   
   .nav-logo-hidden{
   max-width: 50vw;
   }
   .nav-link,
   .login-btn{
   font-size: 1rem;
   }
}
    `;