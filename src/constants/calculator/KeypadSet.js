import Keypad from '@/class/calculator/Keypad';
import ClearOneCharIcon from '@/assets/icon/remove_one_50.png';

const KeypadSet = {};

KeypadSet.NUMBER = new Keypad({ name: 'NUMBER' });
KeypadSet.ZERO = new Keypad({ name: 'ZERO', parent: KeypadSet.NUMBER, html: '0' });
KeypadSet.ONE = new Keypad({ name: 'ONE', parent: KeypadSet.NUMBER, html: '1' });
KeypadSet.TWO = new Keypad({ name: 'TWO', parent: KeypadSet.NUMBER, html: '2' });
KeypadSet.THREE = new Keypad({ name: 'THREE', parent: KeypadSet.NUMBER, html: '3' });
KeypadSet.FOUR = new Keypad({ name: 'FOUR', parent: KeypadSet.NUMBER, html: '4' });
KeypadSet.FIVE = new Keypad({ name: 'FIVE', parent: KeypadSet.NUMBER, html: '5' });
KeypadSet.SIX = new Keypad({ name: 'SIX', parent: KeypadSet.NUMBER, html: '6' });
KeypadSet.SEVEN = new Keypad({ name: 'SEVEN', parent: KeypadSet.NUMBER, html: '7' });
KeypadSet.EIGHT = new Keypad({ name: 'EIGHT', parent: KeypadSet.NUMBER, html: '8' });
KeypadSet.NINE = new Keypad({ name: 'NINE', parent: KeypadSet.NUMBER, html: '9' });

KeypadSet.OPERATOR = new Keypad({ name: 'OPERATOR' });
KeypadSet.DIVIDE = new Keypad({ name: 'DIVIDE', parent: KeypadSet.OPERATOR, html: '&#247;' });
KeypadSet.MULTIPLY = new Keypad({ name: 'MULTIPLY', parent: KeypadSet.OPERATOR, html: '&#215;' });
KeypadSet.SUM = new Keypad({ name: 'SUM', parent: KeypadSet.OPERATOR, html: '&#43;' });
KeypadSet.SUBTRACT = new Keypad({ name: 'SUBTRACT', parent: KeypadSet.OPERATOR, html: '&#8722;' });

KeypadSet.CLEAR = new Keypad({ name: 'CLEAR' });
KeypadSet.CLEAR_ALL = new Keypad({ name: 'ALL', parent: KeypadSet.CLEAR, html: 'C' });
KeypadSet.CLEAR_ENTRY = new Keypad({ name: 'ENTRY', parent: KeypadSet.CLEAR, html: 'CE' });
KeypadSet.CLEAR_ONE_CHAR = new Keypad({ name: 'ONE_CHAR', parent: KeypadSet.CLEAR, img: ClearOneCharIcon });

KeypadSet.EQUAL = new Keypad({ name: 'EQUAL', html: '&#61;' });

KeypadSet.DOT = new Keypad({ name: 'DOT', html: '.' });

KeypadSet.NEGATE = new Keypad({ name: 'NEGATE', html: '+/-' });

KeypadSet.EMPTY = new Keypad({ name: 'EMPTY', html: '' });

export default KeypadSet;
