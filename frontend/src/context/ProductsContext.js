import React, {Component} from "react";
import {linkData} from "./linkData";
import {socialData} from "./socialData";
import {items} from "./productData";

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        socialLinks: socialData,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        loading: true,
        search: "",
        price: 0,
        min: 0,
        max: 0,
        size: "ALL",
        shipping: false
    };

    componentDidMount() {

        // const url = "/api/products";
        //
        // fetch(url)
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json);
        //     });

        this.setProducts(items);
    }

    setProducts = (products) => {
        let featuredProducts = products.filter(item => item.featured === true);

        let maxPrice = Math.max(...products.map(item => item.price))

        this.setState({
            filteredProducts: products,
            storeProducts: products,
            featuredProducts,
            loading: false,
            price: maxPrice,
            max: maxPrice
        })
    }


    handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        this.setState({
                [name]: value
            }, this.sortData
        );
    };

    sortData = () => {
        const {storeProducts, price, size, shipping, search} = this.state;
        let tempProducts = [...storeProducts];

        let tempPrice = parseInt(price);
        tempProducts = tempProducts.filter(item => item.price <= tempPrice);

        if (size !== "ALL") {
            tempProducts = tempProducts.filter(item => item.size === size);

        }

        if (shipping) {
            tempProducts = tempProducts.filter(item => item.freeShipping === true)
        }

        if (search.length > 0) {
            tempProducts = tempProducts.filter(item => {
                let searchTemp = search.toLowerCase();
                let tempTitle = item.title.toLowerCase().search(searchTemp);

                if (tempTitle > -1) {
                    return item;
                }
            })
        }

        this.setState({
            filteredProducts: tempProducts
        })
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};