<template>
  <div class="result-value">
    {{ arithmeticError.hasError ? arithmeticError.code.userMsg : addComma(number) }}
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { addComma } from '@/utils/calculator';

export default {
  name: 'ResultValue',
  setup() {
    const store = useStore();
    const number = computed(() => store.state.calculator.number);
    const arithmeticError = computed(() => store.state.calculator.error);

    return {
      number,
      arithmeticError,

      addComma,
    };
  },
};
</script>

<style scoped>
.result-value {
  flex-grow: 2;
  
  display: flex;
  justify-content: end;
  align-items: center;

  font-size: 7vmin;
  font-weight: bold;
}
</style>
