import React from 'react';
import {CartConsumer} from "../context/CartContext";
import styled from "styled-components";
import {UserConsumer} from "../context/UserContext";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Redirect, withRouter} from 'react-router-dom';

import {
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

        this.state = {
            loading: false,
            successful: false,
            message: "",
            name: "",
            nameOnCart: "",
            response: {},
            redirect: false
        };
    }


    onChangeName(e) {
        this.setState({
            name: e.target.value
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

                        const {user, setCheckout} = userValue;

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
                                    stripeEmail: user.email,
                                    amount: cartTotal * 100,
                                    items: cart,
                                    stripeToken: id,
                                    token: user.token
                                });


                                if (order) {

                                    this.setState({
                                        message: "",
                                        successful: true,
                                        loading: false,
                                        response: order.data,
                                        redirect: true
                                    }, () => {
                                        setCheckout(this.state.response);

                                        clearCart();

                                    });


                                    // this.props.history.push("/products");
                                    // window.location.reload();

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


                        if (this.state.redirect) {
                            return <Redirect to="/success"/>;
                        } else if (cart.length === 0) {
                            return <h1 className="text-title text-center my-5" style={{padding: "10rem"}}>
                                Your cart is currently empty
                            </h1>
                        } else return <CheckoutWrapper>

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
                                                           placeholder="Adrian Małolepszy" onChange={this.onChangeName}
                                                           validations={[required, vname]}/>
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
                                                    <Input type="text" id="cname" name="cardname"
                                                           value={this.state.nameOnCart} placeholder="Name on card"
                                                           onChange={this.onChangeNameOnCart}/>
                                                    <label htmlFor="ccnum">Credit card number</label>

                                                    <CardNumberElement id="ccnum"/>
                                                    <label htmlFor="ccexp">Expiration Date</label>
                                                    <CardExpiryElement id="ccexp"/>

                                                    <label htmlFor="cccvc">CVC</label>
                                                    <CardCvcElement id="cccvc"/>

                                                </div>

                                            </div>
                                            <label>
                                                <input type="checkbox" checked="checked" name="sameadr"/> Shipping
                                                address same as billing
                                            </label>

                                            {
                                                this.state.message.length > 0 ?
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.message}
                                                    </div>
                                                    : null
                                            }

                                            <input type="submit" value={"Pay " + cartTotal + "zł"} className="btn"/>

                                        </Form>
                                    </div>
                                </div>
                                <div className="col-25">
                                    <div className="container">
                                        <h4 className="my-3">Cart <span className="price">
                                            <FaShoppingCart/><b>{cartItems}</b></span></h4>
                                        {cart.map(item => {
                                            return <p key={item.id}><Link to={`/products/${item.id}`}
                                                                          key={item.id}>{item.title}<span
                                                className="price" key={item.id}>{item.price}</span></Link></p>
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
        apiKey={process.env.REACT_APP_STRIPE}>
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

`;

export default withRouter(StripeWrapper);