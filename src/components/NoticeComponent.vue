<template>
    <div class="notice_bg">
        <div class="notice_ct">
            <div class="notice">
                <i></i>
                <div class="content">
                    <div class="roll">{{notice}}</div>
                </div>
            </div>
            <div class="right">
                <span v-for="(item, i) in tools" :key="i"><i class="line"></i>{{$t(item)}}</span>
                <span @click="isShowLanguage = !isShowLanguage"><i class="line"></i>{{$t('语言选择')}}：<label>{{currLan.name}}</label></span>
                <div class="language_ct" v-show="isShowLanguage">
                    <div class="item" v-for="(item, i) in languages" :key="i" @click="selectLang(item)">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import {vantLocales} from '@/assets/languages'
import {i18n} from '@/assets/languages'

export default {
    setup() {
        const state = reactive({
            tools: ['设为网页', '收藏网站'],
            notice: '',
            isShowLanguage: false,
            currLan: i18n.global.locale == 'cn'?{id: 'cn', name: '中文'}:i18n.global.locale == 'en'?{id: 'en', name: 'English'}:i18n.global.locale == 'vi'?{id: 'vi', name: 'Tiếng Việt'}:{id: 'vi', name: 'Tiếng Việt'}  ,
            languages: [
                {id: 'cn', name: '中文'}, {id: 'en', name: 'English'}, {id: 'vi', name: 'Tiếng Việt'}
            ]
        })

        let scrollId
        const startScroll = () => {

            const ct = document.querySelector('.notice .content')
            const sn = document.querySelector('.notice .content>.roll')

            const ct_w = parseFloat(window.getComputedStyle(ct, null)['width'])
            const sn_w = parseFloat(window.getComputedStyle(sn, null)['width'])

            scrollId && window.clearInterval(scrollId)
            // if(sn_w > ct_w){
                sn.style['left'] = ct_w+'px'
                let total = 1
                scrollId = window.setInterval(() => {
                    if(ct_w - total < -sn_w){
                        sn.style['left'] = ct_w+'px'
                        total = 1
                    } else {
                        sn.style.left = (ct_w - total) + 'px'
                        total++
                    }
                }, 20)
            // }else {
            //     sn.style['left'] = '0px'
            // }
        }

        const selectLang = (item) => {
            state.currLan = item
            state.isShowLanguage = false
            vantLocales(item.id)
            window.location.reload()
        }


        onMounted(() => {
            startScroll()
            // console.log(startScroll)
        })

        return {
            ...toRefs(state),
            selectLang
        }
    },
}
</script>
<style lang="less" scoped>
.notice_bg{
    width: 100%;min-width: 1200px;background: #F6F6F6;height: 36px;
    border-bottom: 1px solid #e5e5e5;
    .notice_ct{
        min-width: 1200px;max-width: 1800px;margin: auto;height: 100%;display: flex;
        align-items: center;justify-content: space-between;
        .notice{
            flex-grow: 1;position: relative;display:flex;align-items:center;
            >i{
                display: inline-block;height: 36px;width: 36px;
                background: url("@/assets/images/laba.png") center center no-repeat;background-size: 14px 14px;
            }
            .content{
                width: 400px;position: relative;display:flex;align-items:center;overflow:hidden;height: 36px;
                .roll{position: absolute;white-space: nowrap;color: #333;}
            }
        }
        .right{
            display: flex;align-items:center;position: relative;
            >span{
                padding-left: 6px;height: 12px;
                display: inline-flex;align-items: center;margin-left: 8px;cursor: pointer;
                .line{
                    display: inline-block;height: 10px;width: 1px;background-color: #666;margin-right: 12px;
                }
            }
            .language_ct{
                position: absolute;top: 24px;right: 0;background-color: #e5e5e5;width: 90px;
                .item{
                    height: 40px;line-height: 40px;text-align: center;
                    border-bottom: 1px solid #ccc;cursor: pointer;
                }
            }
        }
    }
}
</style>