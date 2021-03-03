<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control v-show="isTabFixed" class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" ref="tabControl1"/>

    <scroll class="content" ref="scroll"
            :probe-type="3" :pull-up-load="true" :click="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommend"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {itemListenerMixin, backTopMixin} from "common/mixin";
import {POP, NEW, SELL} from "common/const";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixins: [
    itemListenerMixin,
    backTopMixin,
  ],
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: POP,
      tabOffsetTop: 0,
      isTabFixed: false,
    }
  },
  deactivated() {
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  },
  created() {
    //  1.请求多个数据
    this.getHomeMultidata();

    //  2.请求商品数据
    this.getHomeGoods(POP);
    this.getHomeGoods(NEW);
    this.getHomeGoods(SELL);
  },
  methods: {
    /**
     * 事件监听相关的方法
     * */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //  判断BackTop是否显示
      this.listenerShowBackTop(position);

      //  决定tabControl是否吸顶
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - 40
    },

    /**
     * 网络请求相关的方法
     * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //  刷新scroll的上拉
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}

.tab-control {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
}
</style>
