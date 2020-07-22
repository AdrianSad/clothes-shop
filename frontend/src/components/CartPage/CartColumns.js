import React from 'react';

const CartColumns = () => {
    return (
        <div className="container-fluid text-center d-none d-lg-block my-5">
            <div className="row">

                <div className="col-lg-3">
                    <p className="text-uppercase">products</p>
                </div>

                <div className="col-lg-3">
                    <p className="text-uppercase">name of product</p>
                </div>

                <div className="col-lg-3">
                    <strong className="text-uppercase">price</strong>
                </div>

                <div className="col-lg-3">
                    <p className="text-uppercase">remove</p>
                </div>

            </div>
        </div>
    );
};

export default CartColumns;