<template>
  <div class="result-formula" v-html="formula" />
</template>

<script>
import { computed } from 'vue';
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
  color: #c7c7c7;
  font-weight: 100;
  height: 100%;
  line-height: 100%;
}
</style>
