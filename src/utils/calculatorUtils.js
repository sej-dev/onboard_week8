import CalculatorCondition from '@/constants/calculator/CalculatorCondition';
import { isRealValueInteger, isDecimalFormat } from '@/store/modules/calculator/utils';

import Big from 'big.js';
import KeypadSet from '@/constants/calculator/KeypadSet';

// 화면 표시 최대 길이 초과 여부 
export function isLengthOverOnDisplay(num) {

  const numStr = num.toString();

  const absNumStr = numStr.replace('-', '');

  if (isRealValueInteger(absNumStr) && (absNumStr.length > CalculatorCondition.INTEGER_MAX_LEN_ON_DISPLAY)) {
    return true;
  }

  if (isDecimalFormat(absNumStr) && (absNumStr.length > CalculatorCondition.DECIMAL_MAX_LEN_ON_DISPLAY)) {
    return true;
  }

  return false;
}

// 지수 표기법으로 변환
export function toExponentialExpr(num){

  const numStr = num.toString();

  return Big(numStr).toExponential(CalculatorCondition.DECIMAL_POINT_BELOW_MAX_LEN_ON_DISPLAY);
}

// 숫자에 콤마 추가
export function addComma(num) {

  const numStr = num.toString();

  if (isLengthOverOnDisplay(numStr)) return toExponentialExpr(numStr);

  const [decimalPointAbove, decimalPointBelow] = numStr.split(KeypadSet.DOT.html);

  let numCommaAdded = decimalPointAbove.replace(/\B(?=(\d{3})+(?!\d))/g, ',', '$1,');

  if (decimalPointBelow != null) numCommaAdded += `${KeypadSet.DOT.html}${decimalPointBelow}`;

  return numCommaAdded;
}
