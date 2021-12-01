<template>
  <img :src="iconSrc" alt="히스토리 삭제 버튼" />
</template>

<script>
import TrashIcon from '@/assets/icon/trash_50.png';

export default {
  name: 'HistoryRemoveButton',
  setup() {
    return {
      iconSrc: TrashIcon,
    };
  },
};
</script>

<style></style>
