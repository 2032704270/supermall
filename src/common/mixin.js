import {debounce} from "./utils";
import {TOP_DISTANCE} from "./const";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    //  对刷新高度的函数进行防抖/节流处理
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    //  对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh();
    }
    //  监听事件
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = position.y < -TOP_DISTANCE;
    }
  }
}
