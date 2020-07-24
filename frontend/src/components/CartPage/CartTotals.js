import React from 'react';
import {ProductConsumer} from "../../context";

const CartTotals = () => {
    return (
        <div className="container">
            <div className="row">
                <ProductConsumer>
                    {value => {
                        const {clearCart, cartSubTotal, cartTax, cartTotal} = value;

                        return <div className="col text-title text-center my-4">
                            <button className="btn btn-outline-danger text-capitalize mb-4"
                                    onClick={clearCart}>
                                clear cart
                            </button>

                            <h3>subtotal : {cartSubTotal}zł</h3>
                            <h3>tax : {cartTax}zł</h3>
                            <h3>total : {cartTotal}zł</h3>

                        </div>
                    }}
                </ProductConsumer>
            </div>
        </div>
    );
};

export default CartTotals;