CREATE DATABASE IF NOT EXISTS QuickWagon;
USE QuickWagon;

CREATE TABLE users (
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 10000) PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	default_commission REAL DEFAULT 0.20,
	phone_number VARCHAR(20),
	registration_time TIMESTAMP DEFAULT now(),
	_internal_comment TEXT
);

CREATE TABLE orders (
	id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000) PRIMARY KEY,
	owner INTEGER NOT NULL,
	ts TIMESTAMP DEFAULT now(),
	ts_updated TIMESTAMP DEFAULT now(),
	status VARCHAR(40),
	CONSTRAINT fk_order FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE order_item (
	id BIGINT,
	item TEXT NOT NULL,
	price INT NOT NULL,
	type VARCHAR(255) NOT NULL,
	CONSTRAINT fk_order_item FOREIGN KEY (id) REFERENCES orders(id)
);

CREATE TABLE ordered (
	order_id BIGINT,
	requested_by INTEGER,
	CONSTRAINT fk_ordered_item FOREIGN KEY (id) REFERENCES orders(id),
	CONSTRAINT fk_orders FOREIGN KEY (requested_by) REFERENCES users(id)
);

CREATE TABLE supplier_store (
	id BIGINT GENERATED ALWAYS AS IDENTITY (START WITH 100000) PRIMARY KEY,
	address TEXT,
	transit_stop_name VARCHAR(255),
	transit_stop_line_color VARCHAR(255)
);
