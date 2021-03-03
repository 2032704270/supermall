import * as types from "./mutations-types";

export default {
  [types.ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [types.ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [types.CHANGE_CART_CHECKED](state, payload) {
    payload.checked = !payload.checked;
  },
  [types.ALL_CHECKED](state, payload) {
    for (let item of state.cartList) {
      item.checked = payload;
    }
  }
};
