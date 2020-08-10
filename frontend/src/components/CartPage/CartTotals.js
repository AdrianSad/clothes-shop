import React from 'react';
import {CartConsumer} from "../../context/CartContext";
import PayPalBtn from "./PayPalBtn";
import {Link} from "react-router-dom";

const CartTotals = ({history}) => {
    return (
        <div className="container-fluid text-center">
            <hr/>
            {/*<div className="row">*/}
            <CartConsumer>
                {value => {
                    const {clearCart, cartSubTotal, cartTax, cartTotal} = value;

                    return <>
                        <div className="row justify-content-end">

                            <div className="col-lg-3 text-title text-center">
                                <h5>subtotal : {cartSubTotal}zł</h5>
                                <h5>tax : {cartTax}zł</h5>
                                <h3>total : {(Math.round(cartTotal * 100) / 100).toFixed(2)}zł</h3>
                            </div>
                            <div className="col-lg-3">
                                <button className="btn btn-outline-danger text-capitalize mb-4"
                                        onClick={clearCart}>
                                    clear cart
                                </button>
                            </div>
                        </div>
                        <div className="col text-center my-5">
                            <PayPalBtn history={history} cartTotal={cartTotal} clearCart={clearCart}/>
                            <Link to="/checkout" className="main-link my-5">{localStorage.getItem("user") ? "Checkout" : "Log in and pay"}</Link>
                        </div>
                    </>
                    // <div className="col text-title text-center my-4">
                    //     <button className="btn btn-outline-danger text-capitalize mb-4"
                    //             onClick={clearCart}>
                    //         clear cart
                    //     </button>
                    //
                    //     <h3>subtotal : {cartSubTotal}zł</h3>
                    //     <h3>tax : {cartTax}zł</h3>
                    //     <h3>total : {cartTotal}zł</h3>
                    //     <PayPalBtn history={history} cartTotal={cartTotal} clearCart={clearCart}/>
                    //     <Link to="/checkout" className="main-link my-3">Checkout</Link>
                    // </div>
                }}
            </CartConsumer>
            {/*</div>*/}
        </div>
    );
};

export default CartTotals;