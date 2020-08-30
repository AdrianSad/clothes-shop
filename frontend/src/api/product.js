import axios from 'axios';
import {authHeader} from "./user";

const url = "http://localhost:8080";

export default async function submitProduct({title, price, description, size, featured, freeShipping, main_image, image2, image3 }){
    return await axios
        .post(
            `${url}/products`,
            {
                title,
                price,
                description,
                size,
                featured,
                freeShipping,
                main_image,
                image2,
                image3
            },
            {
                headers: authHeader()
            }
        )
        .catch(error => console.log(error));
}


export async function getUserProducts(){
    return await axios
        .get(
            `${url}/products/user`,
            {
                headers: authHeader()
            }
        )
        .catch(error => console.log(error));
}

export async function getAllFiltered(params) {
    return await axios.create({
        baseURL: `${url}`,
        headers: {
            "Content-type": "application/json"
        }
    }).get(`/products`, {params})
        .catch(error => console.log(error));
}

export async function getAllFeatured() {
    return await axios.create({
        baseURL: `${url}`,
        headers: {
            "Content-type": "application/json"
        }
    }).get(`/products/featured`)
        .catch(error => console.log(error));
}

export async function getProduct(id){
    return await axios
        .get(
            `${url}/products/${id}`,
            {
                "Content-type": "application/json"
            }
        )}