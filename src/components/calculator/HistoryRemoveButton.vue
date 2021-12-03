<template>
  <div class="history-bottom">
    <img :src="iconSrc" title="모든 기록 지우기" class="history-remove-button" @click="onRemoveIconClick" />
  </div>
</template>

<script>
import TrashIcon from '@/assets/icon/trash_50.png';
import { useStore } from 'vuex';

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
.history-bottom {
  position: sticky;

  .history-remove-button {
    width: 4vh;
    display: block;
    margin-left: auto;
    padding-right: 10px;
  }
}
</style>
