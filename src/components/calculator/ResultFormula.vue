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
  flex-grow: 1;

  display: flex;
  justify-content: end;
  align-items: center;

  color: #c7c7c7;
  font-weight: 100;

}
</style>
