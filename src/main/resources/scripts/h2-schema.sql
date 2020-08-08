DROP TABLE IF EXISTS products;

CREATE TABLE users
(
    user_id INTEGER IDENTITY PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(80) NOT NULL,
    phone VARCHAR(15),
    UNIQUE (email),
    UNIQUE (username)
);

CREATE TABLE orders
(
    order_id INTEGER IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    total FLOAT(2) NOT NULL,
    stripe_token_id VARCHAR(50) NOT NULL,
    UNIQUE (stripe_token_id)
);


CREATE TABLE products
(
id INTEGER IDENTITY PRIMARY KEY,
title VARCHAR(80) NOT NULL,
price FLOAT(2) NOT NULL,
user_id INTEGER NOT NULL,
description TEXT NOT NULL,
size VARCHAR(4) NOT NULL,
featured BOOLEAN NOT NULL,
free_shipping BOOLEAN NOT NULL,
order_id INTEGER,
main_image LONGBLOB,
image2 LONGBLOB,
image3 LONGBLOB
);

CREATE TABLE roles
(
    role_id INTEGER IDENTITY PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    UNIQUE (name)
);

CREATE TABLE users_roles
(
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL
);