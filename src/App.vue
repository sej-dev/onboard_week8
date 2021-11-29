<template>
  <the-header />
  <calculator-conatiner />
</template>

<script>
import CalculatorConatiner from './components/calculator/CalculatorConatiner.vue'
import TheHeader from './components/layout/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader, CalculatorConatiner
  }
}
</script>

<style>

</style>
