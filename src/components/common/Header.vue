<template>
  <header>
    <el-menu theme="dark"  mode="horizontal" :default-active="activeIndex" class="el-menu-demo">
      <div class="logo">
        <img src="../../assets/logo.png" alt="课立方">
      </div>
      <el-menu-item index="1" router="/main">
          运维中心
      </el-menu-item>
      <el-menu-item index="2" router="/">
        报表管理
      </el-menu-item>
      <el-menu-item index="3" router="/">
      系统设置
     </el-menu-item>
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../assets/student-bg.png">
                    {{username}}
                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </header>
</template>
<script>
  export default{
    data(){
      return {
        activeIndex:'1',
      }
    },
    computed:{
      username(){
        let username =localStorage.getItem('username');
        return username ? username :'admin'
      }
    },
    methods:{
      handleCommand(command){
        if (command =='logout'){
          localStorage.removeItem('username');
          this.$router.push('/login')
        }
      }
    }
  }
</script>
<style scoped>
  .logo{
    float: left;
    margin-right: 200px;
  }
  .user-info{
    float: right;
    height:100%;
    line-height:60px;
    padding-right: 50px;
    color: #fff;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info img{
    width:40px;
    height:40px;
    position: absolute;
    top:10px;
    left:0;
    border-radius: 50%;
  }
</style>
