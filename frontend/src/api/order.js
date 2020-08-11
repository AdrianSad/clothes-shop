import axios from 'axios';

const url = "http://localhost:8080";

export default async function submitOrder({ stripeEmail, amount, stripeToken, token }) {
    return await axios
        .post(
            `${url}/charge`,
            {
                stripeEmail,
                amount,
                stripeToken
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .catch(error => console.log(error));
}
