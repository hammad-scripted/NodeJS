export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}
export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b == 0) {
    return 'Division by zero is not allowed!';
  } else {
    return a / b;
  }
}

// commonJS
// module.exports = {
//   add,
//   subtract,
//   multiply,
//   divide,
// };

//// Named Exports
//// named exports allow you to export multiple values from a module, and they can be imported using their specific names. You can have multiple named exports in a single module.
//// To create a named export, you can use the export keyword before the declaration of a variable, function, or class. For example:
//// export const add = (a, b) => a + b;
//// export const subtract = (a, b) => a - b;
//// export const multiply = (a, b) => a * b;
//// export const divide = (a, b) => a / b;

//// To import named exports, you can use the import statement with curly braces to specify the names of the exports you want to import. For example:
//// import { add, subtract } from './math.js';

// // Default Exports
//// Default exports allow you to export a single value from a module, and it can be imported without using its specific name. You can only have one default export in a module.
//  // To create a default export, you can use the export default keyword before the declaration of a variable, function, or class. For example:
////  export default function add(a, b) {
////   return a + b;
//// }
//// To import a default export, you can use the import statement without curly braces, and you can choose any name for the imported value. For example:
//// import add from './math.js';
//// In this case, the imported value will be assigned to the name add, regardless of the name used in the original module.
////  You can also import a default export along with named exports from the same module. For example:
//// import add, { subtract, multiply } from './math.js';

// // what is module.exports and exports in Node.js?
//// In Node.js, module.exports and exports are both used to export values from a module, but they serve different purposes.
//// module.exports is the object that is actually returned as the result of a require() call. It can be assigned any value, such as a function, an object, or a primitive value. For example:
//// module.exports = function add(a, b) {
////   return a + b;
//// }
//// exports is an object that is used to export values from a module. It can be assigned any value, such as a function, an object, or a primitive value. For example:
//// exports.add = function add(a, b) {
////   return a + b;
//// }
