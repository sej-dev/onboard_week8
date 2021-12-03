<template>
  <div
    class="history-container"
    :class="classObject"
  >
    <p
      v-if="hasHistory === false"
      class="history-empty"
    >
      아직 기록이 없음
    </p>
    <history-list v-else />
  </div>
</template>

<script>
import HistoryList from "@/components/calculator/HistoryList.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "HistoryContainer",
  components: { HistoryList },
  setup() {
    const store = useStore();
    const hasHistory = computed(
      () => store.state.calculator.history.length > 0
    );

    return {
      hasHistory,
    };
  },
};
</script>

<style scoped lang="scss">
.history-container {
  background-color: rgba(17, 17, 17, 0.5);

  height: 70%;
  .history-empty {
    padding: 20px;
    font-size: 2vmin;
    font-weight: bold;
  }
}
</style>
