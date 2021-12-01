import KeyPad from '@/constants/KeyPad';
import { isOperator, toIntegerFormatWhenIntegerValue, isRationalNumber, calcNumOpNumSeq } from '@/store/modules/calculator/utils';

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
    if ((numberEditMode === 'replace' && isOperator(top.nameTag)) || (stack.length !== 4 && top.nameTag === KeyPad.EQUAL)) {
      commit('popAndPushStack', operatorToken);
      return;
    }

    // case3: [num op]=result, (num, op) -> [result op num]
    if (stack.length === 2) {
      commit('pushStack', numberToken);
      commit('pushStack', {
        nameTag: KeyPad.EQUAL,
        content: '&#61;',
      });

      const result = calcNumOpNumSeq(stack.slice());
      commit('addHistory', {
        stack: stack.slice(),
        number: result,
      });

      commit('clearStack');

      commit('pushStack', {
        nameTag: KeyPad.NUMBER.SELF,
        content: result,
      });
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));

      return;
    }

    // case3-2: [num op num =]=result, (num, op) -> [result op num]
    if (stack.length === 4) {
      const result = calcNumOpNumSeq(stack.slice());
      commit('addHistory', {
        stack: stack.slice(),
        number: result,
      });

      commit('clearStack');

      commit('pushStack', {
        nameTag: KeyPad.NUMBER.SELF,
        content: result,
      });
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));
    }
  },
  handleEqual({ commit, state }, payload) {
    const { numberToken, operatorToken } = payload;
    const stack = state.stack;

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

    // case2: [num op], (num =)
    if (stack.length === 2) {
      commit('pushStack', numberToken);
      const result = calcNumOpNumSeq(stack.slice());
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));
      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });
      debugger;
      return;
    }

    // case3: [... =], (num =)
    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];
    if (top.nameTag === KeyPad.EQUAL) {
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
        // TODO: mutation 사용하도록
        stack[0] = numberToken;
        const result = calcNumOpNumSeq(stack.slice());
        commit('setNumber', toIntegerFormatWhenIntegerValue(result));
        commit('addHistory', {
          stack: stack.slice(),
          number: state.number,
        });
        return;
      }
    }
  },
  handleNegate({ commit, state }, payload) {
    const { number } = state;

    if (number === '0') return;

    const numberNegate = toIntegerFormatWhenIntegerValue(parseFloat(number) * -1);

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
    if (!isRationalNumber(numberToken.content)) {
      commit('setNumber', `${numberToken.content}.`);
    }
  },
  handleClear({ commit, state }, payload) {
    const token = payload.token;
    switch (token.nameTag) {
      case KeyPad.CLEAR.ALL:
        commit('clearStack');
        commit('setNumber', '0');
        return;
      case KeyPad.CLEAR.ENTRY:
        commit('setNumber', '0');
        commit('changeNumberEditMode', 'replace');
        return;
      case KeyPad.CLEAR.ONE_CHAR:
        const { numberEditMode, number, stack } = state;

        if (numberEditMode === 'append') {
          let nextNumber = null;
          if (number.length === 1) {
            nextNumber = 0;
            commit('changeNumberEditMode', 'replace');
          } else {
            nextNumber = number.substring(0, number.length - 1);
          }
          commit('setNumber', nextNumber);
          return;
        }

        const lastIdx = stack.length - 1;
        const top = stack[lastIdx];
        if (top && top.nameTag === KeyPad.EQUAL) {
          commit('clearStack');
          return;
        }
    }
  },
  combineDigit({ commit, state }, payload) {
    const { digit } = payload;
    const { numberEditMode } = state;

    // TODO: toggleNumberEditMode로 분리
    if (numberEditMode === 'replace') {
      commit('setNumber', digit);
      commit('changeNumberEditMode', 'append');
    } else if (numberEditMode === 'append') {
      commit('setNumber', `${state.number}${digit}`);
    }
  },
};

export default actions;
