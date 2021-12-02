export default class KeypadEnum {
  constructor({ name, parent, html, img }) {
    this.name = name;
    this.parent = parent; // KeypadEnum type
    this.html = html;
    this.img = img;
  }

  equalTo(anotherKeypadEnum) {
    if (!anotherKeypadEnum) return false;
    return anotherKeypadEnum.name === this.name;
  }
}
