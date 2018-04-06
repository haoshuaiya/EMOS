<template>
  <div class="overall">
      <el-card class="cpu-detail">
        <div>
          <el-row class="cpu-static" :gutter="10">
            <el-col :span="6">
              <h3>
                  系统类型
                </h3>
                <div>
                  {{sysType}}
                </div>
                <h3>
                  PHP版本
                </h3>
                <div>
                  {{php}}
                </div>
            </el-col>
            <el-col :span="6">
              <h3>
                  发行版信息
                </h3>
                <div>
                  {{linuxDeliver}}
                </div>
                <h3>
                  系统版本
                </h3>
                <div>
                  {{version}}
                </div>
            </el-col>
            <el-col :span="6">
              <h3>
                系统语言
              </h3>
              <div>
                {{lang}}
              </div>
              <h3>
                服务器解析引擎
              </h3>
              <div>
                {{analytic}}
              </div>
            </el-col>
            <el-col :span="6">
              <h3>
                zend引擎版本
              </h3>
              <div>
                {{zend}}
              </div>
              <h3>
                脚本最大占用内存
              </h3>
              <div>
                {{memory}}
              </div>
            </el-col>
          </el-row>
          <el-row class="cpu-static" :gutter="10">
            <el-col :span="6">
              <h3>
                  脚本超时时间
                </h3>
                <div>
                  {{scriptMaxTime}}
                </div>
                <h3>
                  socket超时时间
                </h3>
                <div>
                  {{socketMaxTime}}
                </div>
            </el-col>
            <el-col :span="6">
              <h3>
                允许最大post数据
              </h3>
              <div>
                {{allowMax}}
              </div>
              <h3>
                上传文件大小限制
              </h3>
              <div>
                {{uploadMax}}
              </div>
            </el-col>
            <el-col :span="6">
              <h3>
                服务器接口类型
              </h3>
              <div>
                {{apiType}}
              </div>
              <h3>
                服务器端口
              </h3>
              <div>
                {{port}}
              </div>
            </el-col>
            <el-col :span="6">
              <h3>
                服务器IP
              </h3>
              <div>
                {{ip}}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
     <el-row class="clearfix" style="width:100%;">
       <el-col :span="12">
         <el-table :data ="extension">
          <el-table-column lable="序号" type="index" width="100"> </el-table-column>
          <el-table-column label="已编译扩展">
            <template scope="scope">
              {{scope.row}}
            </template>
          </el-table-column>
         </el-table>
       </el-col>
       <el-col :span="12">
         <el-table :data ="disabledArr">
          <el-table-column lable="序号" type="index" width="100"> </el-table-column>
          <el-table-column label="已禁用函数">
            <template scope="scope">
              {{scope.row}}
            </template>
          </el-table-column>
         </el-table>
       </el-col>
     </el-row>
  </div>
</template>
<script>
  import axios from '../../../request/axios.js'
  export default {
    data(){
      return {
        sysType:'',
        linuxDeliver:'',
        version:'',
        lang:'null',
        php:'',
        zend:'',
        analytic:'',
        memory:'',
        scriptMaxTime:'',
        socketMaxTime:'',
        allowMax:'',
        uploadMax:'0',
        apiType:'',
        ip:'',
        port:'',
        extension:[],
        disabledArr:[]
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){
        axios.getEnvData({}).
          then(
            res=>{
              this.sysType =res.sys_type;
              this.linuxDeliver=res.linux_deliver;
                this.version=res.version;
                this.lang=res.lang || 'null';
                this.php=res.php_v;
                this.zend=res.zend_v;
                this.analytic=res.analytic_eng;
                this.memory=res.script_mem;
                this.scriptMaxTime=res.script_max_time;
                this.socketMaxTime=res.socket_max_time;
                this.allowMax=res.allow_max_data;
                this.uploadMax=res.upload_max;
                this.apiType=res.srv_api_type;
                this.ip=res.srv_ip;
                this.port=res.srv_port;
                this.extension=res.all_extension;
                this.disabledArr=res.diabled_function.split(',');
            }
          )
          .catch(
            err =>{
              console.log('获取失败');
            }
          )
      }
    }
  }
</script>
<style scoped>
  .overall{
    min-height: auto;
  }
  .cpu-detail{
    height: 450px;
    margin-top: 15px;
    width: 100%;
  }
  .cpu-static{
    height: 220px;
  }
</style>
