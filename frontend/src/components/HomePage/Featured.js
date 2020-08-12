import React from 'react';
import Product from "../Product";
import {Link} from 'react-router-dom';
import Title from "../Title";
import {ProductConsumer} from "../../context/ProductsContext";
import Loading from "../Loading";

const Featured = () => {
    return (
        <section className="py-5">
            <div className="container">
                <Title title="featured clothes" center={true}/>


                <ProductConsumer>
                    {value => {
                        const {featuredProducts, loading} = value;

                        if (loading) {
                            return <Loading/>
                        } else {

                            return <div className="row my-5">
                                {featuredProducts.map(product => (
                                <Product key={product.id} product={product}/>
                                ))}
                            </div>
                        }
                    }}
                </ProductConsumer>


                <div className="row mt-5">
                    <div className="col text-center">
                        <Link to="/products" className="main-link">
                            our products
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};


export default Featured;
