<template>
  <div class="input-pad">
    <div class="input-pad-row" v-for="row in buttons" :key="row[0].key">
      <input-pad-button v-for="button in row" :key="button.keypad.type" v-bind="button" @click-pad="onClickPad" />
    </div>
  </div>
</template>

<script>
import InputPadButton from '@/components/calculator/InputPadButton.vue';

import { onMounted } from 'vue';

import usePadInput from '@/composables/usePadInput';

import Keypad from '@/constants/calculator/Keypad';
import Keyboard from '@/constants/calculator/Keyboard';

export default {
  components: { InputPadButton },
  name: 'InputPad',
  setup() {
    const { handlePadInput } = usePadInput();

    // operator 또는 = 입력 시 토큰을 생성하고 vuex에 저장
    const onClickPad = (keypad) => handlePadInput(keypad);

    onMounted(() => {
      // handle keydown event
      document.addEventListener('keydown', ({ key }) => {
        const keypad = Keyboard[key];
        if (keypad) handlePadInput(keypad);
      });
    });

    return {
      buttons,

      onClickPad,
    };
  },
};

function makeProps(keypad, style) {
  return {
    keypad,
    style,
  };
}

// TODO: 에러 있을 경우 숫자 제외하고 disable
const midGrey = { backgroundColor: '#343434' };
const darkGrey = { backgroundColor: '#111111' };
const midBlue = { backgroundColor: '' };

// TODO: 이미지를 넘겼을 때는 어떻게 처리하면 좋을지 생각
const buttons = [
  [
    makeProps(Keypad.EMPTY, midGrey),
    makeProps(Keypad.CLEAR_ENTRY, midGrey),
    makeProps(Keypad.CLEAR_ALL, midGrey),
    makeProps(Keypad.CLEAR_ONE_CHAR, midGrey),
  ],
  [makeProps(Keypad.EMPTY, midGrey), makeProps(Keypad.EMPTY, midGrey), makeProps(Keypad.EMPTY, midGrey), makeProps(Keypad.DIVIDE, midGrey)],
  [makeProps(Keypad.SEVEN, darkGrey), makeProps(Keypad.EIGHT, darkGrey), makeProps(Keypad.NINE, darkGrey), makeProps(Keypad.MULTIPLY, midGrey)],
  [makeProps(Keypad.FOUR, darkGrey), makeProps(Keypad.FIVE, darkGrey), makeProps(Keypad.SIX, darkGrey), makeProps(Keypad.SUBTRACT, midGrey)],
  [makeProps(Keypad.ONE, darkGrey), makeProps(Keypad.TWO, darkGrey), makeProps(Keypad.THREE, darkGrey), makeProps(Keypad.SUM, midGrey)],
  [makeProps(Keypad.NEGATE, darkGrey), makeProps(Keypad.ZERO, darkGrey), makeProps(Keypad.DOT, darkGrey), makeProps(Keypad.EQUAL, darkGrey)],
];
</script>

<style scoped lang="scss">
.input-pad {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 3px;

  .input-pad-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 3px;
  }
}
</style>
