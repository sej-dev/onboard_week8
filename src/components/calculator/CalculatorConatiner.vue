<template>
  <div class="calcultor-container">
    <result-conatiner />
    <input-pad v-show="!showHistory" />
    <history-container v-show="showHistory" />
  </div>
</template>

<script>
import HistoryContainer from '@/components/calculator/HistoryContainer.vue';
import InputPad from '@/components/calculator/InputPad.vue';
import ResultConatiner from '@/components/calculator/ResultConatiner.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CalculatorContainer',
  components: { ResultConatiner, InputPad, HistoryContainer },

  setup() {
    const store = useStore();
    const showHistory = computed(() => store.state.calculator.css.showHistory);

    return {
      showHistory,
    };
  },
};
</script>

<style scoped>
.calcultor-container {
  height: calc(100% - 50px);
}
</style>
