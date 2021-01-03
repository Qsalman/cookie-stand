'use strict';
//CONSTRUCTOR
function Stores(name, minCustomerPerHour, maxCustomersPerHour, avgCookiePerSale) {

  //Properties
  this.name = name;
  this.minCustomerPerHour = minCustomerPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiePerSale = avgCookiePerSale;
  this.sales = [];
  this.storeName = [];
}

/* Generate random numbers of customers based on the flow of maximum and minimum customers per hour */
Stores.prototype.generateRandomCustomers = function() {
  var result = Math.floor(Math.random() * this.maxCustomersPerHour) + this.minCustomerPerHour; //Generate random numbers betn: MIN & MAX
  return result;
};

/* Generates total sales and puts into results of each stores  for the time */
Stores.prototype.generateSalesForecast = function() {
  var calculation; 
  var startTime = 6; 
  var endTime = 20; 
  var totalSales = 0; //Sum of total cookies from start to end time

  
  for (var j = startTime; j <= endTime; j++) {
    calculation = Math.round (this.avgCookiePerSale * this.generateRandomCustomers()); //Calculates and round to nearest integer
    totalSales += calculation;
    this.sales.push(calculation);
  }
  this.sales.push(totalSales); //Make a final push of total cookies

};

/*  Rendering function for the store object */
Stores.prototype.generateRendering = function() {
  var tableEl = document.getElementById('sales-forecast');
  var trEl = document.createElement('ul');
  var tdNameEl = document.createElement('li');
  tdNameEl.textContent = this.name;
  trEl.appendChild(tdNameEl);
  tableEl.appendChild(trEl);
  var tdEl = [];
  for (var i = 0; i < this.sales.length; i++) {
    tdEl[i] = document.createElement('li');
    tdEl[i].textContent = this.sales[i];
    trEl.appendChild(tdEl[i]);
    tableEl.appendChild(trEl);
  }

};

function generateStoreData() {
//Create Objects and store in array of stores
  var arrayOfStores = [];
  var totalOfColumns = []; //Stores total of the column
  arrayOfStores.push(new Stores('Seattle', 23, 65, 6.3));
  arrayOfStores.push(new Stores('Tokyo', 3, 24, 1.2));
  arrayOfStores.push(new Stores('Dubai', 11, 38, 3.7));
  arrayOfStores.push(new Stores('Paris', 20, 38, 2.3));
  arrayOfStores.push(new Stores('Lima', 2, 16, 4.6));

  /* Generate Sales Forecast and display elements on table for each stores  */
  for (var i = 0; i < arrayOfStores.length; i++) {
    arrayOfStores[i].generateSalesForecast();
    arrayOfStores[i].generateRendering();
  }

  /* Generates total of the columns in the display and store in the array*/
  for (i = 0; i < arrayOfStores[0].sales.length; i++) {
    var total = 0;
    for (var j = 0; j < arrayOfStores.length; j++) {
      total += arrayOfStores[j].sales[i];
    }
    console.log(total);
    totalOfColumns.push(total);

  }

  /* Final Rendering for the 'Totals' row */
  var tableEl = document.getElementById('sales-forecast');
  var trEl = document.createElement('li');
  var tdNameEl = document.createElement('ul');
  tdNameEl.textContent = 'Totals';
  trEl.appendChild(tdNameEl);
  tableEl.appendChild(trEl);
  var tdEl = [];
  for (i = 0; i < totalOfColumns.length; i++) {
    tdEl[i] = document.createElement('ul');
    tdEl[i].textContent = totalOfColumns[i];
    trEl.appendChild(tdEl[i]);
    tableEl.appendChild(trEl);
  }

  //test to validate data in console
  for (i = 0; i < arrayOfStores.length; i++) {
    console.log(arrayOfStores[i].name);
    for (j = 0; j < 16; j++) {
      console.log(arrayOfStores[i].sales[j]);
    }
  }

}

var form = document.getElementById('store-name');

var handleFormSubmit = function (event){
  var location = event.target['location'].value;
  var minCustomer = event.target['min-customer'].value;
  var maxCustomer = event.target['max-customer'].value;
  var avgCookies = event.target['avg-cookies'].value;
  
  form.addEventListener('submit', handleFormSubmit);
  console.log(event.target['location']);
}

generateStoreData();