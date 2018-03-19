-- Drops the bamazon_db if it exist --
DROP DATABASE IF EXISTS bamazon_db;


-- Create a database called bamazon_db --
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(30),
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL
    PRIMARY KEY (id)
);