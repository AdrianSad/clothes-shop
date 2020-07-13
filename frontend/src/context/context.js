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
        loading: true
    };

    componentDidMount() {



        this.setProducts(items);
    }

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
                openCart: this.openCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};