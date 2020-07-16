import React, {Component} from "react";
import {linkData} from "./linkData";
import {socialData} from "./socialData";
import {items} from "./productData";

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 0,
        links: linkData,
        socialLinks: socialData,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: false
    };

    componentDidMount() {



        this.setProducts(items);
    }

    setProducts = (products) => {
        let featuredProducts = items.filter(item => item.featured === true);

        this.setState({
            filteredProducts: featuredProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false
        })
    }

    getStorageCart = () => {
        return [];
    }

    getStorageProduct = () => {
        return [];
    }

    getTotals = () => {};

    addTotals = () => {};

    syncStorage = () => {};

    addToCart = (id) => {};

    setSingleProduct = (id) => {};

    handleSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    };

    handleCart = () => {
        this.setState({cartOpen: !this.state.cartOpen})
    };

    closeCart = () => {
        this.setState({cartOpen: false})
    };

    openCart = () => {
        this.setState({cartOpen: true})
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addToCart: this.addToCart,
                setSingleProduct: this.setSingleProduct
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};