import axios from 'axios';

const url = "http://localhost:8080/auth";

async function registerUser(username, email, password) {

    return await axios.post(`${url}/register`, {
        username,
        email,
        password
    }).catch(error => console.log(error));
}

async function login(username, password) {

    return axios.post(`${url}/login`, {
        username,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }).catch(error => console.log(error));
}

function logout() {
    localStorage.removeItem("user");
}

function getCurrentUser() {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { username: null, token: null };
}

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export {registerUser, login, logout, getCurrentUser, authHeader};