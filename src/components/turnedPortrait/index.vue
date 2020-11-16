<template>
  <div class="W100 H100 content">
    <div class="H100 W100">
      <div class="box-start W100">
        <div class="threeTool2"
             style="min-height:361px;border-right:1px #dadada dashed">
          <div class="W100 size-title font-bold gray-dark Mb-20 box-justify">
            <div>携转用户月均ARPU分布</div>
            <el-date-picker v-model="value1"
                            size="small"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="threeTool"
               id="getBackTable"></div>
        </div>
        <div class="threeTool2"
             style="min-height:361px;">
          <div class="W100 size-title font-bold gray-dark Mb-20 box-justify">
            <div>携转用户年龄分布</div>
            <el-date-picker v-model="value2"
                            size="date"
                            placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="threeTool"
               id="getBackTable2"></div>
        </div>
      </div>
      <div class="box-start W100 Mt-40">
        <div class="threeTool3"
             style="min-height:361px;border-right:1px #dadada dashed">
          <div class="W100 size-title font-bold gray-dark Mb-20 box-justify">
            <div>携转用户原因分布</div>
            <el-date-picker v-model="value3"
                            size="small"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="threeTool"
               id="getBackTable3"></div>
        </div>
        <div class="threeTool3"
             style="min-height:361px;border-right:1px #dadada dashed">
          <div class="W100 size-title font-bold gray-dark Mb-20 box-justify">
            <div>携转用户流量超套分布</div>
            <el-date-picker v-model="value4"
                            size="small"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="threeTool"
               id="getBackTable4"></div>
        </div>
        <div class="threeTool3"
             style="min-height:361px">
          <div class="W100 size-title font-bold gray-dark Mb-20 box-justify">
            <div>携转用户语音超套分布</div>
            <el-date-picker v-model="value5"
                            size="small"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="threeTool"
               id="getBackTable5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "TurnedPortrait",
  data () {
    return {
      value1: null,
      myChart1: null,
      peiOption: {
        color: [
          "#3eb4fa",
          "#99c143",
          "#e40077",
          "#ff6347",
          "#7b68ee",
          "#00fa9a",
          "#ffd700",
          "#6699FF",
          "#ff6666",
          "#3cb371",
          "#b8860b",
          "#30e0e0",
          "#EF684A",
          "#57CDE6",
          "#A24AE2",
          "#1957F8",
          "#F5A622",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}数量: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: [
            "10~29",
            "30~49",
            "50~69",
            "70~99",
            "100~119",
            "120~139",
            "150~169"
          ]
        },
        series: [
          {
            name: "ARPU分布",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outer"
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              { value: 1, name: "10~29" },
              { value: 2, name: "30~49" },
              { value: 3, name: "50~69" },
              { value: 1, name: "70~99" },
              { value: 2, name: "100~119" },
              { value: 3, name: "120~139" },
              { value: 1, name: "150~169" }
            ]
          }
        ]
      },
      value2: null,
      myChart2: null,
      peiOption2: {
        color: [
          "#3eb4fa",
          "#99c143",
          "#e40077",
          "#ff6347",
          "#7b68ee",
          "#00fa9a",
          "#ffd700",
          "#6699FF",
          "#ff6666",
          "#3cb371",
          "#b8860b",
          "#30e0e0",
          "#EF684A",
          "#57CDE6",
          "#A24AE2",
          "#1957F8",
          "#F5A622",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}:数量: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: ["16~25", "26~35", "36~45", "46~55", "56~65", "66~75"]
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outer"
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              { value: 1, name: "16~25" },
              { value: 2, name: "26~35" },
              { value: 3, name: "36~45" },
              { value: 1, name: "46~55" },
              { value: 2, name: "56~65" },
              { value: 3, name: "66~75" }
            ]
          }
        ]
      },
      value3: null,
      myChart3: null,
      radarOption: {
        tooltip: {},
        legend: {
          data: ["原因分布"],
          top: 10,
          left: 10
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "资费不适配", max: 6500 },
            { name: "网络不满意", max: 16000 },
            { name: "宽带不满意", max: 30000 },
            { name: "合约到期", max: 38000 }
          ],
          radius: 80
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: "原因分布"
              }
            ]
          }
        ]
      },
      value4: null,
      myChart4: null,
      radarOption2: {
        color: [
          "#3eb4fa",
          "#99c143",
          "#e40077",
          "#ff6347",
          "#7b68ee",
          "#00fa9a",
          "#ffd700",
          "#6699FF",
          "#ff6666",
          "#3cb371",
          "#b8860b",
          "#30e0e0",
          "#EF684A",
          "#57CDE6",
          "#A24AE2",
          "#1957F8",
          "#F5A622",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}数量: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: ["资费不适配", "网络不满意", "宽带不满意", "合约到期"]
        },
        series: [
          {
            name: "携转用户原因分布",
            type: "pie",
            // radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outer"
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              { value: 1, name: "资费不适配" },
              { value: 2, name: "网络不满意" },
              { value: 3, name: "宽带不满意" },
              { value: 1, name: "合约到期" }
            ]
          }
        ]
      },
      value5: null,
      myChart5: null,
      radarOption3: {
        color: [
          "#3eb4fa",
          "#99c143",
          "#e40077",
          "#ff6347",
          "#7b68ee",
          "#00fa9a",
          "#ffd700",
          "#6699FF",
          "#ff6666",
          "#3cb371",
          "#b8860b",
          "#30e0e0",
          "#EF684A",
          "#57CDE6",
          "#A24AE2",
          "#1957F8",
          "#F5A622",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}数量: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: ["资费不适配", "网络不满意", "宽带不满意", "合约到期"]
        },
        series: [
          {
            name: "携转用户原因分布",
            type: "pie",
            // radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outer"
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                },
                labelLine: {
                  show: true
                }
              }
            },
            data: [
              { value: 1, name: "资费不适配" },
              { value: 2, name: "网络不满意" },
              { value: 3, name: "宽带不满意" },
              { value: 1, name: "合约到期" }
            ]
          }
        ]
      }
    };
  },
  mounted () {
    this.drawPei();
  },
  methods: {
    drawPei () {
      this.myChart1 = echarts.init(document.getElementById("getBackTable"));
      this.myChart1.clear();
      this.myChart1.setOption(this.peiOption);
      this.myChart2 = echarts.init(document.getElementById("getBackTable2"));
      this.myChart2.clear();
      this.myChart2.setOption(this.peiOption2);
      this.myChart3 = echarts.init(document.getElementById("getBackTable3"));
      this.myChart3.clear();
      this.myChart3.setOption(this.radarOption);
      this.myChart4 = echarts.init(document.getElementById("getBackTable4"));
      this.myChart4.clear();
      this.myChart4.setOption(this.radarOption2);
      this.myChart5 = echarts.init(document.getElementById("getBackTable5"));
      this.myChart5.clear();
      this.myChart5.setOption(this.radarOption3);
    }
  }
};
</script>

<style>
.threeTool3 {
  background-color: white;
  min-height: 250px;
  box-sizing: border-box;
  /* box-shadow: 0px 10px 12px 3px rgba(0,0,0,0.05); */
  padding: 10px 20px;
  width: 33.33%;
}
.threeTool2 {
  background-color: white;
  min-height: 250px;
  box-sizing: border-box;
  /* box-shadow: 0px 10px 12px 3px rgba(0,0,0,0.05); */
  padding: 10px 20px;
  width: 50%;
}
.threeTool {
  background-color: white;
  min-height: 250px;
  box-sizing: border-box;
  /* box-shadow: 0px 10px 12px 3px rgba(0,0,0,0.05); */
  padding: 10px 20px;
  width: 100%;
}
/* .content{
  height: calc(100vh - 143px);
  overflow:auto;
} */
</style>
