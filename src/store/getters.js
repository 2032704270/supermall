export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  },
  totalPrice(state) {
    return state.cartList.filter(item => {
      return item.checked
    }).reduce((prePrice, item) => {
      return prePrice + item.price * item.count
    }, 0).toFixed(2)
  },
  checkLength(state) {
    return state.cartList.filter(item => item.checked).length
  },
  isSelectALl(state) {
    if (state.cartList.length === 0) return false
    return !state.cartList.find(item => !item.checked)
  }
};
