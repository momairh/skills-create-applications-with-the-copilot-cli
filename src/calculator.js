#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator.
 *
 * Supported operations (basic arithmetic only):
 *   +  Addition       -> a + b
 *   -  Subtraction    -> a - b
 *   *  Multiplication -> a * b
 *   /  Division       -> a / b (division by zero is handled gracefully)
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 / 0
 */

/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides the first number by the second.
 * Throws an error if dividing by zero so callers can handle it gracefully.
 * @param {number} a
 * @param {number} b
 * @returns {number} a / b
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

/**
 * Performs the requested arithmetic operation on two numbers.
 * @param {number} a
 * @param {string} operator - One of '+', '-', '*', '/'.
 * @param {number} b
 * @returns {number} The result of the operation.
 */
function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
    case "x":
    case "X":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      throw new Error(
        `Unsupported operator: "${operator}". Supported operators are + - * /`
      );
  }
}

/**
 * Parses and validates CLI arguments, then runs the calculation,
 * printing either the result or a helpful error message.
 * @param {string[]} argv - Raw CLI arguments (excluding node and script path).
 */
function main(argv) {
  if (argv.length !== 3) {
    console.error("Usage: node src/calculator.js <number> <operator> <number>");
    console.error("Supported operators: + - * /");
    process.exitCode = 1;
    return;
  }

  const [rawA, operator, rawB] = argv;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error(`Invalid number input: "${rawA}" or "${rawB}" is not a valid number.`);
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(a, operator, b);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

// Only run the CLI when this file is executed directly (not when imported/required).
if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide, calculate };
