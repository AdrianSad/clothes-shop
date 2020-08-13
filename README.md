# Clothes-shop

Spring REST application with a responsive frontend built using ReactJS.
It's a fully operational store where u can buy and sell clothes. Payments are handled by Stripe and PayPal (they are in test mode of course). Everything is stored in relational databases: H2 or PostgreSQL.
Backend is secured by Spring security where we generate JWT for users.

Application is using two dedicated server, one for backend, one for frontend.

## Running Clothes Shop
```
git clone https://github.com/AdrianSad/Clothes-Shop.git
cd clothes-shop
```

Then start the server : 
```
./mvnw spring-boot:run
```

After starting the server you have to install and run frontend : 
```
cd frontend
npm install
npm start
```
## Get Started

In application.properties set the profile and database : 
```
spring.profiles.active=h2
database=h2
```

or

```
spring.profiles.active=postgresql
database=postgresql
```

(Required PostgreSQL database installed)

You can access clothes shop here: http://localhost:3000/

## Preview

Deployed preview on netlify : \
`https://clothes-shop.netlify.app`

### Initialized Users :

#### Admin

login : 
`admin@example.com`

password :
`password`

#### Customer

login : 
`jan@example.com`

password :
`password`

### Test payments :

#### Stripe payment

Test card number : \
`4242 4242 4242 4242`

Name on card, CCV and expiration date doesn't matter.


#### PayPal payment

Sandbox account :

Email ID:\
`sb-kozow2754342@business.example.com`

System Generated Password:\
`"a2=dL48`


## Technologies : 

### Backend :

- Spring MVC
- Spring Security
- Spring Data JPA
- Hibernate


### Frontend :

- React, React Router
- Bootstrap
- HTML, CSS
- npm, webpack

## Functionality overview

`http://localhost:3000/`

![Home Page](https://s7.gifyu.com/images/2020-08-13-1.png)

`http://localhost:3000/products`

![Products Page](https://s7.gifyu.com/images/productsPage.gif)

Single product details

![Single Product Page](https://s7.gifyu.com/images/product69e7d1441e144d79.png)

`http://localhost:3000/products/new`

![New Product Page](https://s7.gifyu.com/images/newProduct.gif)

Login

![Login Page](https://s7.gifyu.com/images/loginPage.gif)






