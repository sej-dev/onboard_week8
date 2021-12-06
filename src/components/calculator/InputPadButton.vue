<template>
  <template v-if="props.keypad.img">
    <button
      :class="classObject"
      @click="onKeypadClick"
    >
      <img
        class="icon"
        :src="props.keypad.img"
      >
    </button>
  </template>
  <template v-else>
    <button
      :class="classObject"
      @click="onKeypadClick"
      v-html="props.keypad.html"
    />
  </template>
</template>

<script>
import Keypad from '@/class/calculator/Keypad';
import CalculatorColors from '@/constants/color/CalculatorColors';
import { computed, ref } from 'vue';

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
    curKeypad: {
      type: Object,
      default() {
        return null;
      },
      validator(object) {
        return object instanceof Keypad;
      },
    },
    isKeyActive: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  emits: ['click-keypad'],
  setup(props, context) {

    const onKeypadClick = () => {
      context.emit('click-keypad', props.keypad);
    };

    const classObject = computed(() => ({
      'input-pad-button': true,
      'active': props.isKeyActive && props.curKeypad.name === props.keypad.name,
    }));

    return {
      props,
      color: CalculatorColors,
      classObject,
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
  background-color: v-bind('props.style.backgroundColor');

  .icon {
    width: max(1.5rem, 4vmin);
  }

  &:active, &:hover{
    background-color: v-bind('color.keypad.lightGrey');
  }

}
.active{
  background-color: v-bind('color.keypad.lightGrey');
}
</style>
