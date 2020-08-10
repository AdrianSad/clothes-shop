import React, {Component} from "react";
import {getCurrentUser} from "../api/user";
import styled from "styled-components";
import {FaUserCircle, FaHeart} from "react-icons/all";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";
import {getUserProducts} from "../api/product";
import Loading from "../components/Loading";
import {UserConsumer} from "../context/UserContext";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (<ProductConsumer>
                {value => {

                    const {favourites} = value;

                    return <UserConsumer>{valueUser => {

                        const {user, userProducts} = valueUser;

                        return <ProfileWrapper>
                            <div className="container">

                                <div className="profile-banner col-12">
                                    <div className="row col-12">
                                        <div className="profile-banner-row col-8">
                                            <FaUserCircle className="avatar profile-banner-block"/>
                                            <h1 className="text-main profile-banner-block">{user.username}</h1>
                                        </div>
                                        <div className="col-4 mt-5 mx-auto">
                                            <Link to="/products/new" className="main-link">add product</Link>
                                        </div>
                                    </div>
                                    <div className="row col-12 my-3">
                                        <h4 className="text-muted">{user.email}</h4>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 my-5">
                                                <h5>Your products : </h5>
                                                {userProducts.length !== 0 ? userProducts.map(item => {
                                                        return <p>
                                                            <Link to={`/products/${item.id}`}>
                                                                {item.title}
                                                            </Link>
                                                        </p>
                                                    })
                                                : <p>No items at the moment :(</p>}
                                        </div>

                                        <div className="col-6 my-5">
                                            <h5><FaHeart className="fav-icon"/>Saved products : {favourites.length}</h5>
                                            {favourites.map(item => {
                                                return <p>
                                                    <Link to={`/products/${item.id}`}>
                                                        {item.title}
                                                        <span className="price">
                                    {item.price}zł
                                </span>
                                                    </Link>

                                                </p>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ProfileWrapper>
                    }}</UserConsumer>
                }}</ProductConsumer>
        );
    }
}

const ProfileWrapper = styled.div`
margin: 10rem 0rem 0rem 0rem;
min-height: 75vh;
.profile-banner{
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
.profile-banner-row{
  line-height: 120px;

}
.profile-banner-block{
    display: inline-block;
vertical-align: middle;
line-height: normal;
margin: 1rem;
}

.avatar{
width: 100px;
height: 100px;
color: var(--primaryColor);
border-radius: 50%;
background: var(--mainWhite);
}

.fav-icon{
margin: 0.5rem;
color: #ff3737;
}

span.price {
  float: right;
  color: green;
}
`;
