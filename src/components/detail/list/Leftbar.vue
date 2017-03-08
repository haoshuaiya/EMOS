<template>
  <div class="left-bar-wrap">
    <el-menu  theme="dark"  :default-active="sideIndex" class="el-menu-demo">
      <el-menu-item index="index" @click="routerGo('index')">
        总览
      </el-menu-item>
      <el-menu-item index="cpu" @click="routerGo('cpu')" >
        <strong>CPU</strong>
        <p>15%</p>
      </el-menu-item>
      <el-menu-item index="logic" @click="routerGo('logic')">
        <strong>逻辑处理器</strong>
        <p><span>20%</span>&nbsp;<span>30%</span></p>
      </el-menu-item>
      <el-menu-item index="load" @click="routerGo('load')">
        <strong>系统负载</strong>
        <p>0.42</p>
      </el-menu-item>
      <el-menu-item index="storage" @click="routerGo('storage')">
        <strong>内存</strong>
        <p>890.99MiB / 988.90MiB (90%)</p>
      </el-menu-item>
      <el-menu-item index="connection" @click="routerGo('connection')">
        <strong>网络连接数</strong>
        <p>30</p>
      </el-menu-item>
      <template v-for="disk in disks">
        <el-menu-item :index="'disk/'+disk.name" @click="routerGo('disk',disk.name)">
          <strong>{{disk.name}}</strong>
          <p>{{disk.usage}}</p>
        </el-menu-item>
      </template>
      <template v-for="netcard in netcards">
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
    props:['disks','netcards'],
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
