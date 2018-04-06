<template>
  <div class="overall">
    <el-row style="height:450px;width:100%;" class="clearfix">
      <IEcharts :option="option"></IEcharts>
    </el-row>
    <el-card class="cpu-detail">
     <div slot="header" class="clearfix">
        <strong style="line-height:36px">
          网络连接数
        </strong>
     </div>
     <div>
      <el-row class="cpu-static" :gutter="10">
        <el-col :span="4">
           <h3>
              ESTABLISHED
            </h3>
            <div>
              {{established}}
            </div>
            <h3>
              LISTEN
            </h3>
            <div>
              {{listen}}
            </div>
        </el-col>
        <el-col :span="4">
          <h3>
            SYN_SENT
          </h3>
           <div>
           {{synSent}}
          </div>
          <h3>
            SYN_RECV
          </h3>
          <div>
            {{synRecv}}
          </div>
        </el-col>
        <el-col :span="4">
         <h3>
            FIN_WAIT1
         </h3>
          <div>
           {{finWait_1}}
          </div>
          <h3>
            FIN_WAIT2
         </h3>
          <div>
           {{finWait_2}}
          </div>
        </el-col>
        <el-col :span="4">
         <h3>
            CLOSE
         </h3>
          <div>
           {{close}}
          </div>
          <h3>
            CLOSE_WAIT
         </h3>
          <div>
           {{closeWait}}
          </div>
        </el-col>
        <el-col :span="4">
         <h3>
            CLOSING
         </h3>
          <div>
           {{closing}}
          </div>
          <h3>
            LAST_ACK
         </h3>
          <div>
           {{lastAck}}
          </div>
        </el-col>
        <el-col :span="4">
         <h3>
            TIME_WAIT
         </h3>
          <div>
           {{timeWait}}
          </div>
          <h3>
            UNKNOWN
         </h3>
          <div>
           {{unknown}}
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
                close: 0,
                closeWait: 0,
                closing: 0,
                established: 0,
                finWait_1: 0,
                finWait_2: 0,
                lastAck: 0,
                listen: 0,
                synRecv: 0,
                synSent: 0,
                timeWait: 0,
                unknown: 0,
                closeArr: [],
                closeWaitArr: [],
                closingArr: [],
                establishedArr: [],
                finWait_1_Arr: [],
                finWait_2_Arr: [],
                lastAckArr: [],
                listenArr: [],
                synRecvArr: [],
                synSentArr: [],
                timeWaitArr: [],
                unknownArr: [],
                loop: null,
                option: {
                    title: {
                        text: '网络连接数'
                    },
                    tooltip: {
                        trigger:'xAxis'
                    },
                    legend: {
                        data: ['ESTABLISHED', 'SYN_SENT', 'SYN_RECV', 'FIN_WAIT1', 'FIN_WAIT2', 'TIME_WAIT', 'CLOSE', 'CLOSE_WAIT', 'LAST_ACK', 'LISTEN', 'CLOSING', 'UNKNOWN']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.date,
                        name: '时间'
                    },
                    yAxis: {
                        type: 'value',
                        boundrayGap: false,
                        min: 0,
                        name: '连接数'
                    },
                    series: [{
                        name: 'ESTABLISHED',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'SYN_SENT',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'SYN_RECV',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'FIN_WAIT1',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'FIN_WAIT2',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'TIME_WAIT',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'CLOSE',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'CLOSE_WAIT',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'LAST_ACK',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'LISTEN',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'CLOSING',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }, {
                        name: 'UNKNOWN',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {

                            }
                        },
                        data: []
                    }]
                }
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
                axios.getLinkData({})
                    .then(
                        res => {
                            this.close = res.CLOSE;
                            this.closeArr.push(res.CLOSE);
                            this.closeWait = res.CLOSE_WAIT;
                            this.closeWaitArr.push(res.CLOSE_WAIT);
                            this.closing = res.CLOSING;
                            this.closingArr.push(res.CLOSING);
                            this.established = res.ESTABLISHED;
                            this.establishedArr.push(res.ESTABLISHED);
                            this.finWait_1 = res.FIN_WAIT1;
                            this.finWait_1_Arr.push(res.FIN_WAIT1);
                            this.finWait_2 = res.FIN_WAIT2;
                            this.finWait_2_Arr.push(res.FIN_WAIT2)
                            this.lastAck = res.LAST_ACK;
                            this.lastAckArr.push(res.LAST_ACK);
                            this.listen = res.LISTEN;
                            this.listenArr.push(res.LISTEN);
                            this.synRecv = res.SYN_RECV;
                            this.synRecvArr.push(res.SYN_RECV)
                            this.synSent = res.SYN_SENT;
                            this.synSentArr.push(res.SYN_SENT)
                            this.timeWait = res.TIME_WAIT;
                            this.timeWaitArr.push(res.TIME_WAIT);
                            this.unknown = res.UNKNOWN;
                            this.unknownArr.push(res.UNKNOWN);
                            this.option.xAxis.data = this.date;
                            this.option.series[0].data = this.establishedArr;
                            this.option.series[1].data = this.synSentArr;
                            this.option.series[2].data = this.synRecvArr;
                            this.option.series[3].data = this.finWait_1_Arr;
                            this.option.series[4].data = this.finWait_2_Arr;
                            this.option.series[5].data = this.timeWaitArr;
                            this.option.series[6].data=this.closeArr;
                            this.option.series[7].data=this.closeWaitArr;
                            this.option.series[8].data=this.lastAckArr;
                            this.option.series[9].data=this.listenArr;
                            this.option.series[10].data=this.closingArr;
                            this.option.series[11].data=this.unknownArr;
                            var sum = this.close+this.closeWait+this.closing+this.established+this.finWait_1+this.finWait_2+this.lastAck+this.listen+this.synRecv+this.synSent+this.timeWait+this.unknown;
                            this.$emit('changeData','connection',sum)
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
        beforeDestroy() {
            clearInterval(this.loop)
        }
    }
</script>