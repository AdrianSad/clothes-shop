import React from 'react';
import {FaTrash} from "react-icons/all";

const CartItem = ({cartItem, removeItem}) => {

    const {id, title, price, total, image} = cartItem;

    return (
        <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <img src={image} alt="product image" width="60" className="img-fluid"/>
            </div>

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">product: </span>
                {title}
            </div>

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">price: </span>
                {price}zł
            </div>

            <div className="col-10 mx-auto col-lg-2">
                <FaTrash className="text-danger cart-icon"
                onClick={() => removeItem(id)}/>
            </div>

        </div>
    );
};

export default CartItem;