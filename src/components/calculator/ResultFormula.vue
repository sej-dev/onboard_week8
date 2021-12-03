<template>
  <div class="result-formula" v-html="formula" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import CalculatorColors from '@/constants/color/CalculatorColors';

export default {
  name: 'ResultFormula',
  setup() {
    const store = useStore();
    const formula = computed(() => store.getters['calculator/formula']);

    return {
      formula,
      color: CalculatorColors,
    };
  },
};
</script>

<style scoped>
.result-formula {
  flex-grow: 1;

  display: flex;
  justify-content: end;
  align-items: center;

  color: v-bind('color.font.darkWhite');
  font-weight: 100;

}
</style>
