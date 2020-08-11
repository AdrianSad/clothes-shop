import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {UserConsumer} from "../context/UserContext";

const PrivateRoute = ({component: Component, ...rest}) => {


    return (
        <UserConsumer>
            {value => {
                const {user, checkUserToken} = value;
                return <Route {...rest} render={(props) => {
                return checkUserToken ? <Component {...props}/> : <Redirect to="/login"/>;
            }}/>
            }}
        </UserConsumer>
    );
};

export default PrivateRoute;