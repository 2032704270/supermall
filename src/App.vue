<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"/>
    <router-view/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
.main-tab-bar {
  z-index: 999;
}
</style>
