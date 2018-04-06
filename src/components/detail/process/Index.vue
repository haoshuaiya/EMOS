<template>
  <div style="margin-top: 10px;">
    <p style="line-height:36px;">
      进程:<strong>{{processId}}</strong>
    </p>
    <el-table :data="processData" border :height="height">
      <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
      <el-table-column label="用户名" prop="name">
      </el-table-column>
      <el-table-column label="进程ID" prop="process">
      </el-table-column>
      <el-table-column label="CPU" sortable prop="cpu" :formatter="percent">
      </el-table-column>
      <el-table-column label="内存">
        <template scope="scope">
          {{scope.row.memory}}%
        </template>
      </el-table-column>
      <el-table-column label="虚拟内存">
        <template scope="scope">
          {{scope.row.virMem | byteFilter}}
        </template>
      </el-table-column>
      <el-table-column label="常驻内存">
        <template scope="scope">
          {{scope.row.conMem | byteFilter}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template scope="scope">
          <span v-html="statusFilter(scope.row.status)"></span>
        </template>
      </el-table-column>
      <el-table-column label="启动时间" prop="startTime">
      </el-table-column>
      <el-table-column label="使用CPU时间" prop="runTime">
      </el-table-column>
      <el-table-column label="命令" prop="command">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import axios from '../../../request/axios.js' 
  export default{
      data(){
          return {
            processData:[],
            processId:null,
            height:document.body.clientHeight-230
          }
      },
      methods:{
        getData(){
          axios.getProcessData({})
            .then(
              res=>{
                // console.log(res);
                this.processId=res.process_number;
                for( var temp in res.process){
                  var r=res.process[temp]
                  this.processData.push({
                    name:r[0],
                    process:r[1],
                    cpu:r[2],
                    memory:r[3],
                    virMem:r[4],
                    conMem:r[5],
                    status:r[7],
                    startTime:r[8],
                    runTime:r[9],
                    command:r[10]
                  });
                }
              }
            )
        },
        statusFilter(str){
          var res='';
          if(str.includes('S')){
            if(res){
              res+='<br>处于休眠状态'
            }else{
              res+='处于休眠状态'
            }
          }
          if(str.includes('<')){
            if(res){
              res+='<br>高优先级'
            }else {
              res+='高优先级'
            }
          }
           if(str.includes('s')){
            if(res){
              res+='<br>主进程'
            }else {
              res+='主进程'
            }
          }
          return res;
        },
        percent(row,column){
          return row.cpu+'%';
        }
      },
      created(){
        this.getData();
      },
      filters:{
        byteFilter(byte){
          return (byte/1024).toFixed(2)+'MB'
        }
      }
  }
</script>
