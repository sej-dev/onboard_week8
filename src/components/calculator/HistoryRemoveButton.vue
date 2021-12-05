<template>
  <div class="history-remove-button-block">
    <img
      :src="iconSrc"
      title="모든 기록 지우기"
      class="history-remove-button"
      @click="onRemoveIconClick"
    >
  </div>
</template>

<script>
import { useStore } from 'vuex';

import TrashIcon from '@/assets/icon/trash_50.png';

export default {
  name: 'HistoryRemoveButton',
  setup() {
    const store = useStore();
    const onRemoveIconClick = () => {
      store.commit('calculator/clearHistories');
    };
    return {
      iconSrc: TrashIcon,

      onRemoveIconClick,
    };
  },
};
</script>

<style scoped lang="scss">
.history-remove-button-block {
  height: 70px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  .history-remove-button {
    width: 40px;
    height: 40px;
    padding-right: 20px;
  }
}
</style>
