import mutations from '@/store/modules/calculator/mutations';
import actions from '@/store/modules/calculator/actions';

const state = () => ({
  stack: [],
  number: '0',
  numberEditMode: 'replace', // [ replace, append ],
  history: [], // [ { stack: [], number } ]
});

const getters = {
  formula: (state) => {
    return state.stack.map((pad) => pad.content).join(' ');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
