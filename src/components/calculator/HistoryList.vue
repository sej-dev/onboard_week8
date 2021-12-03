<template>
  <ul class="history-list">
    <li
      v-for="history in histories"
      :key="history.formula"
      class="history-item"
    >
      <div
        class="formula"
        v-html="history.formula"
      />
      <div class="result">
        {{ addComma(history.result) }}
      </div>
    </li>
  </ul>
  <history-remove-button />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import HistoryRemoveButton from '@/components/calculator/HistoryRemoveButton.vue';

import { addComma } from '@/utils/calculatorUtils';

import CalculatorColors from "@/constants/color/CalculatorColors";

export default {
  name: 'HistoryList',
  components: { HistoryRemoveButton },
  setup() {
    const store = useStore();
    const histories = computed(() => store.getters['calculator/history']);

    return {
      histories,
      color: CalculatorColors,
      addComma,
    };
  },
};
</script>

<style scoped lang="scss">
.history-list {
  text-align: right;

  overflow-y: auto;
  height: calc(100% - 70px);

  .history-item {
    padding: 20px;

    .formula {
      color: v-bind('color.font.darkWhite');
      word-spacing: max(0.5rem, 0.8vmin);
    }

    .result {
      font-weight: 600;
      font-size: max(2rem, 3vmin);
      margin-top: 15px;
    }
  }
}
</style>
