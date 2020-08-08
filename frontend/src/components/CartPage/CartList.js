import React from 'react';
import CartItem from "./CartItem";
import {CartConsumer} from "../../context/CartContext";

const CartList = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <CartConsumer>
                        {value => {
                            const {cart, removeItem} = value;

                            if(cart.length === 0){
                                return <h1 className="text-title text-center my-4">
                                    Your cart is currently empty
                                </h1>
                            }

                            return <>
                                {cart.map(item => (<CartItem key={item.id} cartItem={item} removeItem={removeItem}/>))}
                            </>
                        }}
                    </CartConsumer>
                </div>
            </div>
        </div>
    );
};

export default CartList;