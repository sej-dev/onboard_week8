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

import { addComma } from '@/utils/calculator';

export default {
  name: 'HistoryList',
  components: { HistoryRemoveButton },
  setup() {
    const store = useStore();
    const histories = computed(() => store.getters['calculator/history']);

    return {
      histories,
      addComma,
    };
  },
};
</script>

<style scoped lang="scss">
.history-list {
  text-align: right;
  padding: 10px;

  overflow-y: auto;
  max-height: inherit;

  .history-item {
    margin: 20px 0 20px 0;

    .formula {
      color: #c7c7c7;
      word-spacing: 0.8vw;
    }

    .result {
      font-weight: 600;
      font-size: 4vw;
      margin-top: 2vh;
    }
  }
}
</style>
