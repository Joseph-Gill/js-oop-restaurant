class Dish {
    constructor(name, price, ingredients) {
        this.name = name,
        this.ingredients = ingredients,
        this.price = price
    }
    // Method for evaluating the total Cost of a Dish created by the class
    dishCost = () => {
        // Base cost of all dishes is 10, used to hold that and be added to during iteration
        let totalCost = 10;
        // Iterates over each ingrediant in the ingredients array, adding its cost to the total
        this.ingredients.forEach(i => totalCost += i.cost);
        return totalCost;
    }
    // Method that returns the profit by subtracting the price from the return of calling dishCost()
    dishProfit = () => this.price - this.dishCost();
}

class Ingredient {
    constructor(name, cost) {
        this.name = name,
        this.cost = cost
    }
}

class Restaurant {
    constructor() {
        this.orders = [];
    }
    // Method that adds customer orders to the orders array as an Object containing name and order
    orderDish = (cust, custOrder) => this.orders.push({name: cust.name, orders:[custOrder]});
    // Method for printing out the list of all orders currently in the orders array
    printOrders = () => {
        // Used as the base string for the list of orders, added to during iteration
        let orderList = '';
        // Iterates over the orders array, adding a new line each time with the Order Number and Order Name
        this.orders.forEach((a, b) => orderList += `Order #${b}: ${a.orders[0].name}\n`);
        return orderList;
    }
    // Method to print all of a customers orders, name will be at the top and total at the bottom
    printCheck = (cust) => {
        // Used as the base string for the for the customer check, added to during iteration
        let checkStatement = `${cust.name}\n`;
        // Used during iteration to hold the total price of the customers order
        let totalPrice = 0;
        // Iterates over the orders array, if customer's name matches, addes to the checkStatement String
        // and totalPrice
        this.orders.forEach((a, b) => {
            if (a.name === cust.name) {
                checkStatement += `Order #${b}: ${a.orders[0].name} - ${a.orders[0].price}\n`
                totalPrice += a.orders[0].price;
            }
        });
        return checkStatement += `Total: ${totalPrice}`
    }
    // Method to print the total profit of all orders currently held in the orders array
    totalProfit = () => {
        // Used during iteration to hold the total profit
        let totalProfit = 0;
        // Iterates for the orders array calling the dishProfit method in each Dish and adding its total
        // to totalProfit
        this.orders.forEach(a => totalProfit += a.orders[0].dishProfit());
        return totalProfit;
    }
    // Method to print the total profit of all a specific customers orders held in the orders array
    specificCustProfit = (cust) => {
        // Used during iteration to hold the total profit of a specific customer
        let totalCustProfit = 0;
        // Iterates over the orders array, checks to see if customers name match, then adds the profit
        // to totalCustProfit
        this.orders.forEach(a => a.name === cust.name ? totalCustProfit += a.orders[0].dishProfit() : null);
        return totalCustProfit;
    }

}

class Client {
    constructor(name, id) {
        this.name = name,
        this.id = id
    }
}

const disneyRestaurant = new Restaurant;

const cheese = new Ingredient('cheese', 5);
const pepperoni = new Ingredient('pepperoni', 4);
const dough = new Ingredient('dough', 3);
const lettuce = new Ingredient('lettuce', 2);
const tomato = new Ingredient('tomato', 3);

const pizza = new Dish ('Pepperoni Pizza', 35, [cheese, pepperoni, dough]);
const salad = new Dish ('Tomato Salad', 25, [lettuce, cheese, tomato])

const pluto = new Client('Pluto', 1);
const goofy = new Client('Goofy', 2);

disneyRestaurant.orderDish(goofy, pizza);
console.log(disneyRestaurant.printCheck(goofy));
disneyRestaurant.orderDish(pluto, pizza);
disneyRestaurant.orderDish(pluto, salad);
console.log(disneyRestaurant.printCheck(pluto));

console.log(disneyRestaurant.totalProfit());
console.log(disneyRestaurant.specificCustProfit(pluto));