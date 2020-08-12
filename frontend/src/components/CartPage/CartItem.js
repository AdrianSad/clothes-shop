import React from 'react';
import {FaTrash} from "react-icons/all";
import styled from "styled-components";

const CartItem = ({cartItem, removeItem}) => {

    const {id, title, price, main_image} = cartItem;

    return (<ItemWrapper>
            <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center item">

                <div className="col-10 mx-auto col-lg-2 pb-2">
                    <img src={main_image} alt="product" width="60" className="img-fluid"/>
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
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`

.item{
transition: var(--mainTransition);
}

.item:hover{
background: var(--mainWhite);
}

`;

export default CartItem;