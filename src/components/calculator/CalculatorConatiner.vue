<template>
  <section class="calcultor-container">
    <result-conatiner />
    <input-pad />
    <history-container v-if="false" />
  </section>
</template>

<script>
import HistoryContainer from '@/components/calculator/HistoryContainer.vue';
import InputPad from '@/components/calculator/InputPad.vue';
import ResultConatiner from '@/components/calculator/ResultConatiner.vue';

export default {
  components: { ResultConatiner, InputPad, HistoryContainer },
  name: 'CalculatorContainer',
};
</script>

<style scoped>
.calcultor-container {
  display: grid;
  grid-template-rows: 1fr 2fr;
  padding: 5px;
}
</style>
