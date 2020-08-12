import React, {Component} from 'react';
import styled from "styled-components";
import Title from "../components/Title";
import {Link, withRouter} from "react-router-dom";
import {UserConsumer} from "../context/UserContext";

class CompletedCheckout extends Component {
    render() {


        return ( <UserConsumer>{value => {

            const {checkout} = value;

                const {id, status, chargeId, balanceTransaction} = checkout;

                return <CompletedCheckoutWrapper>
                <div className="container main-container">
                    <Title title="Thank you for choosing us!" center/>
                    <div className="my-5 info">
                        <div>
                            <b>ID: </b>{id}
                        </div>
                        <div>
                            <b>Status: </b>{status}
                        </div>
                        <div>
                            <b>Charge ID: </b>{chargeId}
                        </div>
                        <div>
                            <b>Balance Transaction: </b>{balanceTransaction}
                        </div>
                    </div>
                    <div className="row">
                        <Link to="/" className="main-link home-btn">back to home</Link>
                    </div>
                </div>
            </CompletedCheckoutWrapper>
            }}</UserConsumer>
        );
    }
}

// CompletedCheckout.propTypes = {
//     id: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     chargeId: PropTypes.string.isRequired,
//     balanceTransaction: PropTypes.string.isRequired
//
// }

const CompletedCheckoutWrapper = styled.div`
margin: 10rem 0rem 0rem 0rem;
min-height: 75vh;

.main-container{
  background: var(--mainWhite);
  border-radius: 1rem;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07);
  padding: 2rem;
}

.info{
display: block;
}

.home-btn{
text-align: center;
margin: 2rem auto;
}
`
export default withRouter(CompletedCheckout);