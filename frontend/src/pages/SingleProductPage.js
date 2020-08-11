import React from "react";
import {Link} from 'react-router-dom';
import Hero from '../components/Hero';
import cartBG from '../images/cartBG.jpg';
import {ProductConsumer} from "../context/ProductsContext";
import Loading from "../components/Loading";
import {CartConsumer} from "../context/CartContext";
import ImageGallery from 'react-image-gallery';
import styled from "styled-components";
import {FaShippingFast, FaHeart} from "react-icons/all";
import inpost_logo from "../images/inpost_logo.svg"
import {getProduct} from "../api/product";
import {items} from "../context/productData";
import { withRouter } from "react-router";

class SingleProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            singleProduct: {},
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        getProduct(id).then(response => {
            if(response) {
                console.log(response);
                if (response.data) {
                    const tempProduct = response.data;
                    if (tempProduct.id < 7) {
                        tempProduct.main_image = `../${items.find(item => item.id === tempProduct.id).main_image}`;
                    }

                    this.setState({
                        singleProduct: tempProduct,
                        loading: false
                    });
                }
            }
        });
    }

    render() {


        if(this.state.loading){
            return <Loading/>
        } else {
            return (
                <>
                    {/*<Hero img={cartBG} title="product details"/>*/}
                    <ProductConsumer>
                        {value => {
                            const {addToFavourites, favourites} = value;

                            const {username, description, price, title, size, main_image, image2, image3} = this.state.singleProduct;

                            return <CartConsumer>{valueCart => {

                                const {addToCart} = valueCart;

                                let images;

                                if (image2 && image3) {
                                    images = [
                                        {
                                            original: main_image,
                                            thumbnail: main_image,
                                            thumbnailClass: "img-thumbnail",
                                            originalClass: "img-fluid"
                                        }
                                        , {
                                            original: image2,
                                            thumbnail: image2,
                                            thumbnailClass: "img-thumbnail",
                                            originalClass: "img-fluid"
                                        },
                                        {
                                            original: image3,
                                            thumbnail: image3,
                                            thumbnailClass: "img-thumbnail",
                                            originalClass: "img-fluid"
                                        }
                                    ];
                                } else if (image2) {
                                    images = [{
                                        original: main_image,
                                        thumbnail: main_image,
                                        thumbnailClass: "img-thumbnail",
                                        originalClass: "img-fluid"
                                    }
                                        , {
                                            original: image2,
                                            thumbnail: image2,
                                            thumbnailClass: "img-thumbnail",
                                            originalClass: "img-fluid"
                                        }];
                                } else {
                                    images = [{
                                        original: main_image,
                                        thumbnail: main_image,
                                        thumbnailClass: "img-thumbnail",
                                        originalClass: "img-fluid"
                                    }];
                                }

                                return <ProductWrapper>
                                    <section className="py-5 product-container">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-10 mx-auto col-sm-6 col-md-6 col-lg-4 my-3">
                                                    <h3 className="text-title mb-4">{title}</h3>
                                                    <hr/>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div
                                                    className="col-12 mx-auto col-sm-12 col-md-6 col-lg-6 my-3 left-container offset-1">
                                                    {/*<img src={`../${main_image}`} alt="single product" className="img-fluid product-img"/>*/}
                                                    <ImageGallery items={images} showPlayButton={false}
                                                                  thumbnailPosition="right"/>
                                                </div>

                                                <div
                                                    className="col-12 mx-auto col-sm-6 col-md-4 col-lg-4 my-3 middle-container">
                                                    <h5 className="text-capitalize text-muted mb-4">Added
                                                        by {username}</h5>
                                                    <h5 className="text-capitalize text-main mb-4">Size : {size}</h5>
                                                    <p className="text-capitalize text-title mt-5">Description :</p>
                                                    <p>{description}</p>

                                                    <Link to='/products' className="main-link"
                                                          style={{margin: "0.75rem"}}>back
                                                        to products</Link>
                                                </div>

                                                <div
                                                    className="col-10 mx-auto col-sm-6 col-md-4 col-lg-2 my-3 offset-1">
                                                    <div className="row right-container">
                                                        <h2 className="text-capitalize text-main mb-4">Price
                                                            : {price}zł</h2>
                                                        <button type="button" className="main-link"
                                                                style={{margin: "0.75rem"}}
                                                                onClick={() => {
                                                                    addToCart(this.state.singleProduct)
                                                                }}>add to cart
                                                        </button>
                                                        <h6 className="text-capitalize my-3">

                                                            <button
                                                                className={favourites.find(item => item.id === this.state.singleProduct.id) ? "mx-1 fav-btn" : "mx-1 fav-btn-muted"}
                                                                onClick={() => addToFavourites(this.state.singleProduct)}>
                                                                <FaHeart/>
                                                            </button>
                                                            {favourites.find(item => item.id === this.state.singleProduct.id) ? "Added" : "add to favourites"}
                                                        </h6>
                                                    </div>

                                                    <div className="row right-container my-5">
                                                        <h5 className="text-capitalize mb-4">Delivery method</h5>
                                                        <div className="methods">
                                                            <div className="method">
                                                                <FaShippingFast/> Courier
                                                            </div>
                                                            <div>
                                                                <p className="text-muted">1-3 days 14.99zł</p>
                                                            </div>
                                                            <div className="method">
                                                                <img className="inpost" src={inpost_logo}
                                                                     alt="Inpost"/> Parcel locker
                                                            </div>
                                                            <div>
                                                                <p className="text-muted">2-4 days 9.99zł</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </ProductWrapper>
                            }}</CartConsumer>

                        }}
                    </ProductConsumer>
                </>
            )
        }
    }
}

const ProductWrapper = styled.div`
.product-container{
margin-top: 5rem;
}
.right-container{
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
  //margin-top: 2rem;
  //max-width: 15vw;
  text-align: center;
  display: block;
  
  .method{
  vertical-align: center;
  }
  
  .methods{
  text-align: left;
  }
  
  .inpost{
  width: 3.25rem;
  height: 3.25rem;
  }
}

.middle-container{
min-width: 20vw;
}

.left-container{
   width: 100%;
  height: auto;
  /* Magic! */
  max-width: 30vw;
}

@media (max-width: 767px) {        
   .left-container{
      max-width: 100vw;
   }
}

.fav-btn{
  cursor: pointer;
  background: transparent;
  transition: var(--mainTransition);
  border: none;
  color: #ff3737;
  font-size: 1.5rem;
  outline: none;
}

.fav-btn-muted{
cursor: pointer;
  background: transparent;
  transition: var(--mainTransition);
  border: none;
  color: #8d8d8d;
  font-size: 1.5rem;
  outline: none;
}

.fav-btn:hover,
.fav-btn-muted:hover{
transform: scale(1.5);
}
`;

export default withRouter(SingleProductPage);
