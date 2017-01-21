
function deffer(func, ms){
	return function(){
		setTimeout(() => func.apply(this, arguments), ms);
	};
};
function sayHi(name){
	console.log(`Hello ${name}`);
};
let sayHiDeferred = deffer(sayHi, 2000);
sayHiDeferred('Eugene');

//!---------func(...arguments), ms);-------------------

function deffer(func, ms){
	return function(){
		setTimeout(() => func(...arguments), ms);
	};
};
function sayHi(name){
	console.log(`Hello ${name}`);
};
let sayHiDeferred = deffer(sayHi, 2000);
sayHiDeferred('Eugene');
