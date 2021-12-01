import { createStore } from 'vuex';
import calculator from '@/store/modules/calculator';

export default createStore({
  modules: {
    calculator,
  },
});
