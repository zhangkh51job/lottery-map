<template>
  <div class="about">
    <!-- <table cellspacing="0" border="0" cellpadding="0">
      <thead>
      <tr>
        <th>第一列</th>
        <th>第二列</th>
        <th>第三列</th>
        <th>第四列</th>
        <th>第五列</th>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>    
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
    </table> -->
    <canvas id="canvas" width="100%" height="100%"></canvas>
  </div>
</template>
<script>
import { nextTick, onMounted } from '@vue/runtime-core'
export default {
  setup() {
    onMounted(() => {
      nextTick(() => {
        const canvas = document.querySelector('#canvas')
        var context = canvas.getContext("2d");//得到绘图的上下文环境

        
        context.beginPath();//开始绘制线条，若不使用beginPath，则不能绘制多条线条
        context.moveTo(100, 100);//线条开始位置
        context.lineTo(1400, 1400);//线条经过点
        // context.lineTo(100, 700);
        // context.lineTo(100, 100);
        context.closePath();//结束绘制线条，不是必须的
       
        context.lineWidth = 1;//设置线条宽度
        context.strokeStyle = "red";//设置线条颜色
        context.stroke();//用于绘制线条


        // context.beginPath();
        // context.moveTo(200, 100);
        // context.lineTo(700, 600);
        // context.closePath();
        // context.strokeStyle = "black";
        // context.stroke();
      })
    })
  },
}
</script>
<style lang="less" scoped>
.about{
      overflow:auto;
      // width:400px;
      // height:290px; /* 固定高度 */
      border:1px solid gray;
      border-bottom: 0;
      border-right: 0;
      width: 1500px;
      height: 1500px;
      // canvas{
      //   width: 1500px;
      //   height: 1500px;
      // }

    }

    td, th {
      border-right :1px solid gray;
      border-bottom :1px solid gray;
      width:100px;
      height:30px;
      box-sizing: border-box;
    }

    th {
      background-color:lightblue;
    }


    table {
      display: none;
      border-collapse:separate;
      table-layout: fixed;
      width: 100%; /* 固定寬度 */
    }

    td:nth-child(1), th:nth-child(1), 
    td:nth-child(2), th:nth-child(2), 
    td:nth-child(3), th:nth-child(3) {
      position:sticky;
      left:0; /* 首行在左 */
      z-index:1;
      // background-color:lightpink;
    }
    td:nth-child(2), th:nth-child(2){
      left: 100px;z-index:1;
    }
    td:nth-child(3), th:nth-child(3){
      left: 200px;z-index:1;
    }

    thead tr th {
      position:sticky;
      top:0; /* 第一列最上 */
    }

    th:first-child{
      z-index:2;
      background-color:lightblue;
    }
</style>
