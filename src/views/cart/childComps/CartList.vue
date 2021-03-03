<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :item-info="item"/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";
import CartBottomBar from "./CartBottomBar";

import {mapGetters} from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
    CartBottomBar,
  },
  computed: {
    ...mapGetters([
      "cartList"
    ])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px);
}

.content {
  height: 100%;
}
</style>
