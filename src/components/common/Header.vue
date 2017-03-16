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
  .el-menu--dark {
    height: 55px;
    background-color: #323c51;
    border-bottom: 1px solid #eaebed;
  }
  .logo{
    float: left;
    height: 54px;
    padding: 12px 20px 13px 20px;
    margin-right: 65px;
  }
  .el-menu--horizontal .el-menu-item {
    float: left;
    height: 54px;
    line-height: 54px;
    border-bottom: 2px solid transparent;
  }
  .el-menu-item, .el-submenu__title {
    font-size: 16px;
  }
  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #fff;
    border-bottom: 2px solid #4990e2;
  }
  .user-info{
    float: right;
    height: 54px;
    line-height: 54px;
    padding-right: 40px;
    color: #fff;
  }
  .el-dropdown {
    font-size: 16px;
    height: 54px;
    line-height: 54px;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: block;
    padding-left: 40px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-info img{
    width:29px;
    height:29px;
    position: absolute;
    top:13px;
    left:0;
    border-radius: 50%;
  }
</style>
