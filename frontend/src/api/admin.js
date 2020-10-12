import axios from "axios";
import {authHeader} from "./user";

const url = "http://localhost:8080";

export async function getAllProducts() {
    return await axios.create({
        baseURL: `${url}`,
        headers: {
            "Content-type": "application/json",
        }
    }).get(`/admin/products`, { headers: authHeader() });
}

export async function deleteProduct(id) {
    return await axios.create({
        baseURL: `${url}`,
        headers: {
            "Content-type": "application/json",
        }
    }).delete(`/admin/products/${id}`, { headers: authHeader() });
}

export async function getAllUsers() {
    return await axios.get(url +"/admin/users", { headers: authHeader() });
}