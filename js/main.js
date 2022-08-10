const previousDisplay = document.querySelector(".previous-result");
const currentDisplay = document.querySelector(".current-result");
const operand = document.querySelectorAll(".operand");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");
let currentValue = "";
let previousValue = "";
let operatorSelected = "";
let operated = false;
let hasDecimalPoint = false;
let equalPressed = false;

currentDisplay.textContent = "0";

operand.forEach(item => {
    item.addEventListener("click", (e) => {

        // If first value is zero remove that zero
        if (currentValue === "0") {
            currentValue = "";
        }
        // Only allow 1 decimal point
        if (e.target.innerText === "." && !hasDecimalPoint) {
            hasDecimalPoint = true;
        } else if (e.target.innerText === "." && hasDecimalPoint) {
            return;
        }
        // If decimal point is inserted add a 0 before the decimal point
        if (currentValue === ".") {
            currentValue = "0" + ".";
        }

        currentValue += item.textContent;
        currentDisplay.textContent = currentValue;
        previousDisplay.textContent = previousValue + " " + operatorSelected;
    })
})

operator.forEach(item => {
    item.addEventListener("click", () => {
    
        if (equalPressed === true) {
            operatorSelected = item.textContent;
            if (operated === true ) {
                if (operatorSelected === "+") {
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                } else if (operatorSelected === "-") {
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                } else if (operatorSelected === "*") {
                    currentValue = 1;
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                } else if (operatorSelected === "/") {
                    currentValue = 1;
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                }
            }
            equalPressed = false;
        } else {
            if (operated === true ) {
                if (operatorSelected === "+") {
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                } else if (operatorSelected === "-") {
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                } else if (operatorSelected === "*") {
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                } else if (operatorSelected === "/") {
                    currentValue = operate(operatorSelected, previousValue, currentValue);
                    operated = false;
                }
            }
        }

        operatorSelected = item.textContent;
        previousValue = currentValue;
        currentValue = "";
        hasDecimalPoint = false;
        currentDisplay.textContent = previousValue;
        previousDisplay.textContent = previousValue + " " + operatorSelected;
        operated = true;
        reset();
    })
})

equal.addEventListener("click", () => {
    if (currentValue === "") return;
    equalPressed = true;
    previousDisplay.textContent = previousValue + " " + operatorSelected + " " + currentValue;
    currentValue = operate(operatorSelected, previousValue, currentValue);
    previousValue = currentValue;
    currentDisplay.textContent = currentValue;
    currentValue = "";
    operatorSelected = "";
    hasDecimalPoint = false;
    reset();
})

clear.addEventListener("click", () => {
    clearAll();
})

function clearAll () {
    currentValue = "";
    previousValue = "";
    operatorSelected = "";
    operated = false;
    hasDecimalPoint = false;
    equalPressed = false;
    previousDisplay.textContent = "";
    currentDisplay.textContent = "0";
}

function reset () {
    if (currentDisplay.textContent === "Can't divide by zero" || currentDisplay.textContent === ".") {
        alert("You can't divide by zero");
        clearAll();
    }
}

// Math Operations
function operate (operator, a, b) {
    a = Number(a);
    b = Number(b);
    if (operator === "+") {
        const resultSum = a + b;
        return Math.round(resultSum * 1000) / 1000;
    } else if (operator === "-") {
        const resultSub = a - b;
        return Math.round(resultSub * 1000) / 1000;
    } else if (operator === "*") {
        const resultMul = a * b;
        return Math.round(resultMul * 1000) / 1000;
    } else if (operator === "/") {
        const resultDiv = a / b;
        if (b === 0) {
            return "Can't divide by zero";
        } else {
            return Math.round(resultDiv * 1000) / 1000;
        }
    }
}