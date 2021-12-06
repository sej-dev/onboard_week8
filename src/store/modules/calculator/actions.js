import KeypadSet from '@/constants/calculator/KeypadSet';
import { toNumberFormattedForDisplay, isDecimalFormat, calcNumOpNumSeq, removeZeroPrefix } from '@/store/modules/calculator/utils';
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
      commit('setNumber', toNumberFormattedForDisplay(numberToken.content));
      return;
    }

    // [case2] stack: [... op] or [num =], payload: {op} 
    // -> op/= replace
    const top = stack[stack.length - 1];
    if ((numberEditMode === 'replace' && KeypadSet.OPERATOR.equalTo(top.type.parent)) || (stack.length === 2 && KeypadSet.EQUAL.equalTo(top.type))) {
      commit('popAndPushStack', operatorToken);
      return;
    }

    // [case3] stack: [num1 op1], payload: {num2, op2} 
    // result = num1 op1 num2
    // -> stack: [result op2 num2]
    if (stack.length === 2) {
      commit('pushStack', numberToken);
      commit('pushStack', new CalculatorToken({
        type: KeypadSet.EQUAL,
        content: KeypadSet.EQUAL.html,
      }));

      const result = calcNumOpNumSeq(stack.slice());
      commit('addHistory', {
        stack: stack.slice(),
        number: result,
      });

      commit('clearStack');

      commit(
        'pushStack',
        new CalculatorToken({
          type: KeypadSet.NUMBER,
          content: result,
        })
      );
      commit('pushStack', operatorToken);
      commit('setNumber', toNumberFormattedForDisplay(result));

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
          type: KeypadSet.NUMBER,
          content: result,
        })
      );
      commit('pushStack', operatorToken);
      commit('setNumber', toNumberFormattedForDisplay(result));
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

      commit('setNumber', toNumberFormattedForDisplay(numberToken.content));
      
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });
      return;
    }
    
    // [case2] stack: [... =], payload {num, =}
    if (KeypadSet.EQUAL.equalTo(top.type)) {
      
      // [case1과 유사] stack: [num1 =], payload: {num2, =}
      // = 연속 입력
      // -> stack: [num2 =]
      if (stack.length === 2) {
        commit('replaceStackIndexOf', {
          index: 0,
          token: numberToken,
        });
        commit('setNumber', toNumberFormattedForDisplay(numberToken.content));
        
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
        commit('setNumber', toNumberFormattedForDisplay(result));
        commit('addHistory', {
          stack: stack.slice(),
          number: state.number,
        });
        return;
      }
    }

    // [case3] stack: [num1 op], payload: {num2, =}
    if (stack.length === 2) {
      // 0으로 나눌 경우 오류 처리
      if (numberToken.content === '0' && KeypadSet.DIVIDE.equalTo(top.type)) {
        commit('setError', ArithmeticError.DIVIDE_BY_ZERO);
        commit('clearStack');
        commit('changeNumberEditMode', 'replace');
        return;
      }

      commit('pushStack', numberToken);

      const result = calcNumOpNumSeq(stack.slice());
      commit('pushStack', operatorToken);
      
      commit('setNumber', toNumberFormattedForDisplay(result));
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });

      return;
    }
  },

  // +/- 부호 변환
  handleNegate({ commit, state }) {
    
    const { number, stack } = state;

    if (number === '0') return;

    const numberNegate = number.startsWith('-') ? number.replace('-', '') : `-${number}`;
    
    const top = stack[stack.length - 1];
    if (top && !KeypadSet.EQUAL.equalTo(top.type)) {
      commit('changeNumberEditMode', 'append');
    }
    commit('setNumber', numberNegate);
  },

  // .
  handleDot({ commit, state }) {
    
    const { numberEditMode, number } = state;

    if (numberEditMode === 'replace') {
      commit('setNumber', '0.');
      commit('changeNumberEditMode', 'append');
      return;
    }

    // 소수가 아닌 경우에만 추가
    if (!isDecimalFormat(number)) {
      commit('setNumber', `${number}.`);
    }
  },
  
  // C, CE, x 
  handleClear({ commit, state }, payload) {
    const token = payload;

    switch (token.type) {

      case KeypadSet.CLEAR_ALL:
        commit('clearStack');
        commit('setNumber', '0');
        commit('changeNumberEditMode', 'replace');
        return;
      
      case KeypadSet.CLEAR_ENTRY:
        commit('setNumber', '0');
        commit('changeNumberEditMode', 'replace');
        return;
    
      case KeypadSet.CLEAR_ONE_CHAR:
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

        const top = stack[stack.length - 1];
        if (top && KeypadSet.EQUAL.equalTo(top.type)) {
          commit('clearStack');

          return;
        }

      default: return;
    }
  },
  
  // 숫자
  combineDigit({ commit, state }, payload) {

    const token = payload;
    const { content: digit } = token;
    const { numberEditMode, stack, number } = state;
    
    if (numberEditMode === 'replace') {
      
      const top = stack[stack.length - 1];

      if (top && KeypadSet.EQUAL.equalTo(top.type)) {
        commit('clearStack');
      }

      commit('setNumber', digit);
      commit('changeNumberEditMode', 'append');
    } 
    else if (numberEditMode === 'append') {

      commit('setNumber', removeZeroPrefix(`${number}${digit}`));
    }
  },
};

export default actions;
