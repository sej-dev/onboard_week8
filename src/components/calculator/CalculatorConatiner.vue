<template>
  <section class="calculator">
    <result-conatiner />
    <input-pad />
    <history-container />
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

<style>
.calculator {
  font-size: 16px;
}
</style>
