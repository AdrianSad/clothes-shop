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
        loading: true,
        search: "",
        price: 0,
        min: 0,
        max: 0,
        size: "ALL",
        shipping: false,
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
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false,
            price: maxPrice,
            max: maxPrice
        }, () => {
            this.addTotals()
        })
    }

    getStorageCart = () => {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }

    getStorageProduct = () => {
        return localStorage.getItem('singleProduct') ? JSON.parse(localStorage.getItem('singleProduct')) : {};
    }

    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.price;
            cartItems += 1;
        })

        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.23;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));

        return {
            cartItems,
            subTotal,
            tax,
            total
        }
    };

    addTotals = () => {
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        })
    };

    syncStorage = () => {
        localStorage.setItem('cart', JSON.stringify(this.state.cart))
    };

    addToCart = (id) => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);

        if (!tempItem) {
            tempItem = tempProducts.find(item => item.id === id);
            let cartItem = {...tempItem};
            tempCart = [...tempCart, cartItem];
        } else {
            tempCart = tempCart.filter(item => item.id !== id)
        }

        this.setState(() => {
            return {cart: tempCart}
        }, () => {
            this.addTotals();
            this.syncStorage();
            this.openCart();
        })
    };

    setSingleProduct = (id) => {
        let product = this.state.storeProducts.find(item => item.id === id);

        localStorage.setItem('singleProduct', JSON.stringify(product));
        this.setState({
            singleProduct: {...product},
            loading: false
        })
    };

    handleSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    };

    handleCart = () => {
        this.setState({cartOpen: !this.state.cartOpen})
    };

    closeCart = () => {
        this.setState({cartOpen: false})
    };

    closeSidebar = () => {
        this.setState({sidebarOpen: false})
    };

    openCart = () => {
        this.setState({cartOpen: true})
    };

    removeItem = (id) => {
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState({
                cart: [...tempCart]
            },
            () => {
                this.addTotals();
                this.syncStorage();
            })

    };

    clearCart = () => {
        this.setState({
                cart: []
            },
            () => {
                this.addTotals();
                this.syncStorage();
            })
    };

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

        if(shipping){
            tempProducts = tempProducts.filter(item => item.freeShipping === true)
        }

        if(search.length > 0){
            tempProducts = tempProducts.filter(item => {
                let searchTemp = search.toLowerCase();
                let tempTitle = item.title.toLowerCase().search(searchTemp);

                if(tempTitle > -1){
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
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                closeSidebar: this.closeSidebar,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addToCart: this.addToCart,
                setSingleProduct: this.setSingleProduct,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                handleChange: this.handleChange,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};