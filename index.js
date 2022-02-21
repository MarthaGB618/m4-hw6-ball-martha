// This function gets user input and creates a new pizza order object
// You only need to add code to this function
function getPizzaOrder() {
  var extraCheeseUpcharge = 1.5
  var thickCrustUpcharge = 2
  var deliveryFee = 3.5
  var toppingsFee = 1.5
  var basePrice = 10

  alert("Hi, Thanks for ordering with Web to Pizza!")
  var pizza = {
    // set the 'cost' property to the basePrice
    cost: basePrice
  }

  var crust = prompt(
    `Please enter the type of crust (${formatPrice(thickCrustUpcharge)} upcharge for Thick crust)`
  )
  // set the pizza object's 'crust' property to the user's response
  // HINT: prompt() returns a string
  // HINT: You may wish to use .toLowerCase() and .trim()
  // if the user specified 'thick' crust, add thickCrustUpcharge
  // to pizza.cost
  crust = crust.toLowerCase().trim();
  
  if crust =='thick' {
    pizza.cost += thickCrustUpcharge;
  }

  pizza.crust = crust;
  
  var toppings = prompt("Please enter additional toppings (comma separated)")
  // HINT: prompt() will return an empty string "" if the user presses 'OK' without entering a value
  // if the user enters toppings, use .split(",") to separate toppings into an array
  // if no toppings are given, make sure pizza.toppings is set to []
  // if the user has added toppings, add toppingsFee multiplied by
  // the number of toppings added to pizza.cost
  
  toppings = toppings.split(',');
  pizza.toppings = []


  numOfToppings = toppings.length;
  if(toppings == ""){
    numOfToppings = 0;
  }
  
  for(let x=0; x<numOfToppings; x++){
    pizza.toppings.push(toppings[x].trim());
  }

  costOfToppings = numOfToppings * toppingsFee;

  pizza.cost += costOfToppings;


  var extraCheese = confirm("Would you like extra cheese?")
  // HINT: confirm() returns a boolean
  // if the user specifies extra cheese, set pizza.extraCheese to true or false
  // if the user specifies extra cheese, add extraCheeseUpcharge to pizza.cost
  pizza.extraCheese = extraCheese;
  if(extraCheese){
    pizza.cost += extraCheeseUpcharge;
  }


  var isDelivery = confirm("Is your order for Delivery?")
  // HINT: confirm() returns a boolean
  // if order is for delivery, set pizza.saleType to "delivery"
  // if order is NOT for delivery, set pizza.saleType to "take-out"
  // if order if for delivery, add deliveryFee to pizza.cost
  pizza.saleType = 'take-out';
  if(isDelivery){
    pizza.saleType = "delivery";
    pizza.cost += deliveryFee;
  }

  return pizza
}

// This function is attached to the Order Now Button
// This function is COMPLETE. No work to do here
function orderPizza() {
  var pizzaOrderObj = getPizzaOrder()
  var orderString = getOrderString(pizzaOrderObj)
  renderOrder(orderString)
}

// This function adds a pizza order to the page as HTML
// This function is COMPLETE. No work to do here
function renderOrder(pizzaStr) {
  var ordersEl = document.querySelector('#orders')
  var newOrderEl = document.createElement('li')
  newOrderEl.innerHTML = `<pre>${pizzaStr}</pre>`
  ordersEl.appendChild(newOrderEl)
}

// This function creates a string version of the pizza order data
// This function is COMPLETE. No work to do here
function getOrderString(pizza) {
  return `
  Order Information
  -----------------
  Delivery or Takeout: ${pizza.saleType}
  Crust: ${pizza.crust || 'Regular'}
  Toppings: ${(Array.isArray(pizza.toppings) &&
      pizza.toppings.filter(topping => topping).length > 0)
      ? pizza
        .toppings
        .map(topping => '\n  --' + topping)
      : 'No Extra Toppings'
    }
  Extra Cheese: ${pizza.extraCheese === true ? "Yes" : "No"}
  -----------------
  Subtotal: ${formatPrice(pizza.cost)}
  Total: ${formatPrice(pizza.cost * 0.07 + pizza.cost)}
  `
}

// this function turns a float number into USD price formatting
// This function is COMPLETE. No work to do here
function formatPrice(price) {
  if (typeof price !== 'number' || Number.isNaN(price)) return 'ERROR'
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(price)
}