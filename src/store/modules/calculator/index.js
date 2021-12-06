import mutations from '@/store/modules/calculator/mutations';
import actions from '@/store/modules/calculator/actions';

const state = () => ({
  stack: [],
  number: '0',
  numberEditMode: 'replace', // 'replace', 'append'
  history: [], // [ { stack: [], number }, ... ]
  error: {
    hasError: false,
    code: null, // type of ErrorCode
  },
  css: {
    showHistory: false,
  },
});

const getters = {
  // stack의 ['1', '-', '2'] -> '1 - 2'
  formula(state) {
    return state.stack.map((token) => token.content).join(' ');
  },
  history(state) {
    return state.history.map(({ stack, number }) => ({
      formula: stack.map((token) => token.content).join(' '),
      result: number,
    }));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
