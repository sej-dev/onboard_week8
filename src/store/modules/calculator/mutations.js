import Keypad from '@/constants/calculator/Keypad';

import { toFomatNumberByPreCondition } from '@/store/modules/calculator/utils';

const mutations = {
  // actions 내부에서만 쓰이는 mutation
  pushStack(state, payload) {
    if (payload.type.parent === Keypad.NUMBER) {
      payload.content = toFomatNumberByPreCondition(payload.content);
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
  replaceStackIndexOf(state, payload){
    const { index, token } = payload;
    state.stack[index] = token;
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

  setError(state, payload) {
    state.error.hasError = true;
    state.error.code = payload;
  },

  // 컴포넌트에서 사용하는 mutation
  unsetError(state) {
    state.error.hasError = false;
    state.error.code = null;
  },
  clearHistories(state) {
    state.history = [];
  },

  // css state 변경하는 mutation
  toggleHistoryList(state) {
    state.css.showHistory = !state.css.showHistory;
  },
};

export default mutations;
