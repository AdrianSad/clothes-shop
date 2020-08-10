import React from 'react';
import Login from "../components/Login";
import LoginBG from "../images/loginBG.jpg";
import Hero from "../components/Hero";

const LoginPage = () => {
    return (
        <>
            <Hero img={LoginBG} max="true"/>
            <Login showCloseBtn={false}/>
        </>
    );
};

export default LoginPage;