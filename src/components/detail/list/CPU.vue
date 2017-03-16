<template>
  <div class="overall">
    <el-row style="height:450px;width:100%;" class="clearfix">
      <IEcharts :option="usageData">
        
      </IEcharts>
    </el-row>
   <el-card class="cpu-detail">
     <div slot="header" class="clearfix">
        <strong style="line-height:36px">
          {{name}}
        </strong>
     </div>
     <div>
      <el-row class="cpu-static" :gutter="10">
        <el-col :span="6">
          <h3>使用率</h3>
          <el-progress type="circle" :percentage="curUsage"></el-progress>
        </el-col>
        <el-col :span="6">
          <h3>
            速度
          </h3>
          <div>
            {{speed}}
          </div>
          <h3>
            进程
          </h3>
           <div>
            {{processNum}}
          </div>
        </el-col>
        <el-col :span="6" style="padding-top:15px;">
         <h3>
            运行时间
         </h3>
          <div>
           {{uptime}}
          </div>
        </el-col>
        <el-col :span="3">
          <h3>
            插槽
          </h3>
          <div>
            {{cpuNum}}
          </div>
          <h3>
            内核
          </h3>
          <div>
            {{cpuCoreNum}}
          </div>
        </el-col>
        <el-col :span="3"> 
          <h3>
            逻辑处理器
          </h3>
          <div>
            {{cpuProcessNum}}
          </div>
          <h3>
            缓存
          </h3>
          <div>
            {{cpuCacheSize}}
          </div>
        </el-col>
      </el-row>
     </div>
   </el-card>
  </div>
</template>
<script>
    import axios from '../../../request/axios.js'
    import IEcharts from 'vue-echarts-v3'
    export default {
        data() {
            return {
                date: [],
                name: '',
                usageArr: [],
                curUsage: 0,
                speed: 0,
                uptime: '',
                cpuNum: 0,
                cpuCoreNum: 0,
                cpuProcessNum: 0,
                cpuCacheSize: '',
                processNum: 0,
                usageData: {
                    title: {
                        text: 'CPU使用情况'
                    },
                    tooltip: {
                        trigger: 'axis',
                        position: function(pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundrayGap: false,
                        data: this.date,
                        name: '时间'
                    },
                    yAxis: {
                        type: 'value',
                        boundrayGap: false,
                        min: 0,
                        max: 100,
                        name: '%'
                    },
                    series: [{
                        name: 'CPU使用率',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                color: 'rgb(255, 70, 131)'
                            }
                        },
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }]
                },
                loop: null
            }
        },
        methods: {
            addTime() {
                let now = new Date();
                let temp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
                this.date.push(temp);
            },
            getData(){
                this.addTime();
                axios.getCPUData({})
                    .then(
                        res => {
                            this.name = res.cpu_name;
                            this.curUsage = res.cpu_usage;
                            this.usageArr.push(res.cpu_usage);
                            this.speed = res.speed;
                            this.uptime = res.uptime;
                            this.cpuNum = res.cpu_num;
                            this.cpuCoreNum = res.cpu_core_num;
                            this.cpuProcessNum = res.cpu_processor_num;
                            this.cpuCacheSize = res.cpu_cache_size;
                            this.processNum = res.process_number;
                            this.usageData.xAxis.data = this.date;
                            this.usageData.series[0].data = this.usageArr;
                            this.$emit('changeData','cpu',res.cpu_usage);
                        }
                    )
                    .catch(
                        err => {

                        }
                    )
            }
        },
        created() {
            var that = this;
            that.getData();
            that.loop = setInterval(function() {
                that.getData();
            }, 5000);
        },
        components: {
            IEcharts
        },
        beforeDestroy() {
            clearInterval(this.loop);
        }
    }
</script>