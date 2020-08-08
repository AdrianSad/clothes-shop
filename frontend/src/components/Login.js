import React from 'react';
import {withRouter} from 'react-router-dom';
import Title from "./Title";
import styled from "styled-components";
import {FaTimesCircle, FaUserCircle} from "react-icons/all";
import {UserConsumer} from "../context/UserContext";
import {registerUser} from "../api/user";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {login} from "../api/user";

import { isEmail } from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 5 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 5 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};


const vemail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.toggleMember = this.toggleMember.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",
            loading: false,
            successful: false,
            message: "",
            isMember: !!localStorage.getItem("user")
        };
    }

    toggleMember(){
        this.setState({
            isMember: !this.state.isMember
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleLogin() {

        if (this.checkBtn.context._errors.length === 0) {
            login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    handleRegister() {

        if (this.checkBtn.context._errors.length === 0) {
            registerUser(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.message,
                        successful: true,
                        loading: false,
                        password: ""
                    });
                    this.toggleMember();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        successful: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

     async handleSubmit(e) {
         e.preventDefault();

         this.setState({
             message: "",
             successful: false,
             loading: true
         });

         this.form.validateAll();

        if (this.state.isMember) {
            this.handleLogin();
        } else {
            this.handleRegister();
        }
    };


    render() {

        return (
            <UserConsumer>
                {value => {
                    const {onClose} = value;

                    return <LoginWrapper>
                        <div className="form section">

                            {this.props.showCloseBtn &&
                            <FaTimesCircle className="close" onClick={e => onClose(e)}/>
                            }

                            <FaUserCircle className="avatar"/>

                            <Title center={true} title={this.state.isMember ? "sign in" : "register"}/>
                            <Form className="login-form" onSubmit={this.handleSubmit} ref={c => {
                                this.form = c;
                            }}>

                                <div className="form-input">

                                    <label htmlFor="username">
                                        username
                                    </label>
                                    <Input type="text" id="username" value={this.state.username} className="form-control"
                                           onChange={this.onChangeUsername} validations={[required, vusername]}/>
                                </div>

                                <div className="form-input">
                                    <label htmlFor="password">
                                        password
                                    </label>
                                    <Input type="password" id="password" value={this.state.password} className="form-control"
                                           onChange={this.onChangePassword} validations={[required, vpassword]}/>
                                </div>

                                {!this.state.isMember &&
                                <div className="form-input">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, vemail]}
                                    />
                                </div>
                                }


                                {this.state.message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}

                                <button type="submit" className="main-link submit-link" disabled={this.state.loading}>
                                    {this.state.loading ? (
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : <span>submit</span>}

                                </button>

                                <p className="register-link">
                                    {this.state.isMember ? "need to register" : "already a member"}
                                    <button type="button" onClick={this.toggleMember}>click here</button>
                                </p>

                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />


                            </Form>
                        </div>
                    </LoginWrapper>
                }}
            </UserConsumer>
        );
    }
}

const LoginWrapper = styled.div`

  top: 55%;
  left: 50%;
  position: fixed;
  z-index: 3;
  
.section{
  padding: 4rem 0;
  }
  
@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
@keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}

.form {
  width: 85vw;
  margin: 0 auto;
  max-width: 30rem;
  border-style: solid;
  border-width: 2px;
  //border-radius: 1rem;
  border-color: var(--primaryColor);

  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  text-transform: capitalize;
  background: var(--mainWhite);
}

.close {
  position: absolute;
  right: -1rem;
  top: -1rem;
  color: var(--primaryColor);
  background: var(--mainWhite);
  font-size: 2rem;
  font-weight: bold;
  opacity: 1;
  border-radius: 50%;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

.avatar{
width: 100px;
height: 100px;
color: var(--primaryColor);
border-radius: 50%;
background: var(--mainWhite);
position: absolute;
top: -50px;
left: calc(50% - 50px);
}

.login-form input{
width: 100%;
margin-bottom: 1.25rem;
border: none;
border-bottom: 1px solid var(--primaryColor);
background: transparent;
outline: none;
}

.form-input{
padding: 1rem 1rem;
 -webkit-animation: animatezoom 0.6s;
 animation: animatezoom 0.6s;
}

.submit-link{
  margin: 0;
  position: relative;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}

.form-empty {
  text-align: center;
  color: var(--red);
}
.register-link {
  margin-bottom: 0;
  margin-top: 1rem;
  text-align: center;
}

.register-link button {
  background: transparent;
  border: none;
  color: var(--primaryColor);
  text-transform: capitalize;
  font-size: inherit;
  display: inline-block;
  margin-left: 0.5rem;
  cursor: pointer;
}
`;

export default withRouter(Login);