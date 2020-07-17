import React from 'react';
import {ProductConsumer} from "../../context";
import styled from "styled-components";
import Title from "../Title";
import Product from "../Product";

function Products() {
    return (
        <ProductConsumer>
            {value => {
                const {filteredProducts} = value;

                return <section className="py-5">
                    <div className="container">

                        <Title center={true} title="our products"/>

                        <div className="row py-5 px-5">
                            {filteredProducts.map(product => {
                                return <Product key={product.id} product={product}/>
                            })}
                        </div>

                    </div>
                </section>
            }}
        </ProductConsumer>
    );
}

export default Products;