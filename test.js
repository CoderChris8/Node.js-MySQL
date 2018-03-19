const mysql = require('mysql');
const inquirer = require("inquirer");
 
const DATABASE = 'bamazon_DB';
const TABLE = 'products';
 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
 
    user: 'root',
    password: 'marvel08',
    database: DATABASE,
});
 
 function start_bamazonApp() {
   //this takes a callback.
    connection.connect(function(error) {
        if (error) {
            console.error(error);
        }
        console.log(`Connect as id ${connection.threadId}`);
        connection.query('SELECT id, product_name, department_name, price, stock_quantity FROM products', function(error, data) {
            if (error) {
                console.error(error)
            }

            console.log(data);
            purchaseMenu();
        })
    });
 }

function purchaseMenu(itemSelected) {
  // List user input screen.
    inquirer.prompt([
      {
        type: "list",
        message: "Which item(s) would you like to buy?",
        choices: itemSelected,
        name: "purchasedItem"
      }, {
        type: "input",
        message: "How many would you like to buy?",
        name: "purchasedQuantity"
      }]).then(answers => {
        if(Number.isInteger(parseInt(answers.purchasedQuantity))) {
          checkAvailability(answers.purchasedItem, answers.purchasedQuantity);
    }
      else {
        console.log("Item not purchased, please enter a valid number/integer");
    		continuePrompt();
      }
    });
}       
function checkAvailability(item, quantity) {
  connection.query("SELECT stock_quantity,product_name, price FROM products WHERE product_name=?, [item],
                   function(error, results, fields) {
                    if(error) throw error;
                    // console.log(results);

                    var itemsLeft = results[0].stock_quantity;
                    let itemPrice = results[0].price;
                    let totalSale = itemPrice * quantity;
                    let productSales = results[0].product_name;
                    let updatedProductSales = productSales + totalSale;

                      if((itemsLeft - quantity) > 1) {

                        if(quantity > 1) {
                          console.log("You just bought " + quantity + " " +  item + "s" + " for $" + totalSale);
                        }
                        else {
                          console.log("You just bought a " + item + " for $" + itemPrice);
                        }


                        updateDB(itemsLeft - quantity, item, updatedProductSales);
                      }

                      else {
                        console.log("Sorry, insufficient quantity!");
                        continuePrompt();
                      }
                  })
                }


  
 start_bamazonApp();
// connection.query(`SELECT id, product_name, department_name, price, stock_quantity FROM ${TABLE}`, function(error, data) {

// Create a "Prompt" with a series of questions.
// function purchasePrompt () {
//   inquirer.prompt([
//         // Here create a basic text prompt questions here.
//             type: "input",
//             name: "productChoice",
//             message: "Which item do you want to purchase?"
//     ])
//   }