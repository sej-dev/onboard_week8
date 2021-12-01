<template>
  <p v-if="histories.length === 0">아직 기록이 없음</p>
  <ul v-else>
    <li v-for="history in histories" :key="history.formula">
      <div v-html="history.formula"></div>
      <div>{{ history.result }}</div>
    </li>
  </ul>
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

<style></style>
