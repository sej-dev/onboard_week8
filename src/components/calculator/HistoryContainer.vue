<template>
  <div
    class="history-container"
    :class="classObject"
  >
    <p
      v-if="hasHistory === false"
      class="history-empty"
    >
      아직 기록이 없음
    </p>
    <history-list v-else />
  </div>
</template>

<script>
import HistoryList from '@/components/calculator/HistoryList.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import CalculatorColors from '@/constants/color/CalculatorColors';

export default {
  name: 'HistoryContainer',
  components: { HistoryList },
  setup() {
    const store = useStore();
    const hasHistory = computed(() => store.state.calculator.history.length > 0);

    return {
      hasHistory,
      color: CalculatorColors,
    };
  },
};
</script>

<style scoped lang="scss">
.history-container {
  background-color: v-bind('color.history.grey');

  height: 70%;
  .history-empty {
    padding: 20px;
    font-size: max(1.5rem, 2vmin);
    font-weight: bold;
  }
}
</style>
