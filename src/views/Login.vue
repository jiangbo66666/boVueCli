<template>
  <div class="login">
    <el-form ref="form" :rules="rules" :model="form" class="form">
        <el-form-item>
            <img src="../assets/avatar.jpg" class="login-img">
          </el-form-item>
          
      <el-form-item prop='username'>
        <el-input v-model="form.username" prefix-icon="el-icon-service"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model="form.password" type='password' prefix-icon="el-icon-service"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click="submitForm('form')">登陆</el-button>
     </el-form>
  </div>
</template>

<script>
// import axios from 'axios'
import { confirmlogin } from '../api/api.js'
// const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios.defaults.baseURL = baseURL;

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules:{
        username:[
           { required: true, message: '请输入登陆名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
           { required: true, message: '请输入登陆密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          confirmlogin(this.form).then(res=>{
            if(res.meta.status==200){
              localStorage.setItem('mytoken',res.data.token)
              this.$router.push('/')
            }else{
              this.passworry(res.meta.msg)
            }
          })
        }
      })
    },
    passworry(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    },

  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2f4050;
  position: fixed;
  .form {
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: #fff;
    .login-img {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
