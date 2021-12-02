import Keypad from '@/constants/calculator/Keypad';

export default {
  '0': Keypad.ZERO,
  '1': Keypad.ONE,
  '2': Keypad.TWO,
  '3': Keypad.THREE,
  '4': Keypad.FOUR,
  '5': Keypad.FIVE,
  '6': Keypad.SIX,
  '7': Keypad.SEVEN,
  '8': Keypad.EIGHT,
  '9': Keypad.NINE,

  '/': Keypad.DIVIDE,
  '*': Keypad.MULTIPLY,
  '+': Keypad.SUM,
  '-': Keypad.SUBTRACT,

  'Escape': Keypad.CLEAR_ALL,
  'Delete': Keypad.CLEAR_ENTRY,
  'Backspace': Keypad.CLEAR_ONE_CHAR,

  'Enter': Keypad.EQUAL,
  '=': Keypad.EQUAL,
  '.': Keypad.DOT,
};
