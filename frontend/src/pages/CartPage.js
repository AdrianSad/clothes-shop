import React from "react";
import Cart from "../components/CartPage";

export default function CartPage(props) {
    return (
        <>
            <Cart history={props.history}/>
        </>
    )
}