<template>
  <div class="result-formula" v-html="formula"></div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: 'ResultFormula',
  setup() {
    const store = useStore();
    const formula = computed(() => store.getters['calculator/formula']);

    return {
      formula,
    };
  },
};
</script>

<style scoped>
.result-formula {
  font-size: 1.25rem;
  height: 100%;
  line-height: 100%;
}
</style>
