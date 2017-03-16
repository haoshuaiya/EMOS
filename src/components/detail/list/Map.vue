<template>
  <div class="overall">
    <el-card>
        <div slot="header">
            <span style="line-height: 36px;">各项服务状态</span>
        </div>
        <div>
            <span>Apache服务</span>{{allState.ifApache | switchFilter}}
        </div>
        <div>
            <span>Nginx服务</span>
            {{allState.ifNginx | switchFilter}}
        </div>
        <div>
            <span>上传模块</span>
            {{allState.ifUpload | normalFilter}}
        </div>
    </el-card>
    <el-card >
      <div slot="header">
        <span style="line-height: 36px;">CPU</span>
        <el-button style="float: right;" type="primary" @click="routerGo('cpu')">详情</el-button>
      </div>
      <div>
        <el-progress type="circle" :percentage="allState.cpu.used"></el-progress>
      </div>
    </el-card>
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
            <div>总内存: {{allState.storage.all}}</div>
            <div>已用内存: {{allState.storage.used}}</div>
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
                发送: {{netcard.output}}
            </div>
            <div>
                接收:{{netcard.input}}
            </div>
            </div>
        </el-card>
        </template>
</div>
</template>
<script>
    export default {
        data() {
            return {
                // 概览数据，之后从全局变量取得
                allState: this.$root.$data.allState,
                loop:null
            }
        },
        methods: {
            // 路由跳转，之后写入util
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
        },
        created(){
            var that=this;
            this.loop=setInterval(function(){
                that.$parent.getData()
            },5000);
            this.$emit('changeData','map');
        },
        beforeDestroy(){
            clearInterval(this.loop)
        }
    }
</script>
<style scoped>
    .overall .el-card {
        width: 30%;
        min-width: 400px;
        height: 250px;
        margin-right: 3%;
        margin-bottom: 30px;
        cursor: pointer;
    }
    
    .overall .el-card:hover {
        -webkit-box-shadow: 2px 1px 1px 1px #8492A6;
        -moz-box-shadow: 2px 1px 1px 1px #8492A6;
        box-shadow: 2px 1px 1px 1px #8492A6;
    }
    /*.overall .el-card:nth-child(3n){*/
    /*margin-right: 0;*/
    /*}*/
</style>