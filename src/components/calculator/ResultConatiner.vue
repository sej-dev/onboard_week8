<template>
  <div class="result-container">
    <img class="history" :src="historyIcon" alt="이전 기록 아이콘" />
    <result-formula />
    <result-value />
  </div>
</template>

<script>
import ResultFormula from '@/components/calculator/ResultFormula.vue';
import ResultValue from '@/components/calculator/ResultValue.vue';

import HistoryIcon from '@/assets/icon/history_50.png';

export default {
  components: { ResultFormula, ResultValue },
  name: 'ResultContainer',
  setup() {
    return {
      historyIcon: HistoryIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.result-container {
  text-align: right;
  padding: 10px;
  display: grid;
  grid-template-rows: 1fr 2fr 4fr;

  .history {
    margin-left: auto;
    width: 20px;
  }
}
</style>
