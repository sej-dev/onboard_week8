export default class Keypad {
  
  constructor({ name, parent, html, img }) {
    this.name = name;
    this.parent = parent; // type of Keypad
    this.html = html;
    this.img = img;
  }

  equalTo(anotherKeypad) {
    if (!anotherKeypad) return false;

    return anotherKeypad.name === this.name;
  }
}
