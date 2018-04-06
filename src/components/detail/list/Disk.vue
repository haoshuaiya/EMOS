<template>
  <div class="overall">
    <div style="width:100%;height:400px;">
      <IEcharts :option="option1"></IEcharts>
    </div>
    <div style="width:100%;height:400px;">
      <IEcharts :option="option2"></IEcharts>
    </div>
    <el-card class="cpu-detail">
     <div slot="header" class="clearfix">
        <strong style="line-height:36px">
          磁盘:{{$route.params.model}}
        </strong>
     </div>
     <div>
      <el-row class="cpu-static" :gutter="10">
        <el-col :span="6">
              <h3>使用率</h3>
              <el-progress type="circle" :percentage="used"></el-progress>
        </el-col>
        <el-col :span="6">
           <h3>
              读取速度
            </h3>
            <div>
              {{readSpeed}} KiB/s
            </div>
            <h3>
              总读取字节
            </h3>
            <div>
              {{readByte}} KiB
            </div>
        </el-col>
        <el-col :span="6">
          <h3>
            写入速度
          </h3>
          <div>
            {{writeSpeed}} KiB/s
          </div>
          <h3>
            总写入字节
          </h3>
           <div>
            {{writeByte}} KiB
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
      data() {
        return {
           loop:null,
           used:0,
           usedArr:[],
           date:[],
           readByte:0,
           writeByte:0,
           readSpeed:0,
           writeSpeed:0,
           readSpeedArr:[],
           writeSpeedArr:[],
           option1:{
             title:{
               text:'磁盘使用情况'
             },
             tooltip:{
               trigger:'axis'
             },
             xAxis:{
               type:'category',
               boundaryGap:false,
               data:[],
               name:'时间'
             },
             yAxis:{
               type:'value',
               min:0,
               max:100,
               name:'(%)'
             },
             series:[{
               name:'磁盘使用率',
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
           },
           option2:{
             title:{
               text:'磁盘读写速度'
             },
             tooltip:{
               trigger:'axis'
             },
             legend:{
               data:[
               'read','write'
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
               name:'(KiB/s)'
             },
             series:[{
               name:'read',
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
               name:'write',
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
        that.loop=setInterval(function(){
          that.getData();
        },5000)
      },
      methods:{
        getData(){
          var diskName=decodeURI(this.$route.params.model);
          this.addTime();
          axios.getDiskData({
            which_disk:diskName
          })
          .then(
            res =>{
              this.used=res[diskName].disk_usage_percent;
              this.usedArr.push(res[diskName].disk_usage_percent);
              this.readByte=res[diskName].disk_read_kibibytes;
              this.writeByte=res[diskName].disk_write_kibibytes;
              this.readSpeed=res[diskName].disk_read_speed;
              this.readSpeedArr.push(res[diskName].disk_read_speed);
              this.writeSpeed=res[diskName].disk_write_speed;
              this.writeSpeedArr.push(res[diskName].disk_write_speed);
              this.option1.xAxis.data=this.option2.xAxis.data=this.date;
              this.option1.series[0].data=this.usedArr;
              this.option2.series[0].data=this.readSpeedArr;
              this.option2.series[1].data=this.writeSpeedArr;
              this.$emit('changeData','disks',diskName,this.used);
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
      components: {
          IEcharts
      },
      beforeDestroy() {
          clearInterval(this.loop);
      },
      watch:{
        '$route'(to,from){
           this.option1.xAxis.data=this.option2.xAxis.data=this.date=[];
           this.option1.series[0].data=this.usedArr=[];
           this.option2.series[0].data=this.readSpeedArr=[];
           this.option2.series[1].data=this.writeSpeedArr=[];
          this.getData();
          this.getStatus(this.$route.path)
        }
      }
    }
</script>
