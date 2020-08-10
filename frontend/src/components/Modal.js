import React from "react";
import styled from "styled-components";
import {UserConsumer} from "../context/UserContext";
import LoginPage from "./Login";

export default function Modal() {

    return (
        <UserConsumer>
            {value => {

                const {show, onClose} = value;

                if (show) {
                    return (<>
                            <ModalWrapper onClick={onClose}/>


                            <LoginPage showCloseBtn={true}/>

                        </>
                    );
                }
            }}
        </UserConsumer>
    );

}

const ModalWrapper = styled.div`
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;

`;

