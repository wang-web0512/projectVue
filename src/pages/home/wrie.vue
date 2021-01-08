<template>
  <div class="ti">
    <vueWangeditor id="editor" width="100%" />
    <div id="box"></div>
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
// 导入echarts
import * as echarts from "echarts";
export default {
  components: {
    vueWangeditor,
  },
  mounted() {
    //   1-获取容器对应的dom
    // 2-初始化
    const instance = echarts.init(box);
    // 设置配置对象
    instance.setOption(this.option);
  },
  data() {
    return {
      content: `
      <h1>哈哈</h1>
      `,
      // 配置对象
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
          },
        ],
      },
    };
  },
};
</script>

<style  lang='stylus' scoped>
#box {
  height: 600px;
}
</style>