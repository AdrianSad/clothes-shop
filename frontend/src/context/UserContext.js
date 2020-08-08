import React, {Component} from 'react';
import {getCurrentUser, logout} from "../api/user";

const UserContext = React.createContext();

class UserProvider extends Component {

    state = {
        show: false,
        user: getCurrentUser()
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

    userLogin = user => {
        this.setState({
           user: user
        });
    };

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
                userLogin: this.userLogin,
                userLogout: this.userLogout
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

const UserConsumer = UserContext.Consumer;

export {UserConsumer, UserProvider};