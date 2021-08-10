let output = '';
let output1 = '';
let output2 = '';
let output3 = '';
let output4 = '';
let output5 = '';

// One line function:
const sayHello = () => 'Say Hello!';
sayHello();
const sayHellos = () => 'Say Hello!';
output = `<p>${sayHellos()}</p>`;
document.getElementById('output').innerHTML = `${output}`;

// One line return:
const sayHello1 = () => 'Hello';
output1 = `<p>${sayHello1()}</p>`;
document.getElementById('output1').innerHTML = ` ${output1}`;
console.log(sayHello1()); // calling function

// Return Object Literal needs to be wrapped in brackets
const sayHello2 = () => ({
    msg: 'Hello'
});
console.log(sayHello2());
output2 = `<p>${ sayHello2() }</p>`;
document.getElementById('output2').innerHTML = 'msg: "Hello"';

// Parameters
// If only one parameter no() brackets required
const sayHello3 = name => console.log(`Hello ${name}`);
sayHello3('Michelle');

const sayHello3b = name3 => console.log(`Hello ${name}`);
sayHello3('Michelle');
output3 = `<p>${ sayHello3b() }</p>`;
document.getElementById('output3').innerHTML = sayHello3b('Michelle');
output3 = `<p>${ sayHello3b('Michelle') }</p>`;
document.getElementById('output3').innerHTML = sayHello3b('Michelle');

// If you have more than one parameter then you must use (parm1, parm2)
// const sayHello4 = (firstName, lastName) => console.log(`Hello ${firstName} ${lastName}`);
const sayHello4 = (firstName, lastName) => document.getElementById('output4').innerHTML = `Hello ${firstName} ${lastName}`;

output4 = sayHello4('Michelle', 'Jones');
document.getElementById('output4').innerHTML = 'Hey ' + output4;



// Arrow Functions as Callbacks
const users = ['Nathan', 'John', 'William', 'Jennifer'];

// long way to code function
// const nameLengths = users.map(function (name) {
//     return name.length;
// });

// shorter way to write
// const nameLengths = users.map((name) => {
//     return name.length;
// });

// shortest way to write
const nameLengths = users.map(name => name.length);
console.log(nameLengths);
document.getElementById('output5').innerText = nameLengths;