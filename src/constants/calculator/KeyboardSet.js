import KeypadSet from '@/constants/calculator/KeypadSet';

export default {
  '0': KeypadSet.ZERO,
  '1': KeypadSet.ONE,
  '2': KeypadSet.TWO,
  '3': KeypadSet.THREE,
  '4': KeypadSet.FOUR,
  '5': KeypadSet.FIVE,
  '6': KeypadSet.SIX,
  '7': KeypadSet.SEVEN,
  '8': KeypadSet.EIGHT,
  '9': KeypadSet.NINE,

  '/': KeypadSet.DIVIDE,
  '*': KeypadSet.MULTIPLY,
  '+': KeypadSet.SUM,
  '-': KeypadSet.SUBTRACT,

  'Escape': KeypadSet.CLEAR_ALL,
  'Delete': KeypadSet.CLEAR_ENTRY,
  'Backspace': KeypadSet.CLEAR_ONE_CHAR,

  'Enter': KeypadSet.EQUAL,
  '=': KeypadSet.EQUAL,
  '.': KeypadSet.DOT,
};
