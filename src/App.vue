<template>
  <noticeComponent></noticeComponent>
  <!-- <commonHeader></commonHeader> -->
  <div class="app_ct">
    <router-view  v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <loading></loading>
</template>
<script>
import noticeComponent from '@/components/NoticeComponent.vue'
// import commonHeader from '@/components/CommonHeader.vue'
import loading from '@/components/LoadingComponent.vue'
export default {
  components:{
    // commonHeader,
    noticeComponent,
    loading
  },
  setup() {
    
  },
}
</script>
<style>
.app_ct {
  min-width: 1200px;margin: auto;max-width: 1800px;
}
*{
  box-sizing: border-box;margin: 0;padding: 0;font-size: 12px;
}
body{background-color: #eee;}
</style>
