<template>
  <div class="result-container">
    <div>
      <img
        class="history-icon"
        :src="historyIcon"
        alt="이전 기록 아이콘"
        @click="onHistoryBtnClick"
      >
    </div>
    <result-formula />
    <result-value />
  </div>
</template>

<script>
import ResultFormula from '@/components/calculator/ResultFormula.vue';
import ResultValue from '@/components/calculator/ResultValue.vue';

import HistoryIcon from '@/assets/icon/history_50.png';
import { useStore } from 'vuex';

export default {
  name: 'ResultContainer',
  components: { ResultFormula, ResultValue },

  setup() {
    const store = useStore();
    const onHistoryBtnClick = () => {
      store.commit('calculator/toggleHistoryListView');
    };

    return {
      historyIcon: HistoryIcon,

      onHistoryBtnClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.result-container {
  height: 30%;
  padding-right: 20px;
  text-align: right;

  display: flex;
  flex-direction: column;
  
  .history-icon {
    width: 30px;
  }
}
</style>
