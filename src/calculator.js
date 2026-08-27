#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator.
 *
 * Supported operations:
 *   +     Addition        -> a + b
 *   -     Subtraction     -> a - b
 *   *     Multiplication  -> a * b
 *   /     Division        -> a / b (division by zero is handled gracefully)
 *   %     Modulo          -> a % b (remainder of a / b)
 *   ^ **  Exponentiation  -> a ^ b (a raised to the power of b)
 *   sqrt  Square root     -> sqrt n (unary; negative input is handled gracefully)
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *   node src/calculator.js sqrt <number>
 *
 * Examples:
 *   node src/calculator.js 5 + 3
 *   node src/calculator.js 10 / 0
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ^ 10
 *   node src/calculator.js sqrt 16
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
 * Returns the remainder of a divided by b.
 * Throws an error if b is zero so callers can handle it gracefully.
 * @param {number} a
 * @param {number} b
 * @returns {number} a % b
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }
  return a % b;
}

/**
 * Raises a base number to the given exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number} base ** exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Returns the square root of a number.
 * Throws an error for negative input, since the square root of a negative
 * number is not a real number.
 * @param {number} n
 * @returns {number} The square root of n.
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot compute the square root of a negative number.");
  }
  return Math.sqrt(n);
}

/**
 * Performs the requested arithmetic operation on two numbers.
 * @param {number} a
 * @param {string} operator - One of '+', '-', '*', '/', '%', '^'/'**'.
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
    case "%":
      return modulo(a, b);
    case "^":
    case "**":
      return power(a, b);
    default:
      throw new Error(
        `Unsupported operator: "${operator}". Supported operators are + - * / % ^ (or **)`
      );
  }
}

/**
 * Parses and validates CLI arguments, then runs the calculation,
 * printing either the result or a helpful error message.
 * @param {string[]} argv - Raw CLI arguments (excluding node and script path).
 */
function main(argv) {
  // Unary form: sqrt <number>
  if (argv.length === 2 && argv[0].toLowerCase() === "sqrt") {
    const n = Number(argv[1]);

    if (Number.isNaN(n)) {
      console.error(`Invalid number input: "${argv[1]}" is not a valid number.`);
      process.exitCode = 1;
      return;
    }

    try {
      console.log(squareRoot(n));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
    return;
  }

  if (argv.length !== 3) {
    console.error("Usage: node src/calculator.js <number> <operator> <number>");
    console.error("       node src/calculator.js sqrt <number>");
    console.error("Supported operators: + - * / % ^ (or **)");
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

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
