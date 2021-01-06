'use-strict';

var hours =  ['6am','7am','8am','9am','10am','11am','12am','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','Daily Location Total'];
var data = [];
var table = document.getElementById('cookieStats');

/*here i created a Constructor function to calculate cookie sales */
function CookiesLocation(minCustomersPerHour, maxCustomersPerHour, avgCookieSalesPerCustomer) {
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookieSalesPerCustomer = avgCookieSalesPerCustomer;

  this.customersPerHour = function(){
    var min = Math.ceil(this.minCustomersPerHour);
    var max = Math.floor(this.maxCustomersPerHour);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
// here i used the round insted of the floor and ceil because its more general 
  this.cookiesSoldPerHour = function(){
    return Math.round(this.customersPerHour() * this.avgCookieSalesPerCustomer,0);
  },

  this.totalCookiesSoldInADay = 0,

  this.output = function(){
    var locationDetails = [];
    var totalCookiesPerDay = 0;

    for (var i=1; i < hours.length; i++){
      var cookies = this.cookiesSoldPerHour();
      locationDetails[i] = cookies;
      totalCookiesPerDay = totalCookiesPerDay + cookies;
    }
    this.totalCookiesSoldInADay = totalCookiesPerDay;
    locationDetails[i] = this.totalCookiesSoldInADay;
    return locationDetails;
  };
}

// Creating the  Header Row function  ===========================================================================
function createHeader() {
  var tempData = [];
  for(var i=0; i<hours.length; i++) {
    tempData = tempData + '<th>' + hours[i] + '</th>';
  }
  var newRow = document.createElement('tr');
  newRow.innerHTML = '<th>' + tempData + '</th>';
  table.appendChild(newRow);
}

function createRow(array) {
  var tempData =[];
  for(var i=0; i<array.length; i++) {
    tempData = tempData + '<td>' + array[i] + '</td>';
  }
  data.push(tempData);
}

function render(tableRow) {
  for(var j=0; j<tableRow.length;j++){
    var newRow = document.createElement('tr');
    newRow.innerHTML = tableRow[j];
    table.appendChild(newRow);
  }
}
// creating the footer function  ====================================================================================================
function createFooter() {
  var tempData = [];
  var cookies = 0;

  // adding a Frame  to the footer by adding all sales details
  for(var i=1; i<hours.length+1; i++) {
    for(var j=0; j<locationArray.length;j++){
      cookies = cookies + locationArray[j][i];
    }
    tempData = tempData + '<td>' + cookies + '</td>';
  }

  //Insert new total row element 
  var footerElement = document.getElementsByTagName('tfoot');
  if(footerElement.length===0){
    var newRow = document.createElement('tfoot');
    newRow.innerHTML = '<td>' + 'Totals' + tempData + '</td>';
    table.appendChild(newRow);
  } else {
    var tableID = document.getElementById('cookieStats');
    var rowElement = document.getElementsByTagName('tr');
    tableID.rows[rowElement.length - 1].innerHTML = '<td>' + 'Totals' + tempData + '</td>';
  }
}

function formData(event){
  event.preventDefault();

  var location = event.target.location.value;
  var minNumberCookies = event.target.minimum.value;
  var maxNumberCookies = event.target.maximum.value;
  var avgNumberCookies = event.target.average.value;

  //Input data validations
  locationcheck(location);

  //Add  new location details using the new keyword 
  var newLocation = new CookiesLocation(minNumberCookies,maxNumberCookies,avgNumberCookies);
  var newLocationDetails = newLocation.output();
  newLocationDetails[0] = location;
  data = [];
  createRow(newLocationDetails);
  render(data);
  form.reset();

  //typing this code im Storeing the  New location values in an array so that total can be computed
  locationArray.push(newLocationDetails);

  // here im calling the creatfooter function to Write the new Total as Footer
  createFooter();

}


// calling the  Header Row 
createHeader();

// Location array to store all location details
var locationArray = [] ;

//Create Seattle Market stats
var Seattle = new CookiesLocation(23,65,6.3);
var SeattleCookieDetails = Seattle.output();
SeattleCookieDetails[0]='Seattle';
data = [];
createRow(SeattleCookieDetails);
render(data);
locationArray.push(SeattleCookieDetails);

//Create Tokyo stats
var Tokyo = new CookiesLocation(3,24,1.2);
var TokyoCookieDetails = Tokyo.output();
TokyoCookieDetails[0]='Tokyo';
data = [];
createRow(TokyoCookieDetails);
render(data);
locationArray.push(TokyoCookieDetails);

//Create Dubai stats
var Dubai = new CookiesLocation(11,38,3.7);
var DubaiCookieDetails = Dubai.output();
DubaiCookieDetails[0]='Dubai';
data = [];
createRow(DubaiCookieDetails);
render(data);
locationArray.push(DubaiCookieDetails);

//Create Paris stats
var Paris = new CookiesLocation(20,38,2.3);
var ParisCookieDetails = Paris.output();
ParisCookieDetails[0]='Paris';
data = [];
createRow(ParisCookieDetails);
render(data);
locationArray.push(ParisCookieDetails);

//Create Lima	stats
var Lima = new CookiesLocation(2,16,4.6);
var Lima = Lima.output();
Lima[0]='Lima';
data = [];
createRow(Lima);
render(data);
locationArray.push(Lima);



// test to creat a new city 

function AddCity () {

    this.CityName = CityName;
    this.minCustomersPerHour = minCustomersPerHour;
    this.maxNumberCookies = maxCustomersPerHour;
    this.avgNumberCookies = avgCookieSalesPerCustomer;
}
var newCityEntry = document.getElementById('newCityEntry');

newCityEntry.addEventListener('submit', function (event){
event.preventDefault(); 
var newcity = new CookiesLocation(1,2,4.3);
var newcity = newcity.output();
newcity[0]='newcity';
data = [];
createRow(newcity);
render(data);
locationArray.push(newcity)
var CityName = event.target.CityName.value;
    var minCustomersPerHour = event.target.minCustomersPerHour.value;
    var maxCustomersPerHour =  event.target.maxCustomersPerHour.value;
    var avgCookieSalesPerCustomer = event.target.avgCookieSalesPerCustomer.value;
    
    var newcity = new AddCity(CityName,minCustomersPerHour,maxCustomersPerHour,avgCookieSalesPerCustomer)
    console.log(newcity);
    newcity.renderaddcity();
  });

// var newcity = new CookiesLocation(1,2,4.3);
// var newcity = newcity.output();
// newcity[0]='newcity';
// data = [];
// createRow(newcity);
// render(data);
// locationArray.push(newcity);



 


createFooter();




