<template>
  <div class="input-pad">
    <div
      v-for="(rowOfButtons, idx) in buttons"
      :key="idx"
      class="input-pad-row"
    >
      <input-pad-button
        v-for="button in rowOfButtons"
        :key="button.keypad.name"
        v-bind="button"
        @click-keypad="onClickKeypad"
      />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted } from 'vue';

import InputPadButton from '@/components/calculator/InputPadButton.vue';

import useKeypadInput from '@/composables/useKeypadInput';
import KeypadSet from '@/constants/calculator/KeypadSet';
import KeyboardSet from '@/constants/calculator/KeyboardSet';
import CalculatorColors from '@/constants/color/CalculatorColors';

export default {
  name: 'InputPad',
  components: { InputPadButton },
  setup() {
    const { handleKeypadInput } = useKeypadInput();

    // 입력에 따라 토큰을 생성하고 vuex에 저장
    const onClickKeypad = (keypad) => handleKeypadInput(keypad);

    const onKeydown = ({ key }) => {
      const keypad = KeyboardSet[key];
      if (keypad) handleKeypadInput(keypad);
    };

    onMounted(() => {
      // keydown event 처리
      document.addEventListener('keydown', onKeydown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onKeydown);
    });

    return {
      buttons,

      onClickKeypad,
    };
  },
};

function makeProps(keypad, style) {
  return {
    keypad,
    style,
  };
}

const midGrey = { backgroundColor: CalculatorColors.keypad.midGrey };
const darkGrey = { backgroundColor: CalculatorColors.keypad.darkGrey };
const midBlue = { backgroundColor: CalculatorColors.keypad.midBlue };

const buttons = [
  [
    makeProps(KeypadSet.EMPTY, midGrey),
    makeProps(KeypadSet.CLEAR_ENTRY, midGrey),
    makeProps(KeypadSet.CLEAR_ALL, midGrey),
    makeProps(KeypadSet.CLEAR_ONE_CHAR, midGrey),
  ],
  [ 
    makeProps(KeypadSet.EMPTY, midGrey), 
    makeProps(KeypadSet.EMPTY, midGrey), 
    makeProps(KeypadSet.EMPTY, midGrey), 
    makeProps(KeypadSet.DIVIDE, midGrey)
  ],
  [
    makeProps(KeypadSet.SEVEN, darkGrey), 
    makeProps(KeypadSet.EIGHT, darkGrey), 
    makeProps(KeypadSet.NINE, darkGrey), 
    makeProps(KeypadSet.MULTIPLY, midGrey)
  ],
  [
    makeProps(KeypadSet.FOUR, darkGrey), 
    makeProps(KeypadSet.FIVE, darkGrey), 
    makeProps(KeypadSet.SIX, darkGrey),
    makeProps(KeypadSet.SUBTRACT, midGrey)
  ],
  [
    makeProps(KeypadSet.ONE, darkGrey),
    makeProps(KeypadSet.TWO, darkGrey),
    makeProps(KeypadSet.THREE, darkGrey),
    makeProps(KeypadSet.SUM, midGrey)
  ],
  [
    makeProps(KeypadSet.NEGATE, darkGrey),
    makeProps(KeypadSet.ZERO, darkGrey),
    makeProps(KeypadSet.DOT, darkGrey), 
    makeProps(KeypadSet.EQUAL, midBlue)
  ],
];
</script>

<style scoped lang="scss">
.input-pad {
  height: 70%;

  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 3px;

  .input-pad-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3px;
  }
}
</style>
