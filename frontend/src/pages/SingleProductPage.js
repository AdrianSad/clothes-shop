import React from "react";
import {Link} from 'react-router-dom';
import Hero from '../components/Hero';
import cartBG from '../images/cartBG.jpg';
import {ProductConsumer} from "../context";

export default function SingleProductPage() {
    return (
        <>
            <Hero img={cartBG} title="product details"/>
            <ProductConsumer>
                {value => {
                    const {singleProduct, addToCart, loading} = value;

                    if(loading){

                    }

                    const {user, description, id, price, title, size, image} = singleProduct;

                    return <section className="py-5">
                        <div className="container">
                            <div className="row">

                                <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                                    <img src={`../${image}`} alt="single product" className="img-fluid"/>
                                </div>

                                <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                                    <h5 className="text-title mb-4">{title}</h5>
                                    <h5 className="text-capitalize text-muted mb-4">Seller : {user}</h5>
                                    <h5 className="text-capitalize text-main mb-4">Price : {price}</h5>
                                    <h5 className="text-capitalize text-main mb-4">Size : {size}</h5>
                                    <p className="text-capitalize text-title mt-3">Description :</p>
                                    <p>{description}</p>
                                    <button type="button" className="main-link" style={{margin: "0.75rem"}}
                                            onClick={() => {addToCart(id)}}>add to cart</button>
                                    <Link to='/products' className="main-link" style={{margin: "0.75rem"}}>back to products</Link>
                                </div>

                            </div>
                        </div>
                    </section>
                }}
            </ProductConsumer>
        </>
    )
}