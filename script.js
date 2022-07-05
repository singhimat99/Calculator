"use strict";
class Calculator {
  constructor(currentOperand, previousOperand) {
    this.currentOperand = currentOperand;
    this.previousOperand = previousOperand;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operator = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.current.includes(".")) return;
    this.current += number;
  }

  selectOperation(operator) {
    if (this.current === "") return;
    if (!this.previous === "") this.compute();
    this.operator = operator;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operator) {
      case "+":
        result = prev + curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;
      case "-":
        result = prev - curr;
        break;
      default:
        return;
    }
    this.current = result;
    this.operator = undefined;
    this.previous = "";
  }

  updateDisplay() {
    this.currentOperand.innerText = this.current;
    this.previousOperand.innerText = this.previous;
  }
}

const numbers = document.querySelectorAll(".number");
const currentOperand = document.querySelector("[data-current-operand]");
const previousOperand = document.querySelector("[data-previous-operand]");
const add = document.querySelector(".plusOperator");
const operationsBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-allClear]");

const calculator = new Calculator(currentOperand, previousOperand);
numbers.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsBtns.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.selectOperation(button.innerText);
    calculator.updateDisplay();
  });
});

deleteBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});

// currentOperand numbers

// for (let i = 0; i < numbers.length; i++) {
//   numbers[i].addEventListener("click", function () {
//     let displayValue = currentOperand.innerHTML;
//     if (displayValue.includes(".") && i === 0) return;
//     currentOperand.innerHTML += numbers[i].innerHTML;
//   });
// }

// // addition
// add.addEventListener("click", function () {
//   let firstNumber = Number(currentOperand.value);
//   let operation = `${firstNumber} + ${currentOperand.value}`;
//   previousOperand.value = firstNumber + "+";

//   currentOperand.value = console.log(firstNumber * 2);
// });
