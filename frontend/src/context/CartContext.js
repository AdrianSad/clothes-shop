import React, {Component} from 'react';
import {linkData} from "./linkData";

const CartContext = React.createContext();

class CartProvider extends Component {

    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 0,
        links: linkData,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        hidden: false
    }

    constructor(props) {
        super(props);

        // Bind the function to this component, so it has access to this.state
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        this.setState({
            cart: this.getStorageCart(),
        }, () => {
            this.addTotals()
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        let lastScrollTop = 50;
        const currentScrollTop = window.scrollY;

        // Set the state of hidden depending on scroll position
        // We only change the state if it needs to be changed
        if (!this.state.hidden && currentScrollTop > lastScrollTop) {
            this.setState({hidden: true});
        } else if (this.state.hidden && currentScrollTop <= lastScrollTop) {
            this.setState({hidden: false});
        }

        if(!this.state.hidden && this.state.sidebarOpen){
            this.closeSidebar();
        }

        if(!this.state.hidden && this.state.cartOpen){
            this.closeCart();
        }
        //lastScrollTop = currentScrollTop;
    }

    getStorageCart = () => {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }


    getTotals = () => {
        let cartItems = 0;
        let total = 0;

        this.state.cart.forEach(item => {
            total += item.price;
            cartItems += 1;
        })

        let tax = total * 0.23;
        tax = parseFloat(tax.toFixed(2));
        total = parseFloat(total.toFixed(2));
        let subTotal = total - tax;
        subTotal = parseFloat(subTotal.toFixed(2));

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

    addToCart = (product) => {
        let tempCart = [...this.state.cart];
        let tempItem = tempCart.find(item => item.id === product.id);

        if (!tempItem) {
            tempCart = [...tempCart, product];
        } else {
            tempCart = tempCart.filter(item => item.id !== product.id)
        }

        this.setState(() => {
            return {cart: tempCart}
        }, () => {
            this.addTotals();
            this.syncStorage();
            this.openCart();
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

    render() {
        return (
            <CartContext.Provider value={{
                ...this.state,
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                closeSidebar: this.closeSidebar,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addToCart: this.addToCart,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

const CartConsumer = CartContext.Consumer;

export {CartConsumer, CartProvider};