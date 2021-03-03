<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    @click.native="allCheck"
                    :is-checked="isSelectALl"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计:￥{{ totalPrice }}
    </div>

    <div class="calculate" @click="calcClick">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

import {mapGetters, mapActions} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      "totalPrice",
      "checkLength",
      "isSelectALl",
    ])
  },
  methods: {
    ...mapActions(["allChecked"]),
    allCheck() {
      this.allChecked(!this.isSelectALl);
    },
    calcClick() {
      if (!this.isSelectALl) {
        this.$toast.show("请选择购买的商品");
      } else {
        this.$toast.show("还没开发出该功能哦!");
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  bottom: 40px;
  line-height: 40px;
  height: 40px;

  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
  font-size: 14px;
  border-radius: 10px;
}
</style>
