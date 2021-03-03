import * as types from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid);
      if (product) {
        context.commit(types.ADD_COUNTER, product);
        resolve("购物车当前商品数量增加");
      } else {
        payload.count = 1;
        context.commit(types.ADD_TO_CART, payload);
        resolve("商品已添加到购物车")
      }
    })
  },
  changeCartChecked(context, payload) {
    context.commit(types.CHANGE_CART_CHECKED, payload);
  },
  allChecked(context, payload) {
    context.commit(types.ALL_CHECKED, payload);
  }
};
