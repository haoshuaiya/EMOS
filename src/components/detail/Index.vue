<template>
  <div>
    <v-header></v-header>
    <div class="content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">总览</el-breadcrumb-item>
        <el-breadcrumb-item>{{school}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view>

      </router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from './common/Header.vue'
  import vFooter from '../common/Footer.vue'
  import Store from '../../../static/store/store'
  export default {
    data(){
      return {
        school:localStorage.getItem('school'),
        cardArr:[
          {

          }
        ]
      }
    },
    components:{
      vHeader,vFooter
    }
  }
</script>
<style scoped>
  .content{
    margin-top: 20px;
  }
</style>
