<template>
  <div v-if="Object.keys(goods).length > 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span v-if="goods.oldPrice" class="old-price">{{goods.oldPrice}}</span>
      <span v-else class="old-price">{{goods.realPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span v-for="item in goods.columns">{{item}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item"
            v-for="index in goods.services.length" :key="index"
            v-show="goods.services[index-1].icon">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  padding: 15px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  font-size: 20px;
  color: black;
}
.info-price {
  margin: 20px 0;
}
.info-price .new-price {
  color: var(--color-high-text);
  font-size: 24px;
}
.info-price .old-price {
  color: #999;
  font-size: 12px;
  padding: 0 8px;
  text-decoration: line-through;
}
.info-price .discount {
  font-size: 12px;
  background-color: var(--color-high-text);
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
  position: relative;
  top: -8px;
}

.info-other {
  display: flex;
  flex: 1;
  justify-content: space-between;
  color: #999999;
  font-size: 13px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.info-service {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 15px 0 5px;
}
.info-service-item img {
  width: 10px;
}
.info-service-item span {
  font-size: 12px;
  color: #333;
}
</style>
