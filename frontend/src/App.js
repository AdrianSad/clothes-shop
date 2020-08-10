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
import Login from './components/Login'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';
import Modal from "./components/Modal";
import Profile from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
import NewProduct from "./pages/NewProduct";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Modal/>
                <Navbar/>
                <Sidebar/>
                <SideCart/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/products" exact component={Products}/>
                    <Route path="/contact" exact component={Contact}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <PrivateRoute path="/checkout" component={Checkout}/>
                    <PrivateRoute path="/products/new" component={NewProduct}/>
                    <Route path="/register" exact component={LoginPage}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/products/:id" component={SingleProduct}/>
                    <Route component={Default}/>
                </Switch>
                <Footer/>
            </Router>

        )
    }
}

export default App;
