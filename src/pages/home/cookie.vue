<template>
  <div id="box1"></div>
</template>

<script>
// 导入echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: [],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              // { value: 335, name: "直接访问" },
              // { value: 310, name: "邮件营销" },
              // { value: 234, name: "联盟广告" },
              // { value: 135, name: "视频广告" },
              // { value: 158, name: "搜索引擎" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    //   1-获取容器对应的dom
    // 2-初始化
    const instance = echarts.init(box1);
    // 设置配置对象
    instance.setOption(this.option);
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/charts").then((res) => {
        if (res.code == 200) {
          let legend = [];
          let series = [];
          res.list.forEach((item) => {
         
            legend.push(item.month + "月");
            series.push({ value: item.total, name: item.month + "月" });
          });
          // 更新配置对象
          let config = {
            legend: {
              data: legend,
            },
            series: [
              {
                data: series,
              },
            ],
          };
          // 合并对象
          this.option = Object.assign(this.option, config);
          const instance = echarts.init(box1);
          // 设置配置对象
          instance.setOption(this.option);
        }
      });
    },
  },
  created() {},
};
</script>

<style scoped>
#box1 {
  height: 400px;
}
</style>