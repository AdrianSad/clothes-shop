import React from 'react';
import loading from '../images/loading.gif'
import Title from "./Title";
import styled from "styled-components";

const Loading = () => {
    return (
        <LoadingWrapper>
            <div className="loading">
                <Title center={true} title="Loading..."/>
                <img src={loading} alt="Loading gif"/>
            </div>
        </LoadingWrapper>
    );
};

const LoadingWrapper = styled.div`
.loading {
  margin-top: 12rem;
  text-align: center;
}
.loading img {
  width: 12rem;
  margin: 4rem auto;
}
`;

export default Loading;