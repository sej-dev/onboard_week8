<template>
  <history-list />
  <history-remove-button />
</template>

<script>
import HistoryList from '@/components/calculator/HistoryList.vue';
import HistoryRemoveButton from '@/components/calculator/HistoryRemoveButton.vue';

export default {
  name: 'HistoryContainer',
  components: { HistoryList, HistoryRemoveButton },
};
</script>

<style scoped></style>
