import React, {Component} from 'react';
import {getCurrentUser, logout} from "../api/user";

const UserContext = React.createContext();

class UserProvider extends Component {

    state = {
        show: false,
        user: getCurrentUser(),
        checkout: {}
    };

    showModal = () => {
        this.setState({
            show: true
        });
    };

    onClose = (e) => {
            this.setState({
                show: false
            });
    };

    setCheckout = response => {
        this.setState({
            checkout: response
        });
    }

    checkUserToken = () =>{
        return !!getCurrentUser().token;
    }

    userLogout = () => {
        this.setState({
            user: { username: null, token: null }
        });
        logout();
    };


    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                showModal: this.showModal,
                onClose: this.onClose,
                userLogout: this.userLogout,
                checkUserToken: this.checkUserToken,
                setCheckout: this.setCheckout
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

const UserConsumer = UserContext.Consumer;

export {UserConsumer, UserProvider};