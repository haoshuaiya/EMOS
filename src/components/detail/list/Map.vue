<template>
  <div class="overall">
    <el-card >
      <div slot="header">
        <span style="line-height: 36px;">CPU</span>
        <el-button style="float: right;" type="primary" @click="routerGo('cpu')">详情</el-button>
      </div>
      <div>
        <el-progress type="circle" :percentage="allState.cpu.used"></el-progress>
      </div>
    </el-card>
    <template v-for="logic in allState.logics">
      <el-card>
        <div slot="header">
          <span style="line-height: 36px;">{{logic.name}}</span>
          <el-button style="float: right;" type="primary" @click="routerGo('logic')">详情</el-button>
        </div>
        <div>
          <el-progress type="circle" :percentage="logic.used"></el-progress>
        </div>
      </el-card>
    </template>
    <el-card>
      <div slot="header">
        <span style="line-height: 36px;">系统负载</span>
        <el-button style="float: right;" type="primary" @click="routerGo('load')">详情</el-button>
      </div>
      <div>
        {{allState.load.used}}
      </div>
      <div>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span style="line-height: 36px;">内存</span>
        <el-button style="float: right;" type="primary" @click="routerGo('storage')">详情</el-button>
      </div>
      <div>
        <div>总内存: {{allState.storage.all}} MiB</div>
        <div>已用内存: {{allState.storage.used}} MiB</div>
      </div>
      <div>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span style="line-height: 36px;">网络连接数</span>
        <el-button style="float: right;" type="primary" @click="routerGo('connection')">详情</el-button>
      </div>
      <div>
        {{allState.connection}}
      </div>
      <div>
      </div>
    </el-card>
    <template v-for="disk in allState.disks">
      <el-card>
        <div slot="header">
          <span style="line-height: 36px;">{{disk.name}}</span>
          <el-button style="float: right;" type="primary" @click="routerGo('disk',disk.name)">详情</el-button>
        </div>
        <div>
          <el-progress type="circle" :percentage="disk.used"></el-progress>
        </div>
      </el-card>
    </template>
    <template v-for="netcard in allState.netcards">
      <el-card>
        <div slot="header">
          <span style="line-height: 36px;">{{netcard.name}}</span>
          <el-button style="float: right;" type="primary" @click="routerGo('netcard',netcard.name)">详情</el-button>
        </div>
        <div>
          <div>
            发送: {{netcard.output}} B/s
          </div>
          <div>
            接收:{{netcard.input}} B/s
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        allState:{
          cpu:{used:80},
          logics:[
            {name:'logic1',used:35},
            {name:'logic2',used:44}
          ],
          load:{'used':0.44},
          storage:{
            'all':3000,
            'used':999
          },
          connection:34,
          disks:[
            { "name":"disk1",
              "used":44
            },{
              "name":"disk2",
              "used":47
            }
          ],
          netcards:[
            { "name":"netcard01",
              input:4999,
              output:3455
            },
            {"name":"netcard02",
              input:9999,
              output:3489
            }
          ]
        }
      }
    },
    methods:{
      routerGo(name,model){
        var self=this;
        self.$router.push({name:name,params:{
          model:model
        }});

      }
    }
  }
</script>
<style>
  .overall{
    padding:0 20px;
    /*border:1px solid #99A9BF;*/
    flex:1;
    display: flex;
    /*justify-content: flex-start;*/
    flex-wrap: wrap;
    /*align-items: center;*/
  }
  .overall .el-card{
    width:30%;
    min-width:400px;
    height:250px;
    margin-right: 3%;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .overall .el-card:hover{
    -webkit-box-shadow: 2px 1px 1px 1px #8492A6;
    -moz-box-shadow: 2px 1px 1px 1px #8492A6;
    box-shadow: 2px 1px 1px 1px #8492A6;
  }
  /*.overall .el-card:nth-child(3n){*/
    /*margin-right: 0;*/
  /*}*/
</style>
