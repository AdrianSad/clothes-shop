import React, {Component} from 'react';
import styled from "styled-components";
import {deleteProduct, getAllProducts} from "../../api/admin";
import Loading from "../Loading";
import Error from "../Error";
import {items} from "../../context/productData";
import {Link} from "react-router-dom";

class ManageProducts extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            products: [],
            loading: true,
            errorMessage: ""
        };
    }

    deleteItem(id) {
        deleteProduct(id).then(window.location.reload(false)).catch(error => console.log(error));
    }

    componentDidMount() {
        getAllProducts().then(response => {
            if (response) {
                if (response.data) {
                    const tempProduct = response.data;
                    if (tempProduct) {
                        tempProduct.map(item => {
                            return item.main_image = `../${items.find(item2 => item.id === item2.id).main_image}`;
                        });
                    }
                    this.setState({
                        products: tempProduct,
                        loading: false,
                        errorMessage: ""
                    });
                }
            }
        })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                    errorMessage: `${error.response.data.error}`
                })
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        if (this.state.errorMessage.length > 0) {
            return <Error errorMessage={this.state.errorMessage}/>
        } else return (
            <ProductsWrapper>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Username</th>
                    <th>Delete item</th>
                    <th>Show item</th>
                </tr>
                {this.state.products.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td><img src={item.main_image} alt="miniature" width="60" className="img-thumbnail"/></td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.username}</td>
                        <td>
                            <button className="btn btn-outline-danger text-capitalize mb-4"
                                    onClick={() => this.deleteItem(item.id)}>delete
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-outline-info text-capitalize mb-4"><Link to={`/products/${item.id}`}>show</Link></button>
                        </td>
                    </tr>
                )}
                </tbody>
            </ProductsWrapper>
        );
    }
}

const ProductsWrapper = styled.table`
 width: 100%;
 background: var(--mainWhite);
 border-collapse: collapse;

 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--primaryColorDark);
  color: white;
}
 
 tr:nth-child(even){background-color: #f2f2f2;}
 tr:hover {background-color: #ddd;}
 
`

export default ManageProducts;