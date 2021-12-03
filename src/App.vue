<template>
  <the-header />
  <calculator-conatiner />
</template>

<script>
import CalculatorConatiner from '@/components/calculator/CalculatorConatiner.vue';
import TheHeader from '@/components/layout/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    CalculatorConatiner,
  },
};
</script>

<style>
#app {
  color: #f4f4f4;
  background-color: #555555;
  height: 100%;
  /* display: grid;
  grid-template-rows: 50px 1fr; */
}
</style>
