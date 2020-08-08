import React from 'react';
import {CartConsumer} from "../context/CartContext";
import styled from "styled-components";
import {UserConsumer} from "../context/UserContext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import {
    CardElement,
    StripeProvider,
    Elements,
    injectStripe, CardNumberElement, CardExpiryElement, CardCvcElement
} from "react-stripe-elements";
import submitOrder from "../api/order";
import {
    FaCcVisa,
    FaCcAmex,
    FaCcMastercard,
    FaCcDiscover,
    FaUser,
    FaEnvelope,
    FaAddressCard,
    FaCity,
    FaShoppingCart
} from "react-icons/all";
import Title from "../components/Title";
import {Link} from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vname = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The first name and last name must be between 6 and 40 characters.
            </div>
        );
    }
};

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNameOnCart = this.onChangeNameOnCart.bind(this);
        this.onChangeCreditCardNumber = this.onChangeCreditCardNumber.bind(this);

        this.state = {
            loading: false,
            successful: false,
            message: "",
            name: "",
            nameOnCart: "",
            creditCardNumber: ""
        };
    }


    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCreditCardNumber(e) {
        this.setState({
            creditCardNumber: e.target.value
        });
    }

    onChangeNameOnCart(e) {
        this.setState({
            nameOnCart: e.value
        });
    }

    render() {
        return (
            <CartConsumer>
                {value => {

                    const {cart, cartTotal, clearCart, cartItems} = value;

                    return <UserConsumer>{userValue => {

                        const {user} = userValue;

                        const handleSubmit = async (e) => {
                            e.preventDefault();
                            this.form.validateAll();


                            this.setState({
                                loading: true
                            });

                            const response = await this.props.stripe
                                .createToken()
                                .catch(error => console.log(error));

                            const {token} = response;

                            if (token) {

                                const {id} = token;

                                let order = await submitOrder({
                                    name: this.state.name,
                                    total: cartTotal,
                                    items: cart,
                                    stripe_token_id: id,
                                    token: user.token
                                });

                                if (order) {
                                    this.setState({
                                        message: "",
                                        successful: true,
                                        loading: false
                                    });
                                    clearCart();
                                    this.props.history.push("/profile");
                                    window.location.reload();
                                    return;
                                } else {
                                    this.setState({
                                        message: "There was an error with your order. please try again!",
                                        successful: false,
                                        loading: false
                                    });
                                }
                            } else {
                                this.setState({
                                    message: response.error.message,
                                    successful: false,
                                    loading: false
                                });

                            }
                        }


                        if (cart.length === 0) {
                            return <h1 className="text-title text-center my-5" style={{padding: "10rem"}}>
                                Your cart is currently empty
                            </h1>
                        }

                        return <CheckoutWrapper>

                            <div className="row">
                                <div className="col-75">
                                    <div className="container">

                                        <Title center={true} title="Finalize your purchases"/>

                                        <Form className="checkout-form mt-3" onSubmit={handleSubmit} ref={c => {
                                            this.form = c;
                                        }}>

                                            <div className="row">
                                                <div className="col-50">
                                                    <h3>Billing Address</h3>
                                                    <label htmlFor="fname"><FaUser/> Full
                                                        Name</label>
                                                    <Input type="text" id="fname" name="fullname"
                                                           placeholder="Adrian Małolepszy" onChange={this.onChangeName} validations={[required, vname]}/>
                                                    <label htmlFor="email"><FaEnvelope/> Email</label>
                                                    <input type="text" id="email" name="email"
                                                           placeholder="jan@example.com"/>
                                                    <label htmlFor="adr"><FaAddressCard/> Address</label>
                                                    <input type="text" id="adr" name="address"
                                                           placeholder="542 W. 15th Street"/>
                                                    <label htmlFor="city"><FaCity/> City</label>
                                                    <input type="text" id="city" name="city"
                                                           placeholder="New York"/>

                                                    <div className="row">
                                                        <div className="col-50">
                                                            <label htmlFor="state">State</label>
                                                            <input type="text" id="state" name="state"
                                                                   placeholder="NY"/>
                                                        </div>
                                                        <div className="col-50">
                                                            <label htmlFor="zip">Zip</label>
                                                            <input type="text" id="zip" name="zip"
                                                                   placeholder="10001"/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-50">
                                                    <h3>Payment</h3>
                                                    <label htmlFor="fname">Accepted Cards</label>
                                                    <div className="icon-container">
                                                        <FaCcVisa style={{color: "navy"}}/>
                                                        <FaCcAmex/>
                                                        <FaCcMastercard/>
                                                        <FaCcDiscover/>
                                                    </div>
                                                        <label htmlFor="cname">Name on Card</label>
                                                    <Input type="text" id="cname" name="cardname" value={this.state.nameOnCart} placeholder="Name on card"
                                                           onChange={this.onChangeNameOnCart}/>
                                                    <label  htmlFor="ccnum">Credit card number</label>
                                                    {/*<input type="text" id="ccnum" name="cardnumber"*/}
                                                    {/*       placeholder="1111-2222-3333-4444"/>*/}
                                                    <CardNumberElement onChange={this.onChangeCreditCardNumber} value={this.state.creditCardNumber} id="ccnum"/>
                                                    <label htmlFor="ccexp">Expiration Date</label>
                                                    <CardExpiryElement id="ccexp"/>

                                                    <label htmlFor="cccvc">CVC</label>
                                                    <CardCvcElement id="cccvc"/>
                                                    {/*<div className="row">*/}
                                                    {/*    <div className="col-50">*/}
                                                    {/*        <label htmlFor="expyear">Exp Year</label>*/}
                                                    {/*        <input type="text" id="expyear" name="expyear"*/}
                                                    {/*               placeholder="2021"/>*/}
                                                    {/*    </div>*/}
                                                    {/*    <div className="col-50">*/}
                                                    {/*        <label htmlFor="cvv">CVV</label>*/}
                                                    {/*        <input type="text" id="cvv" name="cvv"*/}
                                                    {/*               placeholder="352"/>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}
                                                </div>

                                            </div>
                                            <label>
                                                <input type="checkbox" checked="checked" name="sameadr"/> Shipping
                                                    address same as billing
                                            </label>
                                            <input type="submit" value={"Pay " + cartTotal + "zł"} className="btn"/>

                                        </Form>
                                    </div>
                                </div>
                                <div className="col-25">
                                    <div className="container">
                                        <h4 className="my-3">Cart <span className="price">
                                            <FaShoppingCart/><b>{cartItems}</b></span></h4>
                                        {cart.map(item => {
                                            return <p><Link to={`/products/${item.id}`}>{item.title}<span className="price">{item.price}</span></Link></p>
                                        })}
                                        <hr/>
                                        <p>Total <span className="price"><b>{cartTotal} zł</b></span></p>
                                    </div>
                                </div>
                            </div>

                        </CheckoutWrapper>
                    }}
                    </UserConsumer>
                }}

            </CartConsumer>
        );
    }
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {

    return <StripeProvider
        apiKey="pk_test_51HC8orFEHOPr8pJCshfalE3vXBksByNDjlSMb9iId2vrVnVvB8Auj6udTvTc54bNC34QFATt0qP8mtPW30BslSlu00VHX0Zm0B">
        <Elements>
            <CardForm/>
        </Elements>
    </StripeProvider>
};



const CheckoutWrapper = styled.div`

padding: 10rem 2rem 2rem 2rem;
* {
  box-sizing: border-box;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  max-width: 150px;
}

.btn {
  background-color: var(--primaryColor);
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}

.StripeElement {
  width: 100%;
  padding: 1rem;
  background: var(--mainWhite);
  //border: 1px solid #ccc;
  //border-radius: 3px;
    margin-bottom: 20px;
    font-weight: bold;
}

                        //margin-top: 400px;
                        //
                        //.section{
                        //    padding: 4rem 0;
                        //}
                        //
                        //@-webkit-keyframes animatezoom {
                        //    from {-webkit-transform: scale(0)}
                        //    to {-webkit-transform: scale(1)}
                        //}
                        //
                        //@keyframes animatezoom {
                        //    from {transform: scale(0)}
                        //    to {transform: scale(1)}
                        //}
                        //
                        //.form {
                        //    width: 85vw;
                        //    margin: 0 auto;
                        //    max-width: 30rem;
                        //    border-style: solid;
                        //    border-width: 2px;
                        //    //border-radius: 1rem;
                        //    border-color: var(--primaryColor);
                        //
                        //    transform: translate(-50%, -50%);
                        //    box-sizing: border-box;
                        //    box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
                        //    text-transform: capitalize;
                        //    background: var(--mainWhite);
                        //}
                        //
                        //.login-form input{
                        //    width: 100%;
                        //    margin-bottom: 1.25rem;
                        //    border: none;
                        //    border-bottom: 1px solid var(--primaryColor);
                        //    background: transparent;
                        //    outline: none;
                        //}
                        //
                        //.form-input{
                        //    padding: 1rem 1rem;
                        //    -webkit-animation: animatezoom 0.6s;
                        //    animation: animatezoom 0.6s;
                        //}
                        //
                        //.submit-link{
                        //    margin - top: 1rem;
                        //    position: relative;
                        //    left: 50%;
                        //    -ms-transform: translateX(-50%);
                        //    transform: translateX(-50%);
                        //}
                        //
                        //.card-element {
                        //    padding: 1rem;
                        //    font-size: 4rem;
                        //}
                        `;

export default StripeWrapper;