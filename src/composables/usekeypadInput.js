import { computed } from 'vue';
import { useStore } from 'vuex';

import KeypadSet from '@/constants/calculator/KeypadSet';
import CalculatorToken from '@/class/calculator/CalculatorToken';
import { isLengthOverOnDisplay } from '@/utils/calculatorUtils';

function usePadInput() {

  const store = useStore();

  const number = computed(() => store.state.calculator.number);
  const numberEditMode = computed(() => store.state.calculator.numberEditMode);
  const arithmeticError = computed(() => store.state.calculator.error);

  const handleKeypadInput = (padInput) => {
    
    if (arithmeticError.value.hasError) {
      store.commit('calculator/unsetError');
    }

    // 숫자
    if (KeypadSet.NUMBER.equalTo(padInput.parent)) {
      
      const nextNumber = number.value + padInput.html;
      // 입력할 수 있는 최대 길이를 넘었을 때 입력 방지
      if (numberEditMode.value === 'append' && isLengthOverOnDisplay(nextNumber)) return;

      store.dispatch(
        'calculator/combineDigit',
        new CalculatorToken({
          type: KeypadSet.NUMBER,
          content: padInput.html,
        })
      );

      return;
    }
    
    // .
    if (KeypadSet.DOT.equalTo(padInput)) {
      store.dispatch('calculator/handleDot');

      return;
    }

    // negate
    if (KeypadSet.NEGATE.equalTo(padInput)) {
      store.dispatch('calculator/handleNegate');

      return;
    }

    // operator
    if (KeypadSet.OPERATOR.equalTo(padInput.parent)) {
      store.dispatch('calculator/handleOperator', {
        numberToken: new CalculatorToken({
          type: KeypadSet.NUMBER,
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
    if (KeypadSet.EQUAL.equalTo(padInput)) {
      store.dispatch('calculator/handleEqual', {
        numberToken: new CalculatorToken({
          type: KeypadSet.NUMBER,
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
    if (KeypadSet.CLEAR.equalTo(padInput.parent)) {
      store.dispatch(
        'calculator/handleClear',
        new CalculatorToken({
          type: padInput,
          content: padInput.html,
        })
      );

      return;
    }
  };

  return {
    handleKeypadInput,
  };
}

export default usePadInput;
