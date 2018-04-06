<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="login-head">
        <h1>课立方运维管理系统</h1>  
      </div>
      <div class="login-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="submitForm('ruleForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <p style="font-size:12px;line-height:20px;color:#999;text-align: left">Tips : 用户名和密码随便填。</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名'},
            {min:3,max:15,message:'用户名在3到15个字符'}
//            {type:'email',message:'不合法邮箱',trigger:'blur'}
          ],
          password: [
            {required: true, message: '请输入密码'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName){
        const self =this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem('username', self.ruleForm.username);
            self.$router.push('/main')
          } else {
            console.log('error submit !')
            return false;
          }
        })
      }
    }
  }
</script>
<style scoped>
  .login-wrap{
    width:100%;
    height:100%;
    position: relative;
  }
  .login-box{
    width:500px;
    height:400px;
    position: absolute;
    top:calc(50% - 300px);
    left:calc(50% - 250px);
    text-align: center;
  }
  .login-head{
    color: #fff;
    margin-bottom: 30px;
    /*text-indent: 3em;*/
  }
  .login-head h1{
    font-weight: normal;
  }
  .login-main{
    width:350px;
    height:230px;
    background-color: #fff;
    padding:20px;
    margin:0 auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .login-btn{
    width:100%;
  }
</style>
