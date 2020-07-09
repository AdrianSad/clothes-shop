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

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';


function App() {
  return <>
    <Navbar/>
    <Sidebar/>
    <SideCart/>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/about" exact component={About}/>
      <Route path="/products" exact component={Products}/>
      <Route path="/contact" exact component={Contact}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/product/:id" component={SingleProduct}/>
      <Route component={Default}/>
    </Switch>
    <Footer/>
    </>;
}

export default App;
