import React from 'react';
import {ProductConsumer} from "../../context/ProductsContext";
import styled from "styled-components";
import Title from "../Title";
import Product from "../Product";
import ProductFilter from "./ProductFilter";
import Loading from "../Loading";
import {FaAngleDoubleLeft, FaAngleDoubleRight} from "react-icons/all";

function Products() {
    return (
        <ProductConsumer>
            {value => {
                const {filteredProducts, loading, changePage, page, totalPages, totalItems} = value;

                const btnItems = [];

                for (let i = 0; i< totalPages; i++) {
                    btnItems.push(<button onClick={() => changePage(i)} key={i}
                            className={`page-btn ${page === i && `page-btn-current`}`}>{i + 1}</button>)
                }

                if (loading) {
                    return <Loading/>
                } else {
                    return <section className="py-5">
                        <div className="container">

                            <Title center={true} title="our products"/>

                            <ProductFilter/>

                            <div className="row">
                                <div className="col-10 mx-auto">
                                    <h6 className="text-title">
                                        total products : {totalItems}
                                        <hr/>
                                    </h6>
                                </div>
                            </div>

                            <ProductsWrapper>
                                <div className="row py-5">
                                    {
                                        filteredProducts.length > 0 ? <>

                                                {filteredProducts.map(product => {
                                                    return <Product key={product.id} product={product}/>
                                                })}
                                                 <article className="row col-12 pagination-buttons">
                                                    {page > 0 && <button className="prev-page-btn"
                                                                         onClick={() => changePage(page - 1)}>
                                                        <FaAngleDoubleLeft/>
                                                    </button>
                                                    }

                                                    {btnItems}

                                                    {page < totalPages-1 &&
                                                    <button className="next-page-btn"
                                                            onClick={() => changePage(page + 1)}>
                                                        <FaAngleDoubleRight/>
                                                    </button>
                                                    }
                                                </article>

                                            </>
                                            : <div className="col text-title text-center">
                                                sorry, no items matched your search
                                            </div>
                                    }
                                </div>
                            </ProductsWrapper>
                        </div>
                    </section>
                }
            }}
        </ProductConsumer>
    );

}

const ProductsWrapper = styled.div`
.pagination-buttons {
  width: var(85vw);
  max-width: var(1170px);
  margin: 2rem auto;
  padding-bottom: 2rem;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.page-btn,
.prev-page-btn,
.next-page-btn {
  margin: 0.5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  background: transparent;
  transition: var(--mainTransition);
  font-size: 1.2rem;
  color: var(--primaryColor);
  border: none;
}
.page-btn:hover {
  background: var(--primaryColor);
  color: var(--mainWhite);
}
.page-btn-current {
  background: var(--primaryColor);
  color: var(--mainWhite);
}
.prev-page-btn,
.next-page-btn {
  border: none;
  color: var(--primaryColor);
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  transition: var(--mainTransition);
}
.prev-page-btn:hover,
.next-page-btn:hover {
  background: var(--primaryColor);
  color: var(--mainWhite);
}
`;

export default Products;