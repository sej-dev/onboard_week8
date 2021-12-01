import KeyPad from '@/constants/KeyPad';

const mutations = {
  pushStack(state, payload) {
    if (payload.nameTag === KeyPad.NUMBER.SELF) {
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

function toIntegerFormatWhenIntegerValue(num) {
  return isInteger(num) ? parseInt(num, 10).toString() : num;
}

function isInteger(num) {
  const numStr = num.toString();
  if (/^\d+\.0*$/.test(numStr)) return true;
  return false;
}

export default mutations;
