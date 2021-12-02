import KeypadEnum from '@/class/calculator/KeypadEnum';
import ClearOneCharIcon from '@/assets/icon/remove_one_50.png';

const Keypad = {};

Keypad.NUMBER = new KeypadEnum({ name: 'NUMBER' });
Keypad.ZERO = new KeypadEnum({ name: 'ZERO', parent: Keypad.NUMBER, html: '0' });
Keypad.ONE = new KeypadEnum({ name: 'ONE', parent: Keypad.NUMBER, html: '1' });
Keypad.TWO = new KeypadEnum({ name: 'TWO', parent: Keypad.NUMBER, html: '2' });
Keypad.THREE = new KeypadEnum({ name: 'THREE', parent: Keypad.NUMBER, html: '3' });
Keypad.FOUR = new KeypadEnum({ name: 'FOUR', parent: Keypad.NUMBER, html: '4' });
Keypad.FIVE = new KeypadEnum({ name: 'FIVE', parent: Keypad.NUMBER, html: '5' });
Keypad.SIX = new KeypadEnum({ name: 'SIX', parent: Keypad.NUMBER, html: '6' });
Keypad.SEVEN = new KeypadEnum({ name: 'SEVEN', parent: Keypad.NUMBER, html: '7' });
Keypad.EIGHT = new KeypadEnum({ name: 'EIGHT', parent: Keypad.NUMBER, html: '8' });
Keypad.NINE = new KeypadEnum({ name: 'NINE', parent: Keypad.NUMBER, html: '9' });

Keypad.OPERATOR = new KeypadEnum({ name: 'OPERATOR' });
Keypad.DIVIDE = new KeypadEnum({ name: 'DIVIDE', parent: Keypad.OPERATOR, html: '&#247;' });
Keypad.MULTIPLY = new KeypadEnum({ name: 'MULTIPLY', parent: Keypad.OPERATOR, html: '&#215;' });
Keypad.SUM = new KeypadEnum({ name: 'SUM', parent: Keypad.OPERATOR, html: '&#43;' });
Keypad.SUBTRACT = new KeypadEnum({ name: 'SUBTRACT', parent: Keypad.OPERATOR, html: '&#8722;' });

Keypad.CLEAR = new KeypadEnum({ name: 'CLEAR' });
Keypad.CLEAR_ALL = new KeypadEnum({ name: 'ALL', parent: Keypad.CLEAR, html: 'C' });
Keypad.CLEAR_ENTRY = new KeypadEnum({ name: 'ENTRY', parent: Keypad.CLEAR, html: 'CE' });
Keypad.CLEAR_ONE_CHAR = new KeypadEnum({ name: 'ONE_CHAR', parent: Keypad.CLEAR, img: ClearOneCharIcon });

Keypad.EQUAL = new KeypadEnum({ name: 'EQUAL', html: '&#61;' });

Keypad.DOT = new KeypadEnum({ name: 'DOT', html: '.' });

Keypad.NEGATE = new KeypadEnum({ name: 'NEGATE', html: '+/-' });

Keypad.EMPTY = new KeypadEnum({ name: 'EMPTY', html: '' });

export default Keypad;
