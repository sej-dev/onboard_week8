<template>
  <button
    v-html="props.content"
    class="input-pad-button"
    :style="props.style"
    @click="onClick"
  ></button>
</template>

<script>
export default {
  name: 'InputPadButton',
  props: {
    nameTag: String, // keypad 상수
    content: [String, Image], // 화면에 표시할 값
    style: Object,
  },
  emits: {
    click: null,
  },
  setup(props, context) {
    const onClick = () => {
      context.emit('click-pad', {
        nameTag: props.nameTag,
        content: props.content,
      });
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
