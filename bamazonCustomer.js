const mysql = require('mysql');
const inquirer = require('inquirer');

const DATABASE = 'bamazon_DB';
const TABLE = 'products';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'marvel08',
    database: DATABASE,
});
    
//this takes a callback.
connection.connect(function(error) {
    if (error) {
        console.log(error);
    }

    console.log(`Connect as id ${connection.threadId}`);
    connection.query(`SELECT id, product_name, department_name, price, stock_quantity from ${TABLE}`, function(error, data) {
        if (error) {
            console.error(error)
        }

        console.log(data);
    })


// connection.query(`SELECT id, product_name, department_name, price, stock_quantity FROM ${TABLE} WHERE quantity > 100`, function(error, data) {