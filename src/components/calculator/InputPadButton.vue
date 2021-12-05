<template>
  <template v-if="props.keypad.img">
    <button
      class="input-pad-button"
      :style="props.style"
      @click="onClick"
    >
      <img
        class="icon"
        :src="props.keypad.img"
      >
    </button>
  </template>
  <template v-else>
    <button
      class="input-pad-button"
      :style="props.style"
      @click="onKeypadClick"
      v-html="props.keypad.html"
    />
  </template>
</template>

<script>
import Keypad from '@/class/calculator/Keypad';
import CalculatorColors from '@/constants/color/CalculatorColors';

export default {
  name: 'InputPadButton',
  props: {
    keypad: {
      required: true,
      validator(object) {
        return object instanceof Keypad;
      },
    },
    style: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['click-keypad'],
  setup(props, context) {
    const onKeypadClick = () => {
      context.emit('click-keypad', props.keypad);
    };

    return {
      props,
      color: CalculatorColors,
      onKeypadClick,
    };
  },
};
</script>

<style scoped lang="scss">
.input-pad-button {

  font-size: max(1.5rem, 4vmin);
  text-align: center;
  color: v-bind('color.font.white');

  .icon {
    width: max(1.5rem, 4vmin);
  }
}
</style>
