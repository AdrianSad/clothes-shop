import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Products from './pages/ProductsPage';
import Contact from './pages/ContactPage';
import SingleProduct from './pages/SingleProductPage';
import Cart from './pages/CartPage';
import Default from './pages/Default';
import Login from './pages/LoginPage'

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';
import {ProductProvider} from "./context";

class App extends React.Component {

    state = {hidden: false};

    constructor(props) {
        super(props);

        // Bind the function to this component, so it has access to this.state
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        // When this component mounts, begin listening for scroll changes
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        // If this component is unmounted, stop listening
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
        //lastScrollTop = currentScrollTop;
    }

    render() {
        return (
            <>
                <Navbar hidden={this.state.hidden}/>
                <Sidebar/>
                <SideCart/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/products" exact component={Products}/>
                    <Route path="/contact" exact component={Contact}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/products/:id" component={SingleProduct}/>
                    <Route component={Default}/>
                </Switch>
                <Footer/>
            </>

        )
    }
}

export default App;
