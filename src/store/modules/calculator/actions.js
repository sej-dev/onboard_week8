import KeyPad from '@/constants/KeyPad';

const actions = {
  handleOperator({ commit, state }, payload) {
    const { numberToken, operatorToken } = payload;
    const stack = state.stack;

    commit('changeNumberEditMode', 'replace');

    // case1: [], (num, op)`
    if (stack.length === 0) {
      commit('pushStack', numberToken);
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(numberToken.content));
      return;
    }

    // case2: [num op]=result, (num, op) -> [result op num]
    if (stack.length === 2 || stack.length === 4) {
      commit('pushStack', numberToken);
      const result = calcNumOpNumSeq(stack.slice());

      commit('clearStack');

      commit('pushStack', {
        nameTag: KeyPad.NUMBER.SELF,
        content: result,
      });
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));

      commit('addHistory', {
        stack: stack.slice(),
        number: state.number,
      });
      return;
    }

    // case3: [... op], (op) - replace
    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];
    if (isOperator(top.nameTag) || top.nameTag === KeyPad.EQUAL) {
      commit('popAndPushStack', operatorToken);
      return;
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
      return;
    }

    // case2: [num op], (num =)
    if (stack.length === 2) {
      commit('pushStack', numberToken);
      const result = calcNumOpNumSeq(stack.slice());
      commit('pushStack', operatorToken);
      commit('setNumber', toIntegerFormatWhenIntegerValue(result));
      return;
    }

    // case3: [... =], (num =)
    const lastIdx = stack.length - 1;
    const top = stack[lastIdx];
    if (top.nameTag === KeyPad.EQUAL) {
      // case1과 유사: [num =], (num =)
      if (stack.length === 2) {
        commit('setNumber', toIntegerFormatWhenIntegerValue(stack[lastIdx - 1].content));
        return;
      }

      // case2와 유사: [num op num =], (num =)
      if (stack.length === 4) {
        // TODO: mutation 사용하도록
        stack[0] = numberToken;
        const result = calcNumOpNumSeq(stack.slice());
        commit('setNumber', toIntegerFormatWhenIntegerValue(result));
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

function calcNumOpNumSeq(list) {
  const [num1, operator, num2] = list;

  const operation = getOperation(operator.nameTag);
  const result = operation(parseFloat(num1.content), parseFloat(num2.content));

  return result;
}

function getOperation(operator) {
  switch (operator) {
    case KeyPad.OPERATOR.SUM:
      return (num1, num2) => num1 + num2;
    case KeyPad.OPERATOR.SUBTRACT:
      return (num1, num2) => num1 - num2;
    case KeyPad.OPERATOR.MULTIPLY:
      return (num1, num2) => num1 * num2;
    case KeyPad.OPERATOR.DIVIDE:
      return (num1, num2) => num1 / num2;
    default:
      return () => {};
  }
}
function isOperator(namgTag) {
  const operators = Object.keys(KeyPad.OPERATOR);
  return operators.includes(namgTag);
}

function toIntegerFormatWhenIntegerValue(num) {
  return isInteger(num) ? parseInt(num, 10).toString() : num;
}

function isInteger(num) {
  const numStr = num.toString();
  if (/^\d+\.0*$/.test(numStr)) return true;
  return false;
}

function isRationalNumber(num) {
  const numStr = num.toString();
  if (/\./.test(numStr)) return true;
  return false;
}

export default actions;
