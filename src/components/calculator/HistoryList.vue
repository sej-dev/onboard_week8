<template>
  <ul class="history-list">
    <li v-for="history in histories" :key="history.formula" class="history-item">
      <div v-html="history.formula" class="formula"></div>
      <div class="result">{{ history.result }}</div>
    </li>
  </ul>
  <history-remove-button />
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
  name: 'HistoryList',
  setup() {
    const store = useStore();
    const histories = computed(() => store.getters['calculator/history']);
    return {
      histories,
    };
  },
};
</script>

<style scoped lang="scss">
.history-list {
  text-align: right;

  .history-item {
    margin: 20px;

    .formula {
      color: #c7c7c7;
      word-spacing: 0.8rem;
    }

    .result {
      font-weight: bold;
      font-size: 2rem;
      margin-top: 1rem;
    }
  }
}
</style>
