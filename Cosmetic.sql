CREATE DATABASE Cosmetic;

USE Cosmetic;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    phone_number VARCHAR(12) UNIQUE NOT NULL,
    address VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE SaleEvent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    discount_percentage INT,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE Item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500),
    price DECIMAL(10, 2),
    brand VARCHAR(100),
    category VARCHAR(100),
    ingredients LONGTEXT,
    quantity INT,
    product_information LONGTEXT,
    use_information LONGTEXT,
    specifications LONGTEXT,
    is_on_sale BOOLEAN DEFAULT FALSE,
    sale_event_id INT,  -- A foreign key referencing the "SaleEvent" table
    FOREIGN KEY (sale_event_id) REFERENCES SaleEvent(id)
);

CREATE TABLE Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,  -- A foreign key referencing the "User" table
    item_id INT,  -- A foreign key referencing the "Item" table
    quantity INT
);

CREATE TABLE `Order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,  -- A foreign key referencing the "User" table
    order_date DATETIME,
    total_amount DECIMAL(10, 2)
);

CREATE TABLE OrderItem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,  -- A foreign key referencing the "Order" table
    item_id INT,   -- A foreign key referencing the "Item" table
    quantity INT
);

CREATE TABLE Receipt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,  -- A foreign key referencing the "Order" table
    payment_method VARCHAR(50)
);

CREATE TABLE Admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE ProfitStatistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,  -- A foreign key referencing the "Item" table
    sale_date DATE,
    sale_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    profit DECIMAL(10, 2)
);