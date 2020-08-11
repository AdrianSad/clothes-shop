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

    checkUserToken = () =>{
        return !!getCurrentUser().token;
    }


    render() {
        return (
            <UserContext.Provider value={{
                ...this.state,
                showModal: this.showModal,
                onClose: this.onClose,
                checkUserToken: this.checkUserToken
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

const UserConsumer = UserContext.Consumer;

export {UserConsumer, UserProvider};