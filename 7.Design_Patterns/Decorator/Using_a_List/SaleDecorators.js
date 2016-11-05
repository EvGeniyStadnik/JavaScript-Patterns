// Список декораторов будет храниться как собственное свойство конструктора Sale():
function Sale(price) {
 this.price = price || 100;
 this.decorators_list = [];
}

// метод decorate() просто добавляет новый элемент в список
Sale.prototype.decorate = function (decorator) {
 this.decorators_list.push(decorator);
};

// Метод getPrice() выполняет обход списка декораторов и вызов каждого из методов
Sale.prototype.getPrice = function () {
 var price = this.price,
 i,
 max = this.decorators_list.length,
 name;
 for (i = 0; i < max; i ++) {
  name = this.decorators_list[i];
  price = Sale.decorators[name].getPrice(price);
 }
 return price;
};

Sale.decorators = {};

Sale.decorators.fedtax = {
 getPrice: function (price) {
 return price + price * 5 / 100;
 }
};

Sale.decorators.quebec = {
 getPrice: function (price) {
 return price + price * 7.5 / 100;
 }
};

Sale.decorators.money = {
 getPrice: function (price) {
 return "$" + price.toFixed(2);
 }
};

var sale = new Sale(100); // цена 100 долларов
sale.decorate('fedtax'); // добавить федеральный налог
sale.decorate('quebec'); // добавить местный налог
sale.decorate('money'); // форматировать как денежную сумму
sale.getPrice(); // "$112.88"
