import React from "react";
import Hero from "../components/Hero";
import contactBG from "../images/contactBG.jpeg"
import Contact from "../components/ContactPage/Contact";

export default function ContactPage() {
    return (
        <>
            <Hero img={contactBG}/>
            <Contact/>
        </>
    )
}