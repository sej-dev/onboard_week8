<template>
  <div class="value">
    {{ number }}
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ResultValue',
  setup() {
    const store = useStore();
    const number = computed(() => store.state.calculator.number);
    return {
      number,
    };
  },
};
</script>

<style scoped>
.value {
  font-size: 80px;
  font-weight: bold;
}
</style>
