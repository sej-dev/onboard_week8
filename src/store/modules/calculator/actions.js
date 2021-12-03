import Keypad from '@/constants/calculator/Keypad';
import { toFomatNumberByPreCondition, isRationalDiffIntegerNumber, calcNumOpNumSeq, removeZeroPrefix } from '@/store/modules/calculator/utils';
import CalculatorToken from '@/class/calculator/CalculatorToken';
import ArithmeticError from '@/constants/calculator/ArithmeticError';

const actions = {
  // 사칙연산
  handleOperator({ commit, state }, payload) {
    const { numberToken, operatorToken } = payload;
    const { stack, numberEditMode } = state;

    commit('changeNumberEditMode', 'replace');

    // [case1] stack: [], payload: {num, op}
    if (stack.length === 0) {
      commit('pushStack', numberToken);
      commit('pushStack', operatorToken);
      commit('setNumber', toFomatNumberByPreCondition(numberToken.content));
      return;
    }

    // [case2] stack: [... op], payload: {op} -> op replace
    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];
    if ((numberEditMode === 'replace' && Keypad.OPERATOR.equalTo(top.type.parent)) || (stack.length === 2 && Keypad.EQUAL.equalTo(top.type))) {
      commit('popAndPushStack', operatorToken);
      return;
    }

    // [case3] stack: [num1 op1], payload: {num2, op2} 
    // result = num1 op1 num2
    // -> stack: [result op2 num2]
    if (stack.length === 2) {
      commit('pushStack', numberToken);
      commit('pushStack', {
        type: Keypad.EQUAL,
        content: Keypad.EQUAL.html,
      });

      const result = calcNumOpNumSeq(stack.slice());
      commit('addHistory', {
        stack: stack.slice(),
        number: result,
      });

      commit('clearStack');

      commit(
        'pushStack',
        new CalculatorToken({
          type: Keypad.NUMBER,
          content: result,
        })
      );
      commit('pushStack', operatorToken);
      commit('setNumber', toFomatNumberByPreCondition(result));

      return;
    }

    // [case4] stack: [num1 op1 num2 =], payload: {num3, op2} 
    // result = num1 op1 num2
    // -> stack: [result op2 num3]
    if (stack.length === 4) {
      const result = calcNumOpNumSeq(stack.slice());

      commit('clearStack');

      commit(
        'pushStack',
        new CalculatorToken({
          type: Keypad.NUMBER,
          content: result,
        })
      );
      commit('pushStack', operatorToken);
      commit('setNumber', toFomatNumberByPreCondition(result));
    }
  },

  // =
  handleEqual({ commit, state }, payload) {
    const { numberToken, operatorToken } = payload;
    const stack = state.stack;

    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];

    commit('changeNumberEditMode', 'replace');
    
    // [case1] stack: [], payload: {num, =}
    if (stack.length === 0) {
      commit('pushStack', numberToken);
      commit('pushStack', operatorToken);
      commit('setNumber', toFomatNumberByPreCondition(numberToken.content));
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });
      return;
    }
    
    // [case2] stack: [... =], payload {num, =}
    if (Keypad.EQUAL.equalTo(top.type)) {
      
      // [case1과 유사] stack: [num =], payload: {num, =}
      // -> stack: [num =]
      if (stack.length === 2) {
        commit('setNumber', toFomatNumberByPreCondition(stack[lastIdx - 1].content));
        commit('addHistory', {
          stack: stack.slice(),
          number: state.number,
        });
        return;
      }

      // [case2와 유사] stack: [num1 op num2 =], payload: {num3 =}
      // result = num1 op num2 = num3
      // -> stack: [num3 op num2 =]
      if (stack.length === 4) {
        commit('replaceStackIndexOf', {
          index: 0,
          token: numberToken,
        })
        
        const result = calcNumOpNumSeq(stack.slice());
        commit('setNumber', toFomatNumberByPreCondition(result));
        commit('addHistory', {
          stack: stack.slice(),
          number: state.number,
        });
        return;
      }
    }

    // [case3] stack: [num op], payload: {num, =}
    if (stack.length === 2) {
      // 0으로 나눌 경우 오류 처리
      if (numberToken.content === '0' && Keypad.DIVIDE.equalTo(top.type)) {
        commit('setError', ArithmeticError.DIVIDE_BY_ZERO);
        commit('clearStack');
        commit('changeNumberEditMode', 'replace');
        return;
      }

      commit('pushStack', numberToken);

      const result = calcNumOpNumSeq(stack.slice());
      commit('pushStack', operatorToken);
      
      commit('setNumber', toFomatNumberByPreCondition(result));
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });

      return;
    }
  },

  // +/- 부호 변환
  handleNegate({ commit, state }, payload) {
    const { number } = state;

    if (number === '0') return;

    const numberNegate = number.startsWith('-') ? number.replace('-', '') : `-${number}`;

    commit('changeNumberEditMode', 'append');
    commit('setNumber', numberNegate);
  },

  // .
  handleDot({ commit, state }, payload) {
    const { numberEditMode } = state;

    if (numberEditMode === 'replace') {
      commit('setNumber', '0.');
      commit('changeNumberEditMode', 'append');
      return;
    }

    const { numberToken } = payload;
    // 소수가 아닌 경우에만 추가
    if (!isRationalDiffIntegerNumber(numberToken.content)) {
      commit('setNumber', `${numberToken.content}.`);
    }
  },
  
  // C, CE, x 
  handleClear({ commit, state }, payload) {
    const token = payload;

    switch (token.type) {

      case Keypad.CLEAR_ALL:
        commit('clearStack');
        commit('setNumber', '0');
        commit('changeNumberEditMode', 'replace');
        return;
      
        case Keypad.CLEAR_ENTRY:
        commit('setNumber', '0');
        commit('changeNumberEditMode', 'replace');
        return;
      
        case Keypad.CLEAR_ONE_CHAR:
        const { numberEditMode, number, stack } = state;

        if (numberEditMode === 'append') {
          let nextNumber = null;
          
          if (number.length === 1) {
            nextNumber = '0';
            commit('changeNumberEditMode', 'replace');
          } 
          else {
            nextNumber = number.substring(0, number.length - 1);
          }
          
          commit('setNumber', nextNumber);
          return;
        }

        const lastIdx = stack.length - 1;
        const top = stack[lastIdx];
        if (top && Keypad.EQUAL.equalTo(top.type)) {
          commit('clearStack');

          return;
        }
    }
  },
  
  // 숫자
  combineDigit({ commit, state }, payload) {
    const token = payload;
    const { content: digit } = token;
    const { numberEditMode, stack, number } = state;
    
    if (numberEditMode === 'replace') {
      
      const lastIdx = stack.length - 1;
      const top = stack[lastIdx];

      if (top && Keypad.EQUAL.equalTo(top.type)) {
        commit('clearStack');
      }

      commit('setNumber', digit);
      commit('changeNumberEditMode', 'append');

    } else if (numberEditMode === 'append') {

      commit('setNumber', removeZeroPrefix(`${number}${digit}`));
    }
  },
};

export default actions;
