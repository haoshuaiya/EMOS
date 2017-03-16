<template>
  <div class="overall">
    <el-row style="height:450px;width:100%;" class="clearfix">
      <IEcharts :option="usageData">
        
      </IEcharts>
    </el-row>
   <el-card class="cpu-detail">
     <div slot="header" class="clearfix">
        <strong style="line-height:36px">
          内存总量:{{allMem}}
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
              使用中
            </h3>
            <div>
              {{using}}
            </div>
            <h3>
              可用内存
            </h3>
            <div>
              {{freeMem}}
            </div>
        </el-col>
        <el-col :span="6">
          <h3>
            Swap使用中
          </h3>
          <div>
            {{swapUsed}}
          </div>
          <h3>
            swap可用
          </h3>
           <div>
            {{swapAll}}
          </div>
        </el-col>
        <el-col :span="6" style="padding-top: 15px;">
         <h3>
            已缓存
         </h3>
          <div>
           {{cache}}
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
                usageArr: [],
                allMem: '1',
                freeMem: '',
                using: '1',
                swapUsed: '',
                swapAll: '',
                cache: '',
                usageData: {
                    title: {
                        text: '内存使用情况'
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
                        max: this.allMem,
                        name: '内存使用量'
                    },
                    series: [{
                        name: '内存使用量',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
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
                axios.getMemData({})
                    .then(
                        res => {
                            this.allMem = res.mem_max;
                            this.using = res.using;
                            this.freeMem = res.free;
                            this.usageArr.push(parseFloat(res.using));
                            this.swapUsed = res.swap_used;
                            this.swapAll = res.swap_total;
                            this.cache = res.usage_cache;
                            this.usageData.xAxis.data = this.date;
                            this.usageData.series[0].data = this.usageArr;
                            this.$emit('changeData','storage', res.mem_max,res.using)
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
            this.loop = setInterval(function() {
                that.getData();
            }, 5000)
        },
        components: {
            IEcharts
        },
        computed: {
            curUsage() {
                return (parseFloat(this.using) / parseFloat(this.allMem)).toFixed(2) * 100;
            }
        },
        beforeDestroy() {
            clearInterval(this.loop);
        }
    }
</script>