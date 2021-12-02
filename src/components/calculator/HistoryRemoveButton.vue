<template>
  <img :src="iconSrc" title="모든 기록 지우기" class="history-remove-button" @click="onRemoveIconClick" />
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

<style>
.history-remove-button {
  position: sticky;
  width: 2rem;
  margin-left: auto;
  margin-right: 20px;
}
</style>
