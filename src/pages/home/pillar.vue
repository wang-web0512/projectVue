<template>
  <div>
    <v-chart :options="lineOptions" style="width: 100%" />
  </div>
</template>

<script>
// 导入echarts
import "echarts/lib/chart/line"; //折线图需要的绘制工具
import "echarts/lib/chart/bar"; //柱图需要的绘制工具
import "echarts/lib/chart/pie"; //饼图需要的绘制工具

//辅助绘制工具
import "echarts/lib/component/title"; //绘制标题
import "echarts/lib/component/tooltip"; //绘制鼠标悬浮提示框

// 导入vue-echart
import vChart from "vue-echarts";
import Vue from "vue";
// 注册组件
Vue.component("v-chart", vChart);
export default {
  data() {
    return {
      lineOptions: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.el-main {
  height: 800px !important;
  margin-top: 50px;
}
</style>