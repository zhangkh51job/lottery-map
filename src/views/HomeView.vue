<template>
  <commonHeader @lotterySelect="lotterySelect"></commonHeader>
  <div class="homeView">
    <div class="lottery_result">
      <div class="logo_ct">
        <img src="@/assets/images/dd28.png">
        <div>
          <p>{{$t('彩票')}}</p>
          <p>{{currLottery.lotteryLabel}}</p>
          <p>{{$t('全数/两位数')}}</p>
        </div>
      </div>
      <div class="time_down_ct">
        <p class="name">{{$t('倒计时')}}</p>
        <p class="time">{{ forMatter(timeDown) }}</p>
      </div>
      <div class="result_info">
        <!-- <p class="name">结果</p> -->
        <div class="result">
          <div v-for="(item, i) in results" :key="i" class="result_item animate__animated"  data-ani="animate__heartBeat" :data-delay="100 + 150 * i">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="time_ct">
      <span>{{$t('号码走势')}}：</span>
      <div class="right">
        <span v-for="(time, i) in timeList" :key="i" :class="{active: currTimeSelect == time}" @click="currTimeSelectHandle(time)">{{$t(time)}}</span>
      </div>
    </div>
    <div class="lotteryMap">
      <div class="checkbox_ct">
        <ul>
          <li class="name">{{$t('标注选择')}}：</li>
          <li class="yilou" :class="{checked: yilou}" @click="selectHandle('yilou')">
            <i></i><a>{{$t('遗漏')}}</a>
          </li>
          <li class="zhexian" :class="{checked: zhexian}" @click="selectHandle('zhexian')">
            <i></i><a>{{$t('折现')}}</a>
          </li>
          <li class="fencheng" :class="{checked: fencheng}" @click="selectHandle('fencheng')">
            <i></i><a>{{$t('遗漏分成')}}</a>
          </li>
          <!-- <li class="fengexian" :class="{checked: fengexian}" @click="selectHandle('fengexian')">
            <i></i><a>{{$t('分隔线</a>
          </li> -->
        </ul>
      </div>
      <div id="waitBox">
        <div id="chartLinediv">
          <table class="map" :class="{fengexian: fengexian}">
            <thead>
              <tr class="first_th">
                <th width="120" rowspan="2" class="left_border left_b left_strong_down"><strong id="order" style="cursor:pointer;" type="desc">{{$t('期数')}}</strong></th>
                <th width="120" rowspan="2">{{$t('开奖号码')}}</th>
                <th width="120" rowspan="2">{{$t('开奖结果')}}</th>
                <th colspan="8" height="38">{{$t('前')}}</th>
                <th colspan="8">{{$t('后')}}</th>
                <th colspan="10">{{$t('前')}}</th>
                <th colspan="10">{{$t('后')}}</th>
              </tr>
              <tr class="second_th">
                <!-- 8个 -->
                <th width="50" height="33" class="nfw clthbr">{{$t('小')}}</th>
                <th width="50" class="nfw">{{$t('大')}}</th>
                <th width="50" class="nfw">{{$t('单')}}</th>
                <th width="50" class="nfw">{{$t('双')}}</th>
                <th width="50" class="nfw">{{$t('小单')}}</th>
                <th width="50" class="nfw">{{$t('小双')}}</th>
                <th width="50" class="nfw">{{$t('大单')}}</th>
                <th width="50" class="nfw">{{$t('大双')}}</th>
                <!-- 8个 -->
                <th width="50" height="33" class="nfw clthbr">{{$t('小')}}</th>
                <th width="50" class="nfw">{{$t('大')}}</th>
                <th width="50" class="nfw">{{$t('单')}}</th>
                <th width="50" class="nfw">{{$t('双')}}</th>
                <th width="50" class="nfw">{{$t('小单')}}</th>
                <th width="50" class="nfw">{{$t('小双')}}</th>
                <th width="50" class="nfw">{{$t('大单')}}</th>
                <th width="50" class="nfw">{{$t('大双')}}</th>
                <!-- 10个 -->
                <th width="30" class="nfw">0</th>
                <th width="30" class="nfw">1</th>
                <th width="30" class="nfw">2</th>
                <th width="30" class="nfw">3</th>
                <th width="30" class="nfw">4</th>
                <th width="30" class="nfw">5</th>
                <th width="30" class="nfw">6</th>
                <th width="30" class="nfw">7</th>
                <th width="30" class="nfw">8</th>
                <th class="nfw" width="30">9</th>
                <!-- 10个 -->
                <th width="30" class="nfw">0</th>
                <th width="30" class="nfw">1</th>
                <th width="30" class="nfw">2</th>
                <th width="30" class="nfw">3</th>
                <th width="30" class="nfw">4</th>
                <th width="30" class="nfw">5</th>
                <th width="30" class="nfw">6</th>
                <th width="30" class="nfw">7</th>
                <th width="30" class="nfw">8</th>
                <th width="30" class="nfw">9</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in dataList" :key="i">
                  <td>{{ item.issue }}</td>
                  <td>{{ item.lottery }}</td>
                  <td style="color: #f1010a;">{{ item.num4 + ' ' + item.num5 }}</td>
                  <!-- 8个 -->
                  <td :style="{background: item.num4 <=4 ?'#fa9932':'', color:'#fff'}">{{ item.num4 <=4 ? $t('小'):'' }}</td>
                  <td :style="{background: item.num4 >=5 ?'#3cb0ec':'', color:'#fff'}">{{ item.num4 >=5 ? $t('大'):'' }}</td>
                  <td :style="{background: item.num4 % 2 != 0 ?'#fa9932':'', color:'#fff'}">{{ item.num4 % 2 != 0 ? $t('单'):'' }}</td>
                  <td :style="{background: item.num4 % 2 == 0 ?'#3cb0ec':'', color:'#fff'}">{{ item.num4 % 2 == 0 ? $t('双'):'' }}</td>
                  <td :style="{background: item.num4 <=4 && item.num4 % 2 != 0 ?'#fa9932':'', color:'#fff'}">{{ item.num4 <=4 && item.num4 % 2 != 0 ? $t('小单'):'' }}</td>
                  <td :style="{background: item.num4 <=4 && item.num4 % 2 == 0 ?'#3cb0ec':'', color:'#fff'}">{{ item.num4 <=4 && item.num4 % 2 == 0 ? $t('小双'):'' }}</td>
                  <td :style="{background: item.num4 >=5 && item.num4 % 2 != 0 ?'#fa9932':'', color:'#fff'}">{{ item.num4 >=5 && item.num4 % 2 != 0 ? $t('大单'):'' }}</td>
                  <td :style="{background: item.num4 >=5 && item.num4 % 2 == 0 ?'#3cb0ec':'', color:'#fff'}">{{ item.num4 >=5 && item.num4 % 2 == 0 ? $t('大双'):'' }}</td>
                  <!-- 8个 -->
                  <td :style="{background: item.num5 <=4 ?'#fa9932':'', color:'#fff'}">{{ item.num5 <=4 ? $t('小'):'' }}</td>
                  <td :style="{background: item.num5 >=5 ?'#3cb0ec':'', color:'#fff'}">{{ item.num5 >=5 ? $t('大'):'' }}</td>
                  <td :style="{background: item.num5 % 2 != 0 ?'#fa9932':'', color:'#fff'}">{{ item.num5 % 2 != 0 ? $t('单'):'' }}</td>
                  <td :style="{background: item.num5 % 2 == 0 ?'#3cb0ec':'', color:'#fff'}">{{ item.num5 % 2 == 0 ? $t('双'):'' }}</td>
                  <td :style="{background: item.num5 <=4 && item.num5 % 2 != 0 ?'#fa9932':'', color:'#fff'}">{{ item.num5 <=4 && item.num5 % 2 != 0 ? $t('小单'):'' }}</td>
                  <td :style="{background: item.num5 <=4 && item.num5 % 2 == 0 ?'#3cb0ec':'', color:'#fff'}">{{ item.num5 <=4 && item.num5 % 2 == 0 ? $t('小双'):'' }}</td>
                  <td :style="{background: item.num5 >=5 && item.num5 % 2 != 0 ?'#fa9932':'', color:'#fff'}">{{ item.num5 >=5 && item.num5 % 2 != 0 ? $t('大单'):'' }}</td>
                  <td  :style="{background: item.num5 >=5 && item.num5 % 2 == 0 ?'#3cb0ec':'', color:'#fff'}">{{ item.num5 >=5 && item.num5 % 2 == 0 ? $t('大双'):'' }}</td>
                  <!-- 10个 -->
                  <td v-for="n in 10" :key="'td'+n+i" :class="{fencheng: calcYiLouFencheng(i, n, 'num4')}" 
                    >
                    <span :class="{orageBg: item.num4 == (n-1) }" :style="{background: item.num4 == (n-1)?numColors[n-1]:''}" class="orageBgItem">{{ item.num4 == (n-1)?(n -1) :  calcYiMa(i, n, 'num4') }}</span>
                  </td>
                  <!-- 10个 -->
                  <td v-for="m in 10" :key="'td2'+m+i" :class="{fencheng: calcYiLouFencheng(i, m, 'num5')}"
                    >
                    <span :class="{blueBg: item.num5 == (m-1)}"  :style="{background: item.num5 == (m-1)?numColors[m-1]:''}" class="blueBgItem">{{ item.num5 == (m-1)?(m-1) : calcYiMa(i, m, 'num5') }}</span>
                  </td>
                <!-- </template> -->
              </tr>
            </tbody>
          </table>
          <canvas class="frontC" id="frontC" width="1760"  v-show="zhexian"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import commonHeader from '@/components/CommonHeader.vue'
// import {i18n} from '@/assets/languages'

export default {
  name: 'HomeView',
  components:{
    commonHeader,
  },
  setup(){
    const state = reactive({
      dataList: [],
      dataListAll: [],

      yilou: true,
      zhexian: true,
      fencheng: true,
      fengexian: false,

      timeList: ['今天', '昨天', '前天', '最近50期', '最近100期', '最近500期'],
      currTimeSelect: '最近500期',
      gapX: 11,
      gapY: 11,

      timeDonwTotal: 24 * 3600,
      timeDown: 1000,
      results: [],
      currLottery: {},

      numColors: ['#fa8e19', '#ff0000', '#ff00c0', '#3cb0ec', '#005c06', '#ff7e00', '#00ffd8', '#cc00ff', '#ffae00', '#000000']
    })

    // const getMapData = () => {
    //   // simulate data
    //   let arr = []
    //   for(let i = 0;i< 30;i++){
    //     let num1 = Math.random() * 10 << 0,
    //         num2 = Math.random() * 10 << 0,
    //         num3 = Math.random() * 10 << 0,
    //         num4 = Math.random() * 10 << 0,
    //         num5 = Math.random() * 10 << 0;
    //     arr.push({
    //       issue: 10000 + i,
    //       lottery: num1 + '' + num2 + '' + num3 + '' + num4 + '' + num5,
    //       num4: num4, 
    //       num5: num5,
    //     })
    //   }
    //     state.dataList = arr
    // }
    // getMapData()
    
    const currTimeSelectHandle = (time) => {
      state.currTimeSelect = time
      switch(time){
        case '今天':
          state.dataList = [state.dataListAll[0]]
          break;
        case '昨天':
          state.dataList = [state.dataListAll[1]]
          break;
        case '前天':
          state.dataList = [state.dataListAll[2]]
          break;
        case '最近50期':
          state.dataList = state.dataListAll.slice(0, 50)
          break;
        case '最近100期':
          state.dataList = state.dataListAll.slice(0, 100)
          break;
        case '最近500期':
          state.dataList = state.dataListAll
          break;
      }
      setTimeout(() => {
        drawLine()
      }, 1)
    }

    const startTimeDownHandle = (time) => {
      const date = new Date()
      let currTime = date.getTime() + (7 + date.getTimezoneOffset()/60)* 3600 * 1000 
      const viDate = new Date(currTime)
      console.log(time, '越南时间：', viDate.getFullYear() + '/' + (viDate.getMonth()+1)+'/'+viDate.getDate() + ' ' + viDate.getHours()+':'+viDate.getMinutes()+':'+viDate.getSeconds()  )
      const hours = viDate.getHours(), minutes = viDate.getMinutes()
      const viTime = (hours>=10?hours:('0'+hours))+ ':'+(minutes>=10?minutes:('0'+minutes))

      const today = viDate.getFullYear() + '/'+(viDate.getMonth()+1)+'/'+viDate.getDate()
      //已经过了当天的开奖时间  time开奖时间，  viDate、viTime当前越南时间
      // '20:35' > "17:35" 
      if(currLotteryType == 'common'){
        if(viTime > time) {
          const tomorrow = new Date(viDate.getTime() + 24*3600*1000)
          state.timeDown = (new Date(tomorrow.getFullYear() + '/'+(tomorrow.getMonth()+1)+'/'+tomorrow.getDate()+ ' ' + time).getTime()/1000 - viDate.getTime()/1000) << 0
        }else{
          state.timeDown = (new Date(today+ ' ' + time ).getTime()/1000 - viDate.getTime()/ 1000) << 0
        }
      } else {
        // time 可能值， 5分钟， 2分钟
        const left = minutes % time 
        pingtaiSpan = time
        // const nextTime = new Date(viDate.getTime() + (time - left)*60*1000 - viDate.getSeconds() )
        state.timeDown = (time - left)*60 - viDate.getSeconds() //延迟一秒请求开奖
      }
      
      startTimeDown()
    }

    let currLotteryType, pingtaiSpan
    const lotterySelect = (item) => {
      let time
      if(!item.lotteryLabel){
        currLotteryType = 'pingtai'
        time = parseInt(item.lotteryDscCn)
      }else{
        currLotteryType = 'common'
        time = item.lotteryDscCn.split(' ')[1]
      }
      
      startTimeDownHandle(time)

      state.currLottery = item
      state.currTimeSelect = '最近500期'

      getMapData(item)
      
    }

    const getMapDataByCommon = (item) => {
      const reqData = {}
      let url = 'lottery/query'
      reqData["lotteryLabel"] = item.lotteryLabel
      reqData["rows"] = "500"
      
      store.dispatch(url, reqData).then(data => {
        // console.log('query', JSON.stringify(data))
        let arr = data.result
        arr.sort((item1, item2)=> {
          return item2.issue - item1.issue
        })
        if(!item.lotteryLabel){
          arr.forEach((item) => {
            item.winNumber = JSON.parse(item.winNumber)
            item.lottery = item.winNumber.firstNum
            item.num4 = item.lottery.charAt(3)
            item.num5 = item.lottery.charAt(4)
          })
        }else{
          arr.forEach((item) => {
            item.lottery = item.firstNum
            item.num4 = item.lottery.charAt(3)
            item.num5 = item.lottery.charAt(4)
          })
        }
        
        state.dataList = state.dataListAll = arr

        getLottery(item)
        // setTimeout(() => {
        //   drawLine()
        //   // startTimeDown()
        //   // drawLottery()
        // }, 1);
      })
    }

    const getMapDataByPingtai = (item) => {
      const reqData = {}
      let url = 'lottery/getPlatFormLottery'
      reqData["colorfulId"] = item.colorfulId + ''

      store.dispatch(url, reqData).then(data => {
          console.log('query', data)
          let arr = data.data
          arr.sort((item1, item2)=> {
            return item2.issue - item1.issue
          })

          arr.forEach((item) => {
            item.winNumber = JSON.parse(item.winNumber)
            item.lottery = item.winNumber.firstNum
            item.num4 = item.lottery.charAt(3)
            item.num5 = item.lottery.charAt(4)
          })
        
        
        state.dataList = state.dataListAll = arr

        state.results =  state.dataList[0].lottery.split('')
        state.zhexian = true
        setTimeout(() => {
            drawLine()
            drawLottery()
        }, 0);
      })
    }

    const getMapData = (item) => {
      state.dataList = []
      state.zhexian = false

       if(currLotteryType == 'common'){
        getMapDataByCommon(item)
      }else {
        getMapDataByPingtai(item)
      }
    }

    const getLottery = (item) => {
      store.dispatch('lottery/getLottery', {
        "lotteryLabel": item.lotteryLabel,
      }).then(res => {
        console.log('getLottery', res)
        const data = res.result
        if(data.issue && state.dataList[0].issue != data.issue){

          data.lottery = data.firstNum
          data.num4 = data.lottery.charAt(3)
          data.num5 = data.lottery.charAt(4)

          state.dataList.unshift(data)
        }
        state.results = data.firstNum.split('')
          // drawLine()
          // startTimeDown()
        state.zhexian = true
        setTimeout(() => {
            drawLine()
            drawLottery()
        }, 0);
      })
    }

    const selectHandle = (val) => {
      state[val] = !state[val]
      // if(val == 'zhexian' && state[val]){
      //   drawLine()
      // }
    }

    const drawLine = () => {
      const canvas = document.querySelector('#frontC')
      canvas.height = parseFloat(window.getComputedStyle(document.querySelector('#chartLinediv'), null)['height'])
      const context = canvas.getContext("2d");
      
      const canvasRect = canvas.getBoundingClientRect()
      
      context.beginPath();

      const orageBgItems = document.querySelectorAll('.orageBg')
      const blueBgItems = document.querySelectorAll('.blueBg')

      // let left, top;
      for(let i = 0; i< orageBgItems.length;i++){
        // left = orageBgItems[i].getBoundingClientRect().left
        // top  = 
        if(i == 0){
          context.moveTo(orageBgItems[i].getBoundingClientRect().left - canvasRect.left + state.gapX, orageBgItems[i].getBoundingClientRect().top - canvasRect.top + state.gapY);//线条开始位置
        }else{
          context.lineTo(orageBgItems[i].getBoundingClientRect().left - canvasRect.left + state.gapX, orageBgItems[i].getBoundingClientRect().top - canvasRect.top + state.gapY);//线条经过点
        }
      }
      context.lineWidth = 1;//设置线条宽度
      context.strokeStyle = "#1fa6e8";//设置线条颜色
      context.stroke();//用于绘制线条
      context.closePath();//结束绘制线条，不是必须的

      context.beginPath();
      for(let i = 0; i< blueBgItems.length;i++){
        if(i == 0){
          context.moveTo(blueBgItems[i].getBoundingClientRect().left - canvasRect.left + state.gapX, blueBgItems[i].getBoundingClientRect().top - canvasRect.top + state.gapY);//线条开始位置
        }else{
          context.lineTo(blueBgItems[i].getBoundingClientRect().left - canvasRect.left + state.gapX, blueBgItems[i].getBoundingClientRect().top - canvasRect.top + state.gapY);//线条经过点
        }
      }

      context.lineWidth = 1;//设置线条宽度
      context.strokeStyle = "#08bf02";//设置线条颜色
      context.stroke();//用于绘制线条
      context.closePath();//结束绘制线条，不是必须的
    }

    const calcYiMaMax = (j, n, val) => {
      if(state.yilou == false) return ''
      const len = state.dataList.length
      let result = 0, item
      for(let i = j;i <= len  - 1;i++){
        result++
        item = state.dataList[i][val]
        if(item == n-1){
          // result = 0
          break
        }
      }
      return result
    }

    // let xResult = 0
    const calcYiMa = (j, n, val) => {
      if(state.yilou == false) return ''
      let max = calcYiMaMax(j, n, val)
      let result = 0, item
     
      for(let i = j;i <= j + max - 1;i++){
        result++
        item = state.dataList[i] && state.dataList[i][val] || null
        if(item == n-1){
          result = 0
          break
        }
      }
      console.log(result)
      let res = max - result - 1
      return res < 1?1: res
    }

    const calcYiLouFencheng = (j, n, val) => {
      if(state.fencheng == false) return false
      let item
      for(let i = 0;i <= j;i++){
        item = state.dataList[i][val]
        if(item == n-1){
          return false
        }
      }
      return true
    }

    let setIntervalID
    const startTimeDown = () => {
      setIntervalID && window.clearInterval(setIntervalID)
      setIntervalID = window.setInterval(() => {
        state.timeDown--
        if(state.timeDown < 0){
          //普通彩票一天开一次， 平台彩票几分钟开一次
          if(currLotteryType == 'common'){
            state.timeDown = state.timeDonwTotal
            getLottery()
          }else{
            state.timeDown = pingtaiSpan * 60
            getMapDataByPingtai(state.currLottery)
          }
        }
      }, 1000)
    }

    const drawLottery = () => {
      // let arr = [Math.random() * 10 << 0,  Math.random() * 10 << 0,  Math.random() * 10 << 0,  Math.random() * 10 << 0,  Math.random() * 10 << 0]
      // state.results = arr

      // state.dataList.push({
      //     issue: state.dataList[state.dataList.length - 1].issue + 1,
      //     lottery: arr[0] + '' + arr[1] + '' + arr[2] + '' + arr[3] + '' + arr[4],
      //     num4: arr[3], 
      //     num5: arr[4],
      // })

      // setTimeout(() => {
      //   drawLine()
      // }, 1);

      // add animate
      let dom = document.querySelectorAll(".result_item")
      Array.prototype.slice.call(dom).forEach((v, i) => {
                // if(top + vh > v.offsetTop){
                    let delay = v.dataset.delay
                    if(delay){
                        setTimeout(() => {
                            v.style.opacity = 1
                            v.classList.add(v.dataset.ani)
                            v.innerTHTML = state.results[i]
                        }, delay)
                    } else {
                        v.style.opacity = 1
                        v.classList.add(v.dataset.ani)
                        v.innerTHTML = state.results[i]
                    }
            })
      setTimeout(() => {
         Array.prototype.slice.call(dom).forEach((v) => {
            v.classList.remove(v.dataset.ani)
         })
      }, 3000);
    }


    const forMatter = (time) => {
      let hour = time/ 3600 << 0
      let minute = (time - hour * 3600) / 60 << 0
      let second = time - hour * 3600 - minute * 60

      let res = (
        (hour>=10 ? hour:('0'+hour)) + ' : ' +
        (minute>=10 ? minute:('0'+minute)) + ' : ' +
        (second>=10 ? second:('0'+second)) 
      )
      return res
    }


    onMounted(() => {
      // setTimeout(() => {
      //   drawLine()
      //   startTimeDown()
      //   drawLottery()
      // }, 1)
    })

    return {
      ...toRefs(state),
      selectHandle,
      calcYiMa,
      calcYiLouFencheng,
      forMatter,

      lotterySelect,
      currTimeSelectHandle
    }
  }
}
</script>
<style lang="less" scoped>
.homeView{
  padding-bottom: 40px;
  .lottery_result{
    background-color: #fff;display: flex;align-items: center;padding: 15px 5px 15px 15px;justify-content:space-between;
    .logo_ct{
      display: flex;align-items: center;
      >img{margin-right: 15px;}
      >div{
        p{
          &:nth-child(1), &:nth-child(2){
            font-size: 18px;color:#333;
            margin-bottom: 8px;
          }
          &:nth-child(3){
            font-size: 12px;
          }
        }
      }
    }
    .time_down_ct{
      .name{font-size: 14px;}
      .time{font-size: 26px;font-weight: bold;}
    }
    .result_info{
      .name{font-size: 14px;padding-left: 6px;}
      .result{
        display: flex;
        .result_item{
          width: 88px;height: 88px;background: url("@/assets/images/result_bg.png") no-repeat;background-size: contain;
          font-size: 48px;color: #fff;font-weight: bold;text-align: center;line-height: 1.6;margin-left: 8px;
        }
      }
    }
  }
  .time_ct{
    display: flex;align-items: center;justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;padding:20px;
    .right{
      span{
        display: inline-block;padding: 6px 8px;cursor: pointer;margin-right: 8px;
        &:nth-last-child(1){
          margin-right: 0;
        }
        &:hover{
          color: #fa8e19
        }
      }
      .active {
        background: #fa8e19;color: #fff !important;border-radius: 4px;
      }
    }
  }
}
.lotteryMap{
  background-color: #fff !important;padding-bottom: 20px;
  #chartLinediv{
    position: relative;overflow:auto;min-width: 1200px;min-height: 600px;
    .fencheng{
        background: #9595c5 !important;
        span{color: #fff}
    }
  }
  .frontC{
    position: absolute;
    // height: 100%;width: 1760px;
    // left: 982px;top: 0;width: 780px;
    left: 0;top: 0;
    z-index: 1;
    // background-color: rgba(6, 5, 6, .4);
  }
  .map{
    border-collapse: collapse;width: 1760px;
    table-layout: fixed;margin: auto;
    th{
      line-height: 1.2;
      background: #f5f5f5;
      min-width: 18px;
      font-size: 12px;
      color: #555555;
      text-align: center;
      border: 1px solid #d6d6d6;box-sizing: border-box;
    }
    td{
      box-sizing: border-box;height: 30px;
      min-width: 18px;
      font-size: 12px;
      color: #555555;
      text-align: center;
      border: 1px solid #d6d6d6;
      

      .orageBg, .blueBg{
        width: 22px;height: 22px;background-color: #1fa6e8;
        display: inline-flex;align-items: center;justify-content: center;
        border-radius: 50%;color:#fff;position: relative;z-index: 4;
      }
      .blueBg{
        background-color:#08bf02  ;
      }
    }
    .first_th{
      th:nth-child(1){
        position:sticky;
        left:0; /* 首行在左 */
        z-index:1;
      }
      th:nth-child(2){
        position:sticky;
        left: 120px;z-index:1;
      }
      th:nth-child(3){
        position:sticky;
        left: 240px;z-index:1;
      }
    }
    thead{
      position:sticky;background-color: #f5f5f5;z-index: 5;
      top:0px; /* 第一列最上 */
      th{
        outline: 1px solid #d6d6d6;                
        outline-offset: -1px;
      }
    }
    tbody{
      tr{
        td:nth-child(1),td:nth-child(2),td:nth-child(3){
          position:sticky;
          left:0; /* 首行在左 */
          z-index:1;background-color: #ffffff !important;;
          outline: 1px solid #d6d6d6;                
          outline-offset: -1px;
        }
        td:nth-child(2){
          position:sticky;
          left: 120px;z-index:1;background-color: #ffffff !important;
          outline: 1px solid #d6d6d6;                
          outline-offset: -1px;
        }
        td:nth-child(3){
          position:sticky;
          left: 240px;z-index:1;background-color: #ffffff !important;
          outline: 1px solid #d6d6d6;                
          outline-offset: -1px;
        }
      }
    }
  }
  .fengexian{
    tbody{
      tr:nth-child(5n){
        border-bottom: 4px solid #d6d6d6;
      }
    }
  }

  .checkbox_ct{
    position:sticky;z-index: 2;left:0;background:#ffffff !important;margin: 0 20px;
    height: 60px;display:flex;align-items:center;border-bottom: 1px solid #d6d6d6;margin-bottom: 30px;
    ul{
      display: flex;
      li{
        margin-right: 18px;
      }
    }
    li{
      list-style: none;
      display: flex;align-items: center;cursor: pointer;
      >i{
        display: inline-block;
        width: 14px;
        height: 14px;
        line-height: 60px;
        border: 1px solid #cccccc;
        color: #FFFFFF;margin-right: 6px;
      }
      &:hover{
        >i{
          border-color: #fa8e19;
        }
        a{color: #fa8e19;}
      }
    }
    .checked{
      >i{
        background: url("@/assets/images/bjpknum.png") no-repeat -233px -251px !important;
      }
    }
  }
}
</style>
