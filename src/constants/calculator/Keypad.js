import KeypadEnum from '@/class/KeypadEnum';

const Keypad = {};

Keypad.NUMBER = new KeypadEnum('NUMBER', null, null);
Keypad.ZERO = new KeypadEnum('ZERO', Keypad.NUMBER, '0');
Keypad.ONE = new KeypadEnum('ONE', Keypad.NUMBER, '1');
Keypad.TWO = new KeypadEnum('TWO', Keypad.NUMBER, '2');
Keypad.THREE = new KeypadEnum('THREE', Keypad.NUMBER, '3');
Keypad.FOUR = new KeypadEnum('FOUR', Keypad.NUMBER, '4');
Keypad.FIVE = new KeypadEnum('FIVE', Keypad.NUMBER, '5');
Keypad.SIX = new KeypadEnum('SIX', Keypad.NUMBER, '6');
Keypad.SEVEN = new KeypadEnum('SEVEN', Keypad.NUMBER, '7');
Keypad.EIGHT = new KeypadEnum('EIGHT', Keypad.NUMBER, '8');
Keypad.NINE = new KeypadEnum('NINE', Keypad.NUMBER, '9');

Keypad.OPERATOR = new KeypadEnum('OPERATOR', null, null);
Keypad.DIVIDE = new KeypadEnum('DIVIDE', Keypad.OPERATOR, '&#247;');
Keypad.MULTIPLY = new KeypadEnum('MULTIPLY', Keypad.OPERATOR, '&#215;');
Keypad.SUM = new KeypadEnum('SUM', Keypad.OPERATOR, '&#43;');
Keypad.SUBTRACT = new KeypadEnum('SUBTRACT', Keypad.OPERATOR, '&#8722;');

Keypad.CLEAR = new KeypadEnum('CLEAR', null, null);
Keypad.CLEAR_ALL = new KeypadEnum('ALL', Keypad.CLEAR, 'C');
Keypad.CLEAR_ENTRY = new KeypadEnum('ENTRY', Keypad.CLEAR, 'CE');
Keypad.CLEAR_ONE_CHAR = new KeypadEnum('ONE_CHAR', Keypad.CLEAR, '');

Keypad.EQUAL = new KeypadEnum('EQUAL', null, '&#61;');

Keypad.DOT = new KeypadEnum('DOT', null, '.');

Keypad.NEGATE = new KeypadEnum('NEGATE', null, '+/-');

Keypad.EMPTY = new KeypadEnum('EMPTY', null, '');

export default Keypad;
