import React, {Component} from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {FaSearchPlus, FaCartPlus, FaStar} from "react-icons/fa";
import {ProductConsumer} from "../context";
import {Lightbox} from "react-modal-image";
import * as PropTypes from "prop-types";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    closeLightbox = () => {
        this.setState({
            open:false
        });
    };

    render() {
        let {product} = this.props;

        return <ProductConsumer>
            {value => {
                const {addToCart, setSingleProduct} = value;

                return (
                    <>
                        {this.state.open && (
                            <Lightbox
                                large={product.image}
                                alt={product.title}
                                hideZoom={true}
                                hideDownload={true}
                                onClose={this.closeLightbox}
                            />
                        )}

                        <ProductWrapper featured={product.featured}
                                        className="col-10 mx-auto col-sm-8 col-md-6 col-lg-4 my-3 px-4">
                            <div className="card">

                                <div className="img-container">
                                    <Link to={`/products/${product.id}`}
                                          onClick={() => setSingleProduct(product.id)}>
                                        <img src={product.image} className="card-img-top" alt="product image"
                                             style={{height: '320px'}}/>

                                    </Link>
                                </div>

                                <div className="product-icons">

                                    <FaSearchPlus className="icon" onClick={() => this.setState({open: true})}/>

                                    <FaCartPlus className="icon" onClick={() => addToCart(product.id)}/>
                                </div>
                                <div className="card-body d-flex justify-content-between">
                                    <p className="mb-0">{product.title}</p>
                                    <p className="mb-0 text-main text-price">{product.price} zł</p>
                                </div>

                                {product.featured ?
                                    <p className="feature-text">
                                        Featured
                                    </p> : ""
                                }

                            </div>
                        </ProductWrapper>
                    </>
                )
            }}
        </ProductConsumer>
    }
};

Product.propTypes = {product: PropTypes.any}

const ProductWrapper = styled.div`

.card{
transition: var(--mainTransition);
height: 100%;
}

.card:hover{
box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
cursor: pointer;
transform: scale(1.05);
}

.img-container{
position: relative;
}

.feature-text{
position: absolute;
text-align: center;
top: 0;
left: 0;
padding: 0.5rem 0.5rem;
font-size: 1.25rem;
color: var(--mainWhite);
background: rgba(236,151,6,0.5);
border-bottom-right-radius: 0.5rem;
}

.product-icons{
transition: var(--mainTransition);
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
opacity: 0;
}

.icon{
font-size: 2.5rem;
margin: 1rem;
padding: 0.5rem;
color: var(--primaryColor);
background: var(--mainBlack);
border-radius: 0.5rem;
}

.card:hover .product-icons{
opacity: 1;
}

.card-img-top{
transition: var(--mainTransition);
}

.card:hover .card-img-top{
opacity: 0.7;
}

.card-body{
font-weight: bold;
}

.text-price {
text-overflow: ellipsis; 
overflow: visible;
white-space: nowrap;
}
`;
