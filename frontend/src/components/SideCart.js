import React from "react";
import {CartConsumer} from "../context/CartContext";
import styled from "styled-components";
import {Link} from 'react-router-dom';

export default function SideCart() {
    return (
        <CartConsumer>
            {value => {
                const {cartOpen, closeCart, cart, cartTotal} = value;
                return <CartWrapper show={cartOpen} onClick={closeCart}>
                    <ul>
                        {cart.map(item => {
                            return <li key={item.id} className="cart-item mb-4">
                                        <img width="35" src={item.main_image} alt="cart item"/>
                                        <div className="mt-3">
                                            <h6 className="text-uppercase">{item.title}</h6>
                                        </div>
                                <hr/>
                            </li>
                        })}
                    </ul>
                    
                    <h4 className="text-capitalize text-center text-main mb-4">
                        cart total: ${cartTotal}
                    </h4>

                    <div className="text-center">
                        <Link to="/cart" className="main-link">cart page</Link>
                    </div>

                </CartWrapper>
            }}
        </CartConsumer>
    )
}

const CartWrapper = styled.div`
position: fixed;
top: 83px;
right: 0;
width: 100%;
height: 100%;
background: var(--mainWhite);
box-shadow: ${props => props.show ? '-1px 15px 18px 0px var(--primaryColor)' : '0'};
z-index: 1;
transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
transition: var(--mainTransition);
@media (min-width: 576px){
width: 25rem;
}

overflow: scroll;
padding: 2rem;

.ul{
padding: 0 !important;
}

.cart-item{
list-style: none;
}

@media (max-width: 960px) {        
      top: 57px;
  

`;
