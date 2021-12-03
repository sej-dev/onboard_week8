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
      @click="onClick"
      v-html="props.keypad.html"
    />
  </template>
</template>

<script>
import KeypadEnum from '@/class/calculator/KeypadEnum';

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

<style scoped lang="scss">
.input-pad-button {

  font-size: 4vmin;
  text-align: center;
  color: #f4f4f4;

  .icon {
    width: 4vmin;
  }
}
</style>
