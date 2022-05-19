<template>
    <div class="loading_ct" v-show="isLoading">
        <img src="@/assets/images/loading.gif" >
        <!-- <p>{{$t('加载中...')}}</p> -->
    </div>
</template>
<script>
// import { ref } from '@vue/reactivity'
import store from '@/store'
import { computed } from '@vue/runtime-core'
export default {
    setup() {
        const isLoading = computed(() => store.state.isLoading)

        return{
            isLoading
        }
    },
}
</script>
<style lang="less" scoped>
.loading_ct{
    z-index: 1000;position: fixed;left: 0;top:0;
    width: 100%;height: 100%;display: flex;flex-direction: column;
    align-items: center;justify-content: center;background-color: rgba(0,0,0,.3);
    >p{
        color:#fff;font-size: 16px;font-weight: bold;margin-top: 10px;
    }
}
</style>