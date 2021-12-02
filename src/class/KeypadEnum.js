export default class KeypadEnum {
  constructor(name, parent, html) {
    this.name = name;
    this.parent = parent; // 같은 KeypadEnum
    this.html = html;
  }

  equalTo(anotherKeypadEnum) {
    if (!anotherKeypadEnum) return false;
    return anotherKeypadEnum.name === this.name;
  }
}
