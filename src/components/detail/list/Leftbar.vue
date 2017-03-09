<template>
  <div class="left-bar-wrap">
    <el-menu  theme="dark"  :default-active="sideIndex" class="el-menu-demo">
      <el-menu-item index="index" @click="routerGo('index')">
        总览
      </el-menu-item>
      <el-menu-item index="cpu" @click="routerGo('cpu')" >
        <strong>CPU</strong>
        <p>{{allState.cpu.used}}%</p>
      </el-menu-item>
      <el-menu-item index="logic" @click="routerGo('logic')">
        <strong>逻辑处理器</strong>
        <p>
          <span v-for="logic in allState.logics">
            {{logic.used}}%
          </span>
        </p>
      </el-menu-item>
      <el-menu-item index="load" @click="routerGo('load')">
        <strong>系统负载</strong>
        <p>{{allState.load.used}}</p>
      </el-menu-item>
      <el-menu-item index="storage" @click="routerGo('storage')">
        <strong>内存</strong>
        <p>{{allState.storage.used}}MiB/{{allState.storage.all}}MiB({{(allState.storage.used/allState.storage.all).toFixed(2)*100}}%)</p>
      </el-menu-item>
      <el-menu-item index="connection" @click="routerGo('connection')">
        <strong>网络连接数</strong>
        <p>{{allState.connection}}</p>
      </el-menu-item>
      <template v-for="disk in allState.disks">
        <el-menu-item :index="'disk/'+disk.name" @click="routerGo('disk',disk.name)">
          <strong>{{disk.name}}</strong>
          <p>{{disk.used}}%</p>
        </el-menu-item>
      </template>
      <template v-for="netcard in allState.netcards">
        <el-menu-item :index="'netcard/'+netcard.name" @click="routerGo('netcard',netcard.name)">
          <strong>{{netcard.name}}</strong>
          <p><span>发送:</span>{{netcard.output}} B/s  &nbsp;&nbsp; <span>接收:</span>{{netcard.input}} B/s</p>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
  export default{
    data(){
      return {

      }
    },
    props:["allState"],
    computed:{
      sideIndex(){
        if(this.$route.path.split('/')[6]){
          return this.$route.path.split('/')[5]+'/'+decodeURI(this.$route.path.split('/')[6])
        }else{
          return this.$route.path.split('/')[5] || 'index';
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
<style scoped>
  .left-bar-wrap{
    width:250px;
  }
  .el-menu-item{
    line-height: 20px;
    min-height:56px;
    height:auto;
    padding-top: 10px;
  }
  .el-menu-item:first-child{
    height:56px;
    line-height:56px;
    padding-top: 0;
  }
  .el-menu-demo{
    padding-bottom: 10px;
  }
</style>
