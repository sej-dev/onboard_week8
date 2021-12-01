<template>
  <history-list />
  <history-remove-button />
</template>

<script>
import HistoryList from './HistoryList.vue';
import HistoryRemoveButton from './HistoryRemoveButton.vue';

export default {
  name: 'HistoryContainer',
  components: { HistoryList, HistoryRemoveButton },
};
</script>

<style scoped></style>
