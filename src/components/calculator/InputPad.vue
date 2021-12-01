<template>
  <div class="input-pad">
    <div class="input-pad-row" v-for="row in buttons" :key="row[0].key">
      <input-pad-button v-for="button in row" :key="button.nameTag" v-bind="button" @click-pad="onClickPad" />
    </div>
  </div>
</template>

<script>
import InputPadButton from '@/components/calculator/InputPadButton.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';

import KeyPad from '@/constants/KeyPad';
import RemoveOneIcon from '@/assets/icon/remove_one_50.png';

const OPERATORS = [...Object.keys(KeyPad.OPERATOR)];
const CLEARS = [...Object.keys(KeyPad.CLEAR)];

export default {
  components: { InputPadButton },
  name: 'InputPad',
  setup() {
    const store = useStore();
    const number = computed(() => store.state.calculator.number);

    // operator 또는 = 입력 시 토큰을 생성하고 vuex에 저장
    const onClickPad = (pad) => {
      // 숫자
      const isDigit = Object.keys(KeyPad.NUMBER).includes(pad.nameTag);
      if (isDigit) {
        store.dispatch('calculator/combineDigit', {
          digit: pad.content,
        });
        return;
      }

      // .
      if (pad.nameTag === KeyPad.DOT) {
        store.dispatch('calculator/handleDot', {
          numberToken: {
            nameTag: KeyPad.NUMBER.SELF,
            content: number.value,
          },
        });
      }

      // negate
      if (pad.nameTag === KeyPad.NEGATE) {
        store.dispatch('calculator/handleNegate');
        return;
      }

      // operator
      if (OPERATORS.includes(pad.nameTag)) {
        store.dispatch('calculator/handleOperator', {
          numberToken: {
            nameTag: KeyPad.NUMBER.SELF,
            content: number.value,
          },
          operatorToken: pad,
        });
        return;
      }

      // =
      if (pad.nameTag === KeyPad.EQUAL) {
        store.dispatch('calculator/handleEqual', {
          numberToken: {
            nameTag: KeyPad.NUMBER.SELF,
            content: number.value,
          },
          operatorToken: pad,
        });
        return;
      }

      // 삭제 3개
      if (CLEARS.includes(pad.nameTag)) {
        store.dispatch('calculator/handleClear', {
          token: pad,
        });
      }
    };

    return {
      buttons,

      onClickPad,
    };
  },
};

function makeProps(nameTag, content, style) {
  return {
    nameTag,
    content,
    style,
  };
}

const midGrey = { backgroundColor: '#343434' };
const darkGrey = { backgroundColor: '#111111' };
const midBlue = { backgroundColor: '' };

const EMPTY = makeProps('empty', '', midGrey);

// TODO: 이미지를 넘겼을 때는 어떻게 처리하면 좋을지 생각
const buttons = [
  [EMPTY, makeProps(KeyPad.CLEAR.ENTRY, 'CE', midGrey), makeProps(KeyPad.CLEAR.ALL, 'C', midGrey), makeProps(KeyPad.CLEAR.ONE_CHAR, '', midGrey)],
  [EMPTY, EMPTY, EMPTY, makeProps(KeyPad.OPERATOR.DIVIDE, '&#247;', midGrey)],
  [
    makeProps(KeyPad.NUMBER.SEVEN, '7', darkGrey),
    makeProps(KeyPad.NUMBER.EIGHT, '8', darkGrey),
    makeProps(KeyPad.NUMBER.NINE, '9', darkGrey),
    makeProps(KeyPad.OPERATOR.MULTIPLY, '&#215;', midGrey),
  ],
  [
    makeProps(KeyPad.NUMBER.FOUR, '4', darkGrey),
    makeProps(KeyPad.NUMBER.FIVE, '5', darkGrey),
    makeProps(KeyPad.NUMBER.SIX, '6', darkGrey),
    makeProps(KeyPad.OPERATOR.SUBTRACT, '&#8722;', midGrey),
  ],
  [
    makeProps(KeyPad.NUMBER.ONE, '1', darkGrey),
    makeProps(KeyPad.NUMBER.TWO, '2', darkGrey),
    makeProps(KeyPad.NUMBER.THREE, '3', darkGrey),
    makeProps(KeyPad.OPERATOR.SUM, '&#43;', midGrey),
  ],
  [
    makeProps(KeyPad.NEGATE, '+/-', darkGrey),
    makeProps(KeyPad.NUMBER.ZERO, '0', darkGrey),
    makeProps(KeyPad.DOT, '.', darkGrey),
    makeProps(KeyPad.EQUAL, '&#61;', darkGrey),
  ],
];
</script>

<style scoped>
.input-pad-row {
  display: flex;
  justify-content: space-between;
}
</style>
