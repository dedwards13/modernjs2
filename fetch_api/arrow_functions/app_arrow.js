let output = '';
let output1 = '';
let output2 = '';
let output3 = '';
let output4 = '';
let output5 = '';
let output6 = '';
let output7 = '';

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