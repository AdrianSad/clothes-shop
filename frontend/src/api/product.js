import axios from 'axios';
import {authHeader} from "./user";

const url = "http://localhost:8080";

export default async function submitProduct({title, price, description, size, featured, free_shipping, main_image, image2, image3 }){
    return await axios
        .post(
            `${url}/products`,
            {
                title,
                price,
                description,
                size,
                featured,
                free_shipping,
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