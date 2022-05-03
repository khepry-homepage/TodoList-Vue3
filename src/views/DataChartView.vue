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
          <n-button size="large" type="primary" round strong :disabled="!range" @click="queryCompletedTodo">
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
import { echarts, api } from 'utils/index.js'
import HomeBasic from './HomeBasic.vue'
import throttle from 'lodash/throttle'

export default defineComponent({
  components: { HomeBasic },
  setup() {
    const state = reactive({
      pieChartRef: null,
      range: [Date.now(), Date.now()],
    })
    const config = {
      series: [{
          type: 'pie',
          data: [],
          radius: '50%',
          label: {  //修改labelline尾端显示的label的值
            show: true,
            formatter: '{b} ({d}%)',
            fontSize: 16,
          }
        }
      ],
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      title: {
        subtext: '过去事项完成情况',
        left: 'center'
      },        
      tooltip: {
        trigger: 'item',
        formatter: (params)=>{
          return `已完成: ${params.data?.complete} (${(params.data?.complete*100 / params.data?.value).toFixed(2)}%) </br>总数: ${params.data?.value}`
        }
      },
    }
    let myChart = null;
    const queryCompletedTodo = throttle(() => {
      let [ startTime, endTime ] = state.range;
      let range = [new Date(startTime).Format('yyyy-MM-dd hh:mm:ss'), new Date(endTime).Format('yyyy-MM-dd hh:mm:ss')];
      api.todo.completedTodo(range)
        .then(res => {
          let data = [];
          for (let ct of Object.values(res.data)) {
            let category = Object.create({});
            category.value = ct.total;
            category.complete = ct.complete;
            category.name = ct.categoryName;
            category.id = ct.categoryId;
            data.push(category);
          }
          
          let option = myChart.getOption();
          option.series[0].data = data;     
          myChart.setOption(option);
        })
    }, 2000)

    onMounted(() => {
      myChart = echarts.init(state.pieChartRef);
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      myChart.setOption(config);
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
    })

    return {
      ...toRefs(state),
      disablePreviousDate(ts) {
        return ts > Date.now();
      },
      queryCompletedTodo
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