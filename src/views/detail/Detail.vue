<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navBar"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {itemListenerMixin, backTopMixin} from "common/mixin";
import {debounce} from "../../common/utils";

import {mapActions} from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [
    itemListenerMixin,
    backTopMixin,
  ],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      scrollY: 0,
    }
  },
  created() {
    //  保存传入的商品id
    this.iid = this.$route.params.id

    //  根据商品id请求商品数据
    this.getDetail();
    this.getRecommend();

    this.getThemeTopY = debounce(() => {
      this.themeTopYs[0] = 0;
      this.themeTopYs[1] = this.$refs.params.$el.offsetTop - 40;
      this.themeTopYs[2] = this.$refs.comment.$el.offsetTop - 40;
      this.themeTopYs[3] = this.$refs.recommend.$el.offsetTop - 40;
      this.themeTopYs[4] = Number.MAX_VALUE;
      // console.log(this.themeTopYs)
    }, 100)
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  },
  methods: {
    ...mapActions(["addCart"]),
    getDetail() {
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //  获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //  获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //  获取详情信息
        this.detailInfo = data.detailInfo;
        //  获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //  获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res)
        this.recommend = res.data.list
      })
    },
    imageLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    scroll(position) {
      //  判断BackTop是否显示
      this.listenerShowBackTop(position);

      this.scrollY = Math.abs(position.y);
      let index = 0;
      let length = this.themeTopYs.length - 1;
      for (index; index < length ; index++) {
        if (this.$refs.navBar.currentIndex !== index && this.scrollY >= this.themeTopYs[index] && this.scrollY < this.themeTopYs[index+1]) {
          this.$refs.navBar.currentIndex = index;
        }
      }
    },
    addToCart() {
      //  获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then(res => {
        this.$toast.show(res, 1500);
      });
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
