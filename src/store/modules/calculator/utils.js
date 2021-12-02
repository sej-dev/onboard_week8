import Keypad from '@/constants/calculator/Keypad';

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

  const operation = getOperation(operator.type);
  const result = operation(parseFloat(num1.content), parseFloat(num2.content));

  return result;
}

export function getOperation(operator) {
  /**
   * TODO: operator가 vuex의 state로 정의되어 있어 proxy 객체를 리턴하기 때문에
   * switch 구문으로 평가를 할 경우 proxy 객체와 일반 객체 일치 평가를 해서
   * if 구문 사용해 평가
   **/
  if (Keypad.SUM.equalTo(operator)) return (num1, num2) => num1 + num2;
  if (Keypad.SUBTRACT.equalTo(operator)) return (num1, num2) => num1 - num2;
  if (Keypad.MULTIPLY.equalTo(operator)) return (num1, num2) => num1 * num2;
  if (Keypad.DIVIDE.equalTo(operator)) return (num1, num2) => num1 / num2;
  return () => {};
}
