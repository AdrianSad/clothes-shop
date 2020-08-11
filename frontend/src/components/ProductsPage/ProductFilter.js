import React from 'react';
import styled from "styled-components";
import {ProductConsumer} from "../../context/ProductsContext";
import {sizes} from "../../context/sizes";

const ProductFilter = () => {
    return (
        <ProductConsumer>
            {value => {
                const {search, min, max, price, size, shipping, handleChange, handleChangePageSize, pageSize} = value;

                return (
                    <div className="row my-5">
                        <div className="col-10 mx-auto">
                            <FilterWrapper>

                                <div>
                                    <label htmlFor="search">search products</label>
                                    <input type="text" name="search" id="search"
                                           onChange={handleChange}
                                           value={search}
                                           className="filter-item"/>
                                </div>

                                <div>
                                    <label htmlFor="size">size</label>
                                    <select name="size"
                                            id="size"
                                            className="filter-item"
                                            onChange={handleChange}
                                            value={size}>
                                        {
                                            sizes.map((size, index) => {
                                                return <option key={index} value={size}>{size}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="price">
                                        <p className="mb-2">product price : </p>
                                        <span>{price}zł</span>
                                    </label>
                                    <input type="range" name="price" id="price" min={min} max={max}
                                           className="filter-price"
                                           value={price} onChange={handleChange}/>
                                </div>

                                <div>
                                    <label htmlFor="shipping" className="mx-2">free shipping</label>
                                    <input type="checkbox" name="shipping" id="shipping" onChange={handleChange}
                                           checked={shipping && true}/>
                                </div>

                                <div>
                                    <label htmlFor="pageSize" className="mx-2">products per page</label>
                                    <select name="pageSize" id="pageSize" onChange={handleChangePageSize}
                                           className="filter-item" value={pageSize}>
                                        <option value={3}>3</option>
                                        <option value={6}>6</option>
                                        <option value={9}>9</option>
                                    </select>
                                </div>
                            </FilterWrapper>
                        </div>
                    </div>
                )
            }}
        </ProductConsumer>
    );
};

export default ProductFilter;

const FilterWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-column-gap: 2rem;
grid-row-gap: 1rem;
label{
font-weight: bold;
text-transform: capitalize;
}
.filter-item{
display: block;
width: 100%;
background: transparent;
border-radius: 0.5rem;
border: 2px solid var(--darkGrey);
}

.filter-price {
display: block;
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.filter-price::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%; 
  background: var(--primaryColor);
  cursor: pointer;
}

.filter-price::-moz-range-thumb {
  width: 25px;
  height: 20px;
  border-radius: 50%;
  background: var(--primaryColor);
  cursor: pointer;
}
`;
