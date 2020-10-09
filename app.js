'use strict';

var allData = [];
var header = ['Device Name', 'Category', 'Quantity', 'Unite Price'];
function Device(itemName, category, quantity){
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.min = 350;
    this.max = 900;
    this.randomPrice = 0;
    allData.push(this);

}


Device.prototype.getRandomPrice = function(){
    this.randomPrice = Math.floor(getRandomArbitrary(this.min, this.max));
}


var formEl = document.getElementById('form');
formEl.addEventListener('submit', addData);
function addData(event){
    event.preventDefault();
    var itemName = event.target.itemName.value;
    var catog = event.target.category.value;
    var quant = event.target.quantity.value;
    console.log(itemName, catog, quant);
    var anyName = new Device(itemName,catog, quant);
    anyName.getRandomPrice();
    anyName.showRow();
     localStorage.setItem('data', JSON.stringify(allData));
      getTotal();
}



var tableEl = document.getElementById('table');
function showHeader(){
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    for(var i=0; i<header.length; i++){
        var thEl = document.createElement('th');
        trEl.appendChild(thEl);
        thEl.innerHTML = `${header[i]}`;
    }
    
}
showHeader();

Device.prototype.showRow = function(){
    var trEl2 = document.createElement('tr');
    tableEl.appendChild(trEl2);
    var tdEl = document.createElement('td');
    trEl2.appendChild(tdEl);
    tdEl.innerHTML = `${this.itemName}`;
    var tdEl2 = document.createElement('td');
    trEl2.appendChild(tdEl2);
    tdEl2.innerHTML = `${this.category}`;
    var tdEl3 = document.createElement('td');
    trEl2.appendChild(tdEl3);
    tdEl3.innerHTML = `${this.quantity}`;
    var tdEl4 = document.createElement('td');
    trEl2.appendChild(tdEl4);
    tdEl4.innerHTML = `${this.randomPrice}`;
    
}


var pull=JSON.parse(localStorage.getItem('data'))
for(var i=0; i<pull.length; i++){
    new Device(pull[i].itemName, pull[i].category, pull[i].quantity)
}
for(var o=0; o<allData.length; o++){
    allData[o].getRandomPrice();
    allData[o].showRow();
}
function getTotal(){
    var total=0;
    for(let t=0; t<allData.length; t++){
        total+= allData[t].randomPrice;
    }
    document.getElementById('p').innerHTML= `total price= ${total}`;
}
getTotal();


//helper function
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
