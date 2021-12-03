import Keypad from '@/constants/calculator/Keypad';
import Big from 'big.js';

export function removeZeroPrefix(numStr){
  return Big(numStr).toString();
}

export function toIntegerFormatWhenIntegerValue(numStr) {
  return isInteger(numStr) ? numStr.replace(/\.0*$/, '') : numStr;
}

export function isInteger(numStr) {
  if (/^\d+\.?0*$/.test(numStr)) return true;
  return false;
}

// 소수
export function isRationalDiffIntegerNumber(numStr) {
  if (/\./.test(numStr)) return true;
  return false;
}

export function calcNumOpNumSeq(list) {
  const [num1, operator, num2] = list;

  /**
   * TODO: operator가 vuex의 state로 정의되어 있어 proxy 객체를 리턴하기 때문에
   * switch 구문으로 평가를 할 경우 proxy 객체와 일반 객체 일치 평가를 해서
   * if 구문 사용해 평가
   **/

  if (Keypad.SUM.equalTo(operator.type)) return Big(num1.content).plus(num2.content).toString();
  if (Keypad.SUBTRACT.equalTo(operator.type)) return Big(num1.content).minus(num2.content).toString();
  if (Keypad.MULTIPLY.equalTo(operator.type)) return Big(num1.content).times(num2.content).toString();
  if (Keypad.DIVIDE.equalTo(operator.type)) return Big(num1.content).div(num2.content).toString();
}
