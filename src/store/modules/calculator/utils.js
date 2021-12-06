import KeypadSet from '@/constants/calculator/KeypadSet';
import { toExponentialExpr, isLengthOverOnDisplay } from '@/utils/calculatorUtils';
import Big from 'big.js';

// ex. '01' -> '1'
export function removeZeroPrefix(numStr){

  return Big(numStr).toString();
}

// 화면에 숫자 표시하기 위해 
export function toNumberFormattedForDisplay(numStr){

  if (isRealValueInteger(numStr)) return numStr.replace(/\.0*$/, '');

  if (isDecimalFormat(numStr)) numStr = numStr.replace(/0*$/, '');
  
  if (isLengthOverOnDisplay(numStr)) return toExponentialExpr(numStr);

  return numStr;
}

// 정수 판별
export function isRealValueInteger(numStr) {

  if (/^\d+\.?0*$/.test(numStr)) return true;
  
  return false;
}

// 소수 판별
export function isDecimalFormat(numStr) {
  
  if (/\./.test(numStr)) return true;
  
  return false;
}

// stack의 [num op num] 형식의 값 계산
export function calcNumOpNumSeq(list) {

  const [num1, operator, num2] = list;

  /**
   * TODO: operator가 vuex의 state로 정의되어 있어 proxy 객체를 리턴하기 때문에
   * switch 구문으로 평가를 할 경우 proxy 객체와 일반 객체 일치 평가를 해서
   * if 구문 사용해 평가
   **/

  if (KeypadSet.SUM.equalTo(operator.type)) return Big(num1.content).plus(num2.content).toString();

  if (KeypadSet.SUBTRACT.equalTo(operator.type)) return Big(num1.content).minus(num2.content).toString();

  if (KeypadSet.MULTIPLY.equalTo(operator.type)) return Big(num1.content).times(num2.content).toString();

  if (KeypadSet.DIVIDE.equalTo(operator.type)) return Big(num1.content).div(num2.content).toString();
}
