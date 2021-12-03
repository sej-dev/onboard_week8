import Keypad from '@/constants/calculator/Keypad';
import { toIntegerFormatWhenIntegerValue, isRationalDiffIntegerNumber, calcNumOpNumSeq } from '@/store/modules/calculator/utils';
import CalculatorToken from '@/class/calculator/CalculatorToken';
import ArithmeticError from '@/constants/calculator/ArithmeticError';

const actions = {
  handleOperator({ commit, state }, payload) {
    const { numberToken, operatorToken } = payload;
    const { stack, numberEditMode } = state;

    commit('changeNumberEditMode', 'replace');

    // case1: [], (num, op)`
    if (stack.length === 0) {
      commit('pushStack', numberToken);
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(numberToken.content));
      return;
    }

    // case2: [... op], (op) - replace
    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];
    if ((numberEditMode === 'replace' && Keypad.OPERATOR.equalTo(top.type.parent)) || (stack.length === 2 && Keypad.EQUAL.equalTo(top.type))) {
      commit('popAndPushStack', operatorToken);
      return;
    }

    // case3: [num op]=result, (num, op) -> [result op num]
    if (stack.length === 2) {
      commit('pushStack', numberToken);
      commit('pushStack', {
        type: Keypad.EQUAL,
        content: '&#61;',
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
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));

      return;
    }

    // case3-2: [num op num =]=result, (num, op) -> [result op num]
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
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));
    }
  },
  handleEqual({ commit, state }, payload) {
    const { numberToken, operatorToken } = payload;
    const stack = state.stack;

    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];

    commit('changeNumberEditMode', 'replace');
    // case1: [], (num =)
    if (stack.length === 0) {
      commit('pushStack', numberToken);
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(numberToken.content));
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });
      return;
    }
    // case3: [... =], (num =)
    if (Keypad.EQUAL.equalTo(top.type)) {
      // case1과 유사: [num =], (num =)
      if (stack.length === 2) {
        commit('setNumber', toIntegerFormatWhenIntegerValue(stack[lastIdx - 1].content));
        commit('addHistory', {
          stack: stack.slice(),
          number: state.number,
        });
        return;
      }

      // case2와 유사: [num op num =], (num =)
      if (stack.length === 4) {
        commit('replaceStackIndexOf', {
          index: 0,
          token: numberToken,
        })
        
        const result = calcNumOpNumSeq(stack.slice());
        commit('setNumber', toIntegerFormatWhenIntegerValue(result));
        commit('addHistory', {
          stack: stack.slice(),
          number: state.number,
        });
        return;
      }
    }

    // case2: [num op], (num =)
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
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });

      return;
    }
  },
  handleNegate({ commit, state }, payload) {
    const { number } = state;

    if (number === '0') return;

    const numberNegate = number.startsWith('-') ? number.replace('-', '') : `-${number}`;

    commit('changeNumberEditMode', 'append');
    commit('setNumber', numberNegate);
  },
  handleDot({ commit, state }, payload) {
    const { numberEditMode } = state;

    if (numberEditMode === 'replace') {
      commit('setNumber', '0.');
      commit('changeNumberEditMode', 'append');
      return;
    }

    const { numberToken } = payload;
    if (!isRationalDiffIntegerNumber(numberToken.content)) {
      commit('setNumber', `${numberToken.content}.`);
    }
  },
  handleClear({ commit, state }, payload) {
    const token = payload;

    const { stack } = state;
    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];

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
          } else {
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
  combineDigit({ commit, state }, payload) {
    const token = payload;
    const { content: digit } = token;
    const { numberEditMode, stack } = state;

    // TODO: toggleNumberEditMode로 분리
    if (numberEditMode === 'replace') {
      
      const lastIdx = stack.length - 1;
      const top = stack[lastIdx];
      
      if(Keypad.ZERO.equalTo(token) || Keypad.ZERO.equalTo(Keypad.ZERO)) return;

      if (top && Keypad.EQUAL.equalTo(top.type)) {
        commit('clearStack');
      }

      commit('setNumber', digit);
      commit('changeNumberEditMode', 'append');
    } else if (numberEditMode === 'append') {
      commit('setNumber', `${state.number}${digit}`);
    }
  },
};

export default actions;
