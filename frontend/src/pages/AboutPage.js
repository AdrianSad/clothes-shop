import React from "react";
import Info from "../components/AboutPage/Info";
import Hero from "../components/Hero";
import shoppingBG from "../images/shoppingBG.jpg"

export default function AboutPage() {
    return (
        <>
            <Hero img={shoppingBG}/>
            <Info/>
        </>
    )
}