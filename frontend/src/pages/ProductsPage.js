import React from "react";
import Product from "../components/Product";
import Hero from "../components/Hero";
import productsBG from "../images/productsBG.jpg"
import Products from "../components/ProductsPage/Products";
export default function ProductsPage() {
    return (
        <>
            <Hero img={productsBG}/>
            <Products/>
        </>
    )
}