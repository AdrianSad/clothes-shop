import React, {Component} from "react";
import {items} from "./productData";
import {getAllFeatured, getAllFiltered} from "../api/product";

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        filteredProducts: [],
        featuredProducts: [],
        loading: true,
        search: "",
        price: 0,
        min: 0,
        max: 500,
        size: "ALL",
        shipping: false,
        page: 0,
        pageSize: 3,
        totalPages: 0,
        totalItems: 0,
        favourites: localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : []
    };

    componentDidMount() {

        this.retrieveFilteredProducts();
        this.retrieveFeaturedProducts();
    }

    retrieveFeaturedProducts() {
        getAllFeatured().then(response => {
            if(response) {

                const tempProducts = response.data;


                if (tempProducts) {
                    tempProducts.map(item => {
                        return item.main_image = items.find(item2 => item.id === item2.id).main_image;
                    });

                    this.setState({
                        featuredProducts: tempProducts,
                        loading: false
                    })
                } else {
                    this.setState({
                        featuredProducts: [],
                        loading: false
                    })
                }
            }
            return;
        });
    }

    retrieveFilteredProducts() {
        let params = {};

        params["page"] = this.state.page;
        params["size"] = this.state.pageSize;
        params["title"] = this.state.search;
        params["freeShipping"] = this.state.shipping;
        params["price"] = this.state.price;
        params["pSize"] = this.state.size;

        getAllFiltered(params).then(response => {
            if(response) {
                const {totalPages, products, totalItems} = response.data;

                // SETTING IMAGE FOR INITIALIZED PRODUCTS
                const tempProducts = products;
                if (tempProducts) {
                    products.map(item => {
                        if (item.id < 7) {
                            return item.main_image = items.find(item2 => item.id === item2.id).main_image;
                        }
                    });

                    this.setState({
                        totalPages: totalPages,
                        filteredProducts: tempProducts,
                        loading: false,
                        totalItems: totalItems
                    })
                } else {

                    this.setState({
                        totalPages: 0,
                        filteredProducts: [],
                        loading: false,
                        totalItems: 0
                    })
                }
            }
        })
    }

    changePage = (index) => {
        this.setState({
            page: index,
            loading: true
        }, () => this.retrieveFilteredProducts())
    };

    handleChangePageSize = (event) => {
        this.setState(
            {
                pageSize: event.target.value,
                page: 0
            },
            () => this.retrieveFilteredProducts()
        );
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        this.setState({
            [name]: value
        }, () => this.retrieveFilteredProducts()
    );
    };

    // sortData = () => {
    //     const {storeProducts, price, size, shipping, search} = this.state;
    //     let tempProducts = [...storeProducts];
    //
    //     let tempPrice = parseInt(price);
    //     tempProducts = tempProducts.filter(item => item.price <= tempPrice);
    //
    //     if (size !== "ALL") {
    //         tempProducts = tempProducts.filter(item => item.size === size);
    //
    //     }
    //
    //     if (shipping) {
    //         tempProducts = tempProducts.filter(item => item.freeShipping === true)
    //     }
    //
    //     if (search.length > 0) {
    //         tempProducts = tempProducts.filter(item => {
    //             let searchTemp = search.toLowerCase();
    //             let tempTitle = item.title.toLowerCase().search(searchTemp);
    //
    //             if (tempTitle > -1) {
    //                 return item;
    //             }
    //         })
    //     }
    //
    // };

    addToFavourites = (product) => {

        let tempFav = [...this.state.favourites];
        let tempItem = tempFav.find(item => item.id === product.id);

        if (!tempItem) {
            tempFav = [...tempFav, product];
        } else {
            tempFav = tempFav.filter(item => item.id !== product.id)
        }

        this.setState({
            favourites: tempFav
        }, () => localStorage.setItem("favourites", JSON.stringify(this.state.favourites)));
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleChange: this.handleChange,
                changePage: this.changePage,
                addToFavourites: this.addToFavourites,
                handleChangePageSize: this.handleChangePageSize
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};