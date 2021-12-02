<template>
  <button v-html="props.keypad.html" class="input-pad-button" :style="props.style" @click="onClick"></button>
</template>

<script>
import KeypadEnum from '@/class/KeypadEnum';

export default {
  name: 'InputPadButton',
  props: {
    keypad: {
      required: true,
      validator(object) {
        return object instanceof KeypadEnum;
      },
    },
    style: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: {
    click: null,
  },
  setup(props, context) {
    const onClick = () => {
      context.emit('click-pad', props.keypad);
    };

    return {
      props,

      onClick,
    };
  },
};
</script>

<style scoped>
.input-pad-button {
  width: 25%;
  font-size: 40px;
  text-align: center;
  margin: 2px;
  color: #f4f4f4;
}
</style>
