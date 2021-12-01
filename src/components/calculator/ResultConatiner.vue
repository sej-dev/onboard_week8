<template>
  <div class="result">
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
.result {
  text-align: right;

  .history {
    width: 20px;
  }
}
</style>
