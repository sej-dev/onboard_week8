<template> 
  <section>
    <result-conatiner />
    <input-pad />
    <history-container v-if="false" />
  </section>
</template>

<script>
import HistoryContainer from './HistoryContainer.vue'
import InputPad from './InputPad.vue'
import ResultConatiner from './ResultConatiner.vue'

export default {
  components: { ResultConatiner, InputPad, HistoryContainer },
  name: 'CalculatorContainer',
}
</script>

<style>

</style>