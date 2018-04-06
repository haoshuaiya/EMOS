<template>
  <div class="overall">
    <div style="width:100%;height:500px;" class="clearfix">
      <IEcharts :option="option"></IEcharts>
    </div>
    <el-card class="cpu-detail">
     <div slot="header" class="clearfix">
        <strong style="line-height:36px">
          网卡:{{$route.params.model}}
        </strong>
     </div>
     <div>
      <el-row class="cpu-static" :gutter="10">
        <el-col :span="6">
           <h3>
              发送速率
            </h3>
            <div>
              {{sendSpeed}}
            </div>
            <h3>
              接受速率
            </h3>
            <div>
              {{receiveSpeed}}
            </div>
        </el-col>
        <el-col :span="6">
          <h3>
            已发送字节
          </h3>
          <div>
            {{sendByte}} B
          </div>
          <h3>
            已接收字节
          </h3>
           <div>
            {{receiveByte}} B
          </div>
        </el-col>
        <el-col :span="6">
          <h3>
            已发送包
          </h3>
          <div>
            {{sendPackage}}
          </div>
          <h3>
            已接收包
          </h3>
           <div>
            {{receivePackage}}
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
    export default{
      data(){
        return {
          loop:null,
          date:[],
          sendSpeed:'',
          sendSpeedArr:[],
          receiveSpeed:'',
          receiveSpeedArr:[],
          sendByte:'',
          receiveByte:'',
          sendPackage:'',
          receivePackage:'',
          option:{
            title:{
              text:'网卡信息'
            },
            tooltip:{
              trigger:'axis'
            },
            legend:{
              data:[
              '上行速率','下行速率'
            ]},
            xAxis:{
              type:'category',
              boundaryGap:false,
              data:[],
              name:'时间'
            },
            yAxis:{
              type:'value',
              min:0,
              name:'(B/s)'
            },
            series:[{
              name:'上行速率',
              type:'line',
              smooth:true,
              symbol:'none',
              itemStyle:{
                normal:{

                }
              },
              areaStyle:{
                normal:{

                }
              },
              data:[]
            },{
              name:'下行速率',
              type:'line',
              smooth:true,
              symbol:'none',
              itemStyle:{
                normal:{

                }
              },
              areaStyle:{
                normal:{

                }
              },
              data:[]
            }]
          }
        }
      },
      created(){
        var that=this;
        that.getData();
        that.loop =setInterval(function(){
          that.getData();
        },5000);
      },
      methods:{
         getData(){
          var netcardName=decodeURI(this.$route.params.model);
          this.addTime();
          axios.getNetcardData({
            which_netcard:netcardName
          })
          .then(
            res =>{
              this.sendSpeed=res[netcardName].send_speed;
              this.sendSpeedArr.push(parseFloat(res[netcardName].send_speed));
              this.receiveSpeed=res[netcardName].receive_speed;
              this.receiveSpeedArr.push(parseFloat(res[netcardName].receive_speed));
              this.sendByte=res[netcardName].send_bytes;
              this.receiveByte=res[netcardName].receive_bytes;
              this.sendPackage=res[netcardName].send_packets;
              this.receivePackage=res[netcardName].receive_packets;
              this.option.xAxis.data=this.date;
              this.option.series[0].data=this.sendSpeedArr;
              this.option.series[1].data=this.receiveSpeedArr;
              this.$emit('changeData','netcards',netcardName,this.receiveSpeed,this.sendSpeed)
            }
          )
          .catch(
            err =>{
              console.log('请求错误');
            }
          )
        },
        addTime() {
            let now = new Date();
            let temp = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
            this.date.push(temp);
        },
        getStatus(urlStr){
          var urlArr=urlStr.split('/');
          return urlArr[urlArr.length-1];
        }
      },
      components:{
        IEcharts
      },
      beforeDestroy() {
          clearInterval(this.loop);
      },
      watch:{
        '$route'(to,from){
          this.option.xAxis.data=this.date=[];
          this.option.series[0].data=this.sendSpeedArr=[];
          this.option.series[1].data=this.receiveSpeedArr=[];
          this.getData();
          this.getStatus(this.$route.path)
        }
      }
    }
</script>
