import { computed } from 'vue';
import { useStore } from 'vuex';

import Keypad from '@/constants/calculator/Keypad';
import CalculatorToken from '@/class/calculator/CalculatorToken';
import { isLengthExceeded } from '@/utils/calculator';

function usePadInput() {
  const store = useStore();
  const number = computed(() => store.state.calculator.number);
  const numberEditMode = computed(() => store.state.calculator.numberEditMode);
  const arithmeticError = computed(() => store.state.calculator.error);

  const handlePadInput = (padInput) => {
    if (arithmeticError.value.hasError) {
      store.commit('calculator/unsetError');
    }

    // 숫자
    if (Keypad.NUMBER.equalTo(padInput.parent)) {
      if (numberEditMode.value === 'append' && isLengthExceeded(number.value + padInput.html)) return;

      store.dispatch(
        'calculator/combineDigit',
        new CalculatorToken({
          type: Keypad.NUMBER,
          content: padInput.html,
        })
      );
      return;
    }
    // .
    if (Keypad.DOT.equalTo(padInput)) {
      store.dispatch('calculator/handleDot', {
        numberToken: new CalculatorToken({
          type: Keypad.NUMBER,
          content: number.value,
        }),
      });
    }

    // negate
    if (Keypad.NEGATE.equalTo(padInput)) {
      store.dispatch('calculator/handleNegate');
      return;
    }

    // operator
    if (Keypad.OPERATOR.equalTo(padInput.parent)) {
      store.dispatch('calculator/handleOperator', {
        numberToken: new CalculatorToken({
          type: Keypad.NUMBER,
          content: number.value,
        }),
        operatorToken: new CalculatorToken({
          type: padInput,
          content: padInput.html,
        }),
      });
      return;
    }

    // =
    if (Keypad.EQUAL.equalTo(padInput)) {
      store.dispatch('calculator/handleEqual', {
        numberToken: new CalculatorToken({
          type: Keypad.NUMBER,
          content: number.value,
        }),
        operatorToken: new CalculatorToken({
          type: padInput,
          content: padInput.html,
        }),
      });
      return;
    }

    // 삭제 3개
    if (Keypad.CLEAR.equalTo(padInput.parent)) {
      store.dispatch(
        'calculator/handleClear',
        new CalculatorToken({
          type: padInput,
          content: padInput.html,
        })
      );
    }
  };

  return {
    handlePadInput,
  };
}

export default usePadInput;
