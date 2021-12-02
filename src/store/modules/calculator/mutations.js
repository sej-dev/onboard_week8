import Keypad from '@/constants/calculator/Keypad';

import { toIntegerFormatWhenIntegerValue } from '@/store/modules/calculator/utils';

const mutations = {
  pushStack(state, payload) {
    if (payload.type.parent === Keypad.NUMBER) {
      payload.content = toIntegerFormatWhenIntegerValue(payload.content);
    }
    state.stack.push(payload);
  },
  popAndPushStack(state, payload) {
    state.stack.pop();
    state.stack.push(payload);
  },
  clearStack(state) {
    state.stack = [];
  },
  setNumber(state, payload) {
    state.number = payload;
  },
  changeNumberEditMode(state, payload) {
    state.numberEditMode = payload;
  },
  addHistory(state, payload) {
    state.history.push(payload);
  },
};

export default mutations;
