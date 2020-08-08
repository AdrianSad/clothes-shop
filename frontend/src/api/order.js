import axios from 'axios';

const url = "http://localhost:8080";

export default async function submitOrder({ name, total, items, stripe_token_id, token }) {
    console.log(name, total, items, stripe_token_id, token );
    return await axios
        .post(
            `${url}/orders`,
            {
                name,
                total,
                items,
                stripe_token_id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .catch(error => console.log(error));
}
