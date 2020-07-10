import React from "react";
import {ProductConsumer} from "../context";
import Hero from "../components/Hero";
import {Link} from 'react-router-dom';

export default function HomePage() {
    return (
        <>
            <Hero title="Buy fashionable at lower price" max="true">
                <Link to="/products" className="main-link" style={{margin: "2rem"}}>
                    our products
                </Link>
            </Hero>
        </>
    );
}