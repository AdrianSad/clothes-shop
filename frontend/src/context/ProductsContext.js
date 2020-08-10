import React, {Component} from "react";
import {socialData} from "./socialData";
import {items} from "./productData";
import {getProducts} from "../api/product";

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
        shipping: false,
        page: 0,
        favourites: []
    };

    componentDidMount() {

        let tempProducts;

        getProducts().then(response => {
            tempProducts = response.data
            tempProducts.map(item => {
                return item.main_image = items.find(item2 => item.id === item2.id).main_image;
            }, this.setProducts(tempProducts));
        });


    }

    paginate = (products) => {

        const productsPerPage = 3;
        const numberOfPages = Math.ceil(products.length / productsPerPage);

        // const newProducts = Array.from({length:numberOfPages}, () => {
        //    return products.splice(0,productsPerPage);
        // });

        return Array.from({length: numberOfPages}, (_, index) => {
            const start = index * productsPerPage;
            return products.slice(start, start + productsPerPage);
        });
    };

    changePage = (index) => {
        this.setState({
            page: index
        })
    };

    setProducts = (products) => {
        let featuredProducts = products.filter(item => item.featured === true);

        let maxPrice = Math.max(...products.map(item => item.price))

        this.setState({
            filteredProducts:  this.paginate(products),
            storeProducts: products,
            featuredProducts,
            loading: false,
            price: maxPrice,
            max: maxPrice,
            favourites: localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : []
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
            tempProducts = tempProducts.filter(item => item.free_shipping === true)
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
            page: 0,
            filteredProducts: this.paginate(tempProducts)
        })
    };

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
        },() => localStorage.setItem("favourites", JSON.stringify(this.state.favourites)));
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleChange: this.handleChange,
                changePage: this.changePage,
                addToFavourites: this.addToFavourites,
                findInFavourites: this.findInFavourites
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};