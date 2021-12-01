import KeyPad from '@/constants/KeyPad';

export function isOperator(namgTag) {
  const operators = Object.keys(KeyPad.OPERATOR);
  return operators.includes(namgTag);
}

export function toIntegerFormatWhenIntegerValue(num) {
  return isInteger(num) ? parseInt(num, 10).toString() : num;
}

export function isInteger(num) {
  const numStr = num.toString();
  if (/^\d+\.0*$/.test(numStr)) return true;
  return false;
}

export function isRationalNumber(num) {
  const numStr = num.toString();
  if (/\./.test(numStr)) return true;
  return false;
}

export function calcNumOpNumSeq(list) {
  const [num1, operator, num2] = list;

  const operation = getOperation(operator.nameTag);
  const result = operation(parseFloat(num1.content), parseFloat(num2.content));

  return result;
}

export function getOperation(operator) {
  switch (operator) {
    case KeyPad.OPERATOR.SUM:
      return (num1, num2) => num1 + num2;
    case KeyPad.OPERATOR.SUBTRACT:
      return (num1, num2) => num1 - num2;
    case KeyPad.OPERATOR.MULTIPLY:
      return (num1, num2) => num1 * num2;
    case KeyPad.OPERATOR.DIVIDE:
      return (num1, num2) => num1 / num2;
    default:
      return () => {};
  }
}
