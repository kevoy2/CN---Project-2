//Import JavaScript Libraries
// const DOMPurify  = require('dompurify');

// Global Variables
var n;
var option;
var result = 0;

// A function to retrieve html form data.
function retrieve() {
    n = document.getElementById('input').value;
    result = calculate(n);
    display();
}

// A function to retrieve html form data.
function display() {
    var one = document.getElementById('n');
    one.innerHTML = n;
    var two = document.getElementById('answer');
    two.innerHTML = result;
}

// Function to calculate the fibonaci number indicated by the website user.
function calculate(x) {
    if(x == 0) {
        return 0;
    } else if(x == 1) {
        return 1;
    } else {
        return calculate(x - 1) + calculate(x - 2);
    }
}