DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users_roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS roles;
DROP SEQUENCE IF EXISTS hibernate_sequence;

CREATE SEQUENCE hibernate_sequence START 3;

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(80) NOT NULL,
    phone VARCHAR(15),
    UNIQUE (email),
    UNIQUE (username)
);

CREATE TABLE orders
(
    order_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    total FLOAT(2) NOT NULL,
    stripe_token_id VARCHAR(50) NOT NULL,
    UNIQUE (stripe_token_id)
);


CREATE TABLE products
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    price FLOAT(2) NOT NULL,
    username VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    size VARCHAR(4) NOT NULL,
    featured BOOLEAN NOT NULL,
    free_shipping BOOLEAN NOT NULL,
    order_id INTEGER,
    main_image text,
    image2 text,
    image3 text
);

CREATE TABLE roles
(
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    UNIQUE (name)
);

CREATE TABLE users_roles
(
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL
);