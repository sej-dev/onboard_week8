<template>
  <div class="formula">
    <span v-html="formula" />
  </div>
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
.formula {
  height: 40px;
}
</style>
