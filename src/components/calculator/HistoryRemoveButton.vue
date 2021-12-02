<template>
  <img :src="iconSrc" alt="히스토리 삭제 버튼" class="history-remove-button" @click="onRemoveIconClick" />
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
