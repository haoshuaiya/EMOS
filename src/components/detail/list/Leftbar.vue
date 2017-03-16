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
      <el-menu-item index="load" @click="routerGo('load')">
        <strong>系统负载</strong>
        <p>{{allState.load.used}}</p>
      </el-menu-item>
      <el-menu-item index="storage" @click="routerGo('storage')">
        <strong>内存</strong>
        <p>{{allState.storage.used}}/{{allState.storage.all}}({{allState.storage.rate}}%)</p>
      </el-menu-item>
      <el-menu-item index="connection" @click="routerGo('connection')">
        <strong>网络连接数</strong>
        <p>{{allState.connection}}</p>
      </el-menu-item>
      <!--<el-menu-item index="apache" @click="routerGo('apache')">
        <strong>Apache服务</strong>
        <p>{{allState.ifApache | switchFilter}}</p>
      </el-menu-item>
      <el-menu-item index="nginx" @click="routerGo('nginx')">
        <strong>Nginx服务</strong>
        <p>{{allState.ifNginx| switchFilter}}</p>
      </el-menu-item>
      <el-menu-item index="upload" @click="routerGo('upload')">
        <strong>上传模块</strong>
        <p>{{allState.ifUpload | normalFilter}}</p>
      </el-menu-item>-->
      <template v-for="disk in allState.disks">
        <el-menu-item :index="'disk/'+disk.name" @click="routerGo('disk',disk.name)">
          <strong v-html="'磁盘 '+disk.name"></strong>
          <p>{{disk.used}}%</p>
        </el-menu-item>
      </template>
<template v-for="netcard in allState.netcards">
        <el-menu-item :index="'netcard/'+netcard.name" @click="routerGo('netcard',netcard.name)">
          <strong v-html="'网卡 '+netcard.name"></strong>
          <p><span>发送:</span>{{netcard.output}}&nbsp;&nbsp; <span>接收:</span>{{netcard.input}}</p>
        </el-menu-item>
      </template>
</el-menu>
</div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: ["allState"],
        computed: {
            // 当前选中的index
            sideIndex() {
                if (this.$route.path.split('/')[6]) {
                    return this.$route.path.split('/')[5] + '/' + decodeURI(this.$route.path.split('/')[6])
                } else {
                    return this.$route.path.split('/')[5] || 'index';
                }
            }
        },
        methods: {
            // 路由跳转
            routerGo(name, model) {
                var self = this;
                self.$router.push({
                    name: name,
                    params: {
                        model: model
                    }
                });
            }
        },
        filters: {
            byteFilter(byteNum) {
                if (byteNum < 1024) {
                    return byteNum + ' B/s'
                } else if (byteNum < 1024 * 1024) {
                    return (byteNum / 1014).toFixed(3) + ' KB/s'
                } else if (byteNum < 1024 * 1024 * 1024) {
                    return (byteNum / (1024 * 1024)).toFixed(3) + 'MB/s'
                } else if (byteNum < 1024 * 1024 * 1024 * 1024) {
                    return (byteNum / (1024 * 1024 * 1024)).toFixed(3) + 'GB/s'
                } else {
                    return (byteNum / (1024 * 1024 * 1024 * 1024)).toFixed + 'TB/s'
                }
            },
            switchFilter(flag) {
                if (flag) {
                    return 'ON'
                } else {
                    return 'OFF'
                }
            },
            normalFilter(flag) {
                if (flag) {
                    return '正常'
                } else {
                    return '异常'
                }
            }
        }
    }
</script>
<style scoped>
    .left-bar-wrap {
        width: 250px;
    }
    
    .el-menu-item {
        line-height: 20px;
        min-height: 56px;
        height: auto;
        padding-top: 10px;
        width: 100%;
    }
    
    .el-menu-item:first-child {
        height: 56px;
        line-height: 56px;
        padding-top: 0;
    }
    
    .el-menu-item p {
        width: 100%;
        white-space: normal;
        word-break: break-all;
    }
    
    .el-menu-demo {
        padding-bottom: 10px;
    }
</style>