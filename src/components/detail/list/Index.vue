<template>
  <div class="list-main">
    <left-bar :allState="stateData"></left-bar>
    <router-view  @changeData="change"></router-view>
  </div>
</template>
<script>
    import LeftBar from './Leftbar.vue'
    import axios from '../../../request/axios.js'
    export default {
        data() {
            return {
                // 左侧导航栏数据，之后从全局变量中取得
                stateData: this.$root.$data.allState
            }
        },
        components: {
            LeftBar
        },
        created() {
            this.getData();
        },
        methods:{
            change(){
                var arg = Array.from(arguments);
                switch(arg[0]){
                    case 'cpu':
                    case 'load':
                        this.stateData[arg[0]].used = arg[1];
                        break;
                    case 'connection':
                    case 'ifNginx':
                    case 'ifApache':
                    case 'ifUpload':
                        this.stateData[arg[0]]=arg[1];
                        break;
                    case 'storage':
                        this.stateData.storage.all=arg[1];
                        this.stateData.storage.used=arg[2];
                        this.stateData.storage.rate=(parseFloat(arg[2])/parseFloat(arg[1])).toFixed(2)*100;
                        break;
                    case 'disks':
                        var oIndex=this.stateData.disks.findIndex(function(value){
                            return value.name==arg[1];
                        });
                        this.stateData.disks[oIndex].name=arg[1];
                        this.stateData.disks[oIndex].used=arg[2];
                        break;
                    case 'netcards':
                         var oIndex=this.stateData.netcards.findIndex(function(value){
                            return value.name==arg[1];
                        });
                        this.stateData.netcards[oIndex].name=arg[1];
                        this.stateData.netcards[oIndex].input=arg[2];
                        this.stateData.netcards[oIndex].output=arg[3];
                        break;
                    default:
                }
            },
            getData(){
                axios.getLeftBar({})
                .then(res => {
                    var allState = this.$root.$data.allState;
                    allState.cpu.used = res.left.cpu_load;
                    allState.load.used = res.left.sys_load[0];
                    allState.storage.all = res.left.memory_usage_total;
                    allState.storage.used = res.left.memory_usage_used;
                    allState.storage.rate = parseFloat(res.left.memory_rate);
                    allState.connection = res.left.net_links;
                    allState.disks = [];
                    for (let key in res.left.disk) {
                        allState.disks.push({
                            name: key,
                            used: res.left.disk[key].disk_usage_percent
                        });
                    }
                    allState.netcards = [];
                    for (let key in res.left.net_card) {
                        allState.netcards.push({
                            name: key,
                            input: res.left.net_card[key].receive,
                            output: res.left.net_card[key].send
                        })
                    }
                    allState.ifNginx = res.left.if_nginx;
                    allState.ifApache = res.left.if_httpd;
                    allState.ifUpload = res.left.if_upload;
                })
                .catch(err => {
                    console.log('获取失败');
                })
            }
        }
    }
</script>
<style scoped>
    .list-main {
        margin-top: 20px;
        display: flex;
    }
</style>