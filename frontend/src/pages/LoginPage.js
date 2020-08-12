import React from 'react';
import Login from "../components/Login";
import LoginBG from "../images/loginBG.jpg";
import Hero from "../components/Hero";
import {UserConsumer} from "../context/UserContext";

const LoginPage = () => {
    return (
        <UserConsumer>{value => {
            // const {user} = value;
            // if(user.token){
            //     return <Redirect to="/profile"/>
            // }
            return <>
            <Hero img={LoginBG} max="true"/>
            <Login showCloseBtn={false}/>
            </>
        }}
        </UserConsumer>
    );
};

export default LoginPage;