<template>
    <div class="commonHeader_bg">
        <div class="commonHeader">
            <div class="top">
                <div class="logo_ct">
                    <img src="@/assets/images/365ball.png">
                </div>
                <div class="adv_ct"></div>
            </div>
            <div class="bottom">
                <div class="nav">
                    <div class="curr" @click="showSelectPanel = !showSelectPanel">
                        <img src="@/assets/images/nav.png"><label>{{currLottery.lotteryName}}</label>
                    </div>
                    <div class="select_ct" v-show="showSelectPanel">
                        <div class="item" v-for="(item, i) in lotterys" :key="i" @click="selectLottery(item)">{{item.lotteryName}}</div>
                    </div>
                </div>
                <div class="info">
                    <ul class="nvas">
                        <li>{{$t('首页')}}</li>
                    </ul>
                    <div class="right">
                        <div class="item">
                            <img src="@/assets/images/phone.png"><label>{{$t('购彩中心')}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import store from '@/store'

export default {
    setup(props, {emit}) {
        const state = reactive({
            currLottery: {},
            lotterys: [],
            showSelectPanel: false,
        })

        const selectLottery = (item) => {
            state.currLottery = item
            state.showSelectPanel = false

            emit('lotterySelect', state.currLottery)
        }

        const getAllLottery = () => {
            store.dispatch('lottery/getMapData').then(data => {
                state.lotterys = data
                state.currLottery = state.lotterys[0]
                emit('lotterySelect', state.currLottery)
            })
        }
        getAllLottery()



        return {
            ...toRefs(state),
            selectLottery
        }
    },
}
</script>
<style lang="less" scoped>
.commonHeader_bg{
    width: 100%;min-width: 1200px;background: #fff;
}
.commonHeader{
    min-width: 1200px;max-width: 1800px;margin: auto;
    .top{
        display:flex;height: 97px;align-items:stretch;margin-bottom: 4px;
        .logo_ct{
            background: #30894f;
        }
        .adv_ct{
            background-color: rgb(247, 80, 29);height: 100%;flex-grow: 1;
        }
    }
    .bottom{
        display:flex;height: 50px;align-items:stretch;margin-bottom: 4px;
        .nav{
            width: 228px;background-color: #333634;height: 50px;line-height: 50px;position: relative;
            padding-left: 20px;
            .curr{
                cursor: pointer;
                >img{flex-shrink: 0;margin-right: 10px;vertical-align: middle;}
                label{
                    color:#fff;font-size: 20px;;vertical-align: middle;
                }
            }
            .select_ct{
                position: absolute;background-color: #333634;width: 228px;left:0;z-index: 5;max-height: 200px;overflow:auto;
                .item{
                    height: 50px;/*padding-left: 12px;display: flex;align-items: center;*/color: #fff;cursor: pointer;
                    border-bottom: 1px solid #ccc;font-size: 20px;text-align:center;
                    &:nth-last-child(1){
                        border-bottom: 1px solid transparent;
                    }
                }
            }
        }
        .info{
            display: flex;justify-content: space-between;flex-grow: 1;background-color: #f38513;align-items:center;
            .nvas{
                margin-left: 20px;display: flex;align-items: center;
                li{
                    list-style: none;color: #fff;font-size: 18px;cursor: pointer;
                }
            }
            .right{
                background-color: rgba(9, 9, 9, .1);
                .item{
                    height: 50px;display: flex;align-items: center;padding-left: 10px;cursor: pointer;
                    label{font-size: 16px;color: #fff;margin: 0 10px;}
                }
            }
        }
    }
}
</style>