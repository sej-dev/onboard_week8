<template>
  <section class="calcultor-container">
    <result-conatiner />
    <input-pad />
    <history-container :class="classObject" />
  </section>
</template>

<script>
import HistoryContainer from '@/components/calculator/HistoryContainer.vue';
import InputPad from '@/components/calculator/InputPad.vue';
import ResultConatiner from '@/components/calculator/ResultConatiner.vue';
import { computed } from '@vue/reactivity';

export default {
  components: { ResultConatiner, InputPad, HistoryContainer },
  name: 'CalculatorContainer',
  setup() {
    const showHistory = computed(() => store.state.calculator.css.showHistory);
    return {
      showHistory,
      classObject: {
        slideUp: showHistory,
      },
    };
  },
};
</script>

<style scoped lang="scss">
.calcultor-container {
  display: grid;
  grid-template-rows: 1fr 2fr;
  padding: 5px;
}
</style>
