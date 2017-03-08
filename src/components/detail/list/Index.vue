<template>
  <div class="list-main">
    <left-bar :disks="disks" :netcards="netcards"></left-bar>
    <router-view></router-view>
  </div>
</template>
<script>
  import LeftBar from './Leftbar.vue'
  export default{
    data(){
      return {
        disks:[
          {
            name:'磁盘1',
            usage:'20%'
          },{
            name:'磁盘2',
            usage:'30%'
          },{
            name:'磁盘3',
            usage:'88%'
          },{
            name:'磁盘4',
            usage:'40%'
          }
        ],
        netcards:[
          {
            name:'net 1',
            input:2000,
            output:1888
          },{
            name:'net 2',
            input:1000,
            output:88
          },{
            name:'net 3',
            input:2555,
            output:1999
          }
        ]
      }
    },
    components:{
      LeftBar
    }
  }
</script>
<style scoped>
  .list-main{
    margin-top: 20px;
  }
</style>
