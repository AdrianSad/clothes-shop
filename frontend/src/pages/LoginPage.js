import React from 'react';
import {useHistory} from 'react-router-dom';
import Title from "../components/Title";
import styled from "styled-components";

const LoginPage = () => {
    const history = useHistory();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('default');
    const [isMember, setIsMember] = React.useState(false);

    let isEmpty = true;

    const toggleMember = () => {
    };

    const handleSubmit = async (e) => {
    };

    return (
        <LoginWrapper>
            <div className="form section">
            <Title center={true} title={isMember ? "sign in" : "register"}/>
            <form className="login-form">

                <div className="form-control">
                    <label htmlFor="email">
                        email
                    </label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="password">
                        password
                    </label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                {!isMember &&
                <div className="form-control">
                    <label htmlFor="username">
                        username
                    </label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                }

                {isEmpty &&
                    <p className="form-empty">
                        please fill out all form fields
                    </p>
                }

                {!isEmpty &&
                    <button type="submit" className="main-link" onClick={handleSubmit}>
                        submit
                    </button>
                }

                <p className="register-link">
                    {isMember ? "need to register" : "already a member"}
                    <button type="button" onClick={toggleMember}>click here</button>
                </p>

            </form>
            </div>
        </LoginWrapper>
    );
};

const LoginWrapper = styled.section`
.section{
  padding: 8rem 0;
  }
.form {
  width: 85vw;
  margin: 0 auto;
  max-width: 40rem;
}
.login-form{
  background: var(--mainWhite);
  padding: 1.25rem 1rem;
  text-transform: capitalize;
  border-radius: 0.5rem;
  box-shadow: 2px 5px 3px 0px rgba(0, 0, 0, 0.5);
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--darkGrey);
  margin-bottom: 1.25rem;
  padding: 0.5rem;
  font-size: 1.2rem;
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

export default LoginPage;