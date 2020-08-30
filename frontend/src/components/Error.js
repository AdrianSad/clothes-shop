import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

class Error extends Component {
    render() {
        return (
            <ErrorWrapper>
                <div className="container">
                        <h1 className="text-main">{this.props.errorMessage}</h1>
                    <div className="center-link">
                        <Link to="/" className="main-link">Back To Home</Link>
                    </div>
                </div>
            </ErrorWrapper>
        );
    }
}

const ErrorWrapper = styled.div`
margin-top: 10rem;
margin-bottom: 10rem;

h1 {
text-align:center;
}

.center-link{
  display: flex;
  justify-content: center;
}

.main-link{
margin-top: 5rem;
}
`;

export default Error;