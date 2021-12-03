import CalculatorCondition from '@/constants/calculator/Condition';
import { isInteger, isRationalDiffIntegerNumber } from '@/store/modules/calculator/utils';

import Big from 'big.js';
import Keypad from '@/constants/calculator/Keypad';

export function isLengthExceeded(numStr) {
  const absNumStr = numStr.replace('-', '');

  if (isInteger(absNumStr) && absNumStr.length > CalculatorCondition.INPUT_INTEGER_LEN_LIMIT) {
    return true;
  }

  if (isRationalDiffIntegerNumber(absNumStr) && absNumStr.length > CalculatorCondition.INPUT_RATIONAL_DIFF_INTEGER_LEN_LIMIT) {
    return true;
  }

  return false;
}

export function toExponentialExpr(numStr){
  return Big(numStr).toExponential(CalculatorCondition.DECIMAL_POINT_BELOW_LEN_LIMIT);
}

export function addComma(numStr) {
  if (isLengthExceeded(numStr)) return toExponentialExpr(numStr);

  const [decimalPointAbove, decimalPointBelow] = numStr.split(Keypad.DOT.html);

  let numCommaAdded = decimalPointAbove.replace(/\B(?=(\d{3})+(?!\d))/g, ',', '$1,');

  if (decimalPointBelow != null) numCommaAdded += `${Keypad.DOT.html}${decimalPointBelow}`;

  return numCommaAdded;
}
