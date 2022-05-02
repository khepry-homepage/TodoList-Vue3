<template>
  <home-basic>
    <template #title>
      <div class="title">
        完成情况统计
      </div>
    </template>
    <template #main>
      <n-card embedded hoverable>
        <template #header>
          选择日期
        </template>
        <template #default>
          <n-date-picker v-model:value="range" type="daterange" clearable
                    :is-date-disabled="disablePreviousDate" />
        </template>
        <template #footer>
          <n-button size="large" type="primary" round strong :disabled="!range">
            查看事项完成情况
          </n-button>
        </template>
      </n-card>
        <div ref="pieChartRef" id="pie-chart" class="pie-chart">
        </div>
    </template>
  </home-basic>
</template>

<script>
import { defineComponent, toRefs, reactive, onMounted } from 'vue'
import echarts from 'utils/echarts.js'
import HomeBasic from './HomeBasic.vue'

export default defineComponent({
  components: { HomeBasic },
  setup() {
    const state = reactive({
      pieChartRef: null,
      range: [Date.now(), Date.now()],
      config: {
          series: [{
              type: 'pie',
              data: [
                {
                  value: 335, //饼状图默认显示数据
                  name: '生活',
                  isDone: 320,
                },
                {
                  value: 234,
                  name: '学习',
                  isDone: 220,
                },
                {
                  value: 1548,
                  name: '工作',
                  isDone: 1500,                    
                }
              ],
              radius: '50%',
              label: {  //修改labelline尾端显示的label的值
                show: true,
                formatter: '{b}({d})%',
                fontSize: 10,
              }
            }
          ],
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          title: {
            // text: '主标题',
            subtext: '过去事项完成情况',
            left: 'center'
          },        
          tooltip: {
            trigger: 'item',
            formatter: (params)=>{
              for (let idx in state.config.series) {
                let dataIdx = params.dataIndex
                let data = state.config.series[idx].data[dataIdx]
                //es6新增字符串写法: `${js表达式}`
                return `已完成:${data.isDone}(${(data.isDone*100/data.value).toFixed(2)}%)</br>总数:${data.value}`
              }
            }
          },
      },

    })
    const drawPieChart = () => {
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      let myChart = echarts.init(state.pieChartRef);
      myChart.setOption({
        series: state.config.series,
        tooltip: state.config.tooltip,
        legend: state.config.legend,
        title: state.config.title,
      });
      myChart.on('mouseover', (params)=> {
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0, // 显示第几个series
          dataIndex: params.dataIndex // 显示第几个数据
        });
      });
      window.onresize = function() {
        myChart.resize();
      };
      myChart.resize();
    }

    onMounted(() => {
      drawPieChart();
    })

    return {
      ...toRefs(state),
      disablePreviousDate(ts) {
        return ts > Date.now();
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: left;
  color: rgb(243, 243, 243);
  font-size: 2rem;
  &::before {
    margin-left: 1rem;
    font-family: "iconfont" !important;
    content: "\e632";
  }
}
#pie-chart {
  height: 25rem;
}
#home-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  .todo-header {
    height: 10rem;
  }
  .todo-footer {
    height: 5rem;
  }
  .todo-main {
    position: relative;
    flex: 1 0;
    width: 0;
    height: 0;
  }
}
.todo-header,
.todo-footer
{
  display: flex;
  align-items: center;
  background-color: rgb(91, 138, 226);
}
.todo-header {
  flex-direction: column;
}
</style>