<template>
   <div class="login-wrap">
     <!-- <img src="@/assets/login_bg.jpg" alt=""> -->
    <!-- 给组件加 class，会把这个 class 作用到组件的根元素上 -->
    <div class="form-wrap">
      <div class="form-head">
        <img src="@/assets/logo_index.png" alt="黑马头条号">
      </div>
      <el-form
       class="form-content" 
       ref="form"
        :model="form"
        :rules="rules"
        >
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- el-col 栅格布局，一共 24 列，:span 用来指定占用的大小，:offset 用来指定偏移量 -->
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <el-button
             @click=" handleSendCode"
             :disabled="!!codeTimer"
             >{{codeTimer? `剩余${codeTimeSeconds}秒`:`获取验证码`}}</el-button>
          </el-col>
        </el-form-item>
         <el-form-item prop="agree">
          <el-checkbox class="agree-checkbox" v-model="form.agree"></el-checkbox>
          <span class="agree-text">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vender/gt'  //引入极验 js SDK文件，通过 window.initGeetest 使用
import { saveUser } from '@/utils/auth'

const initCodeTimeSeconds = 10

export default {
  name: 'AppLogin',
  data () {
    return {
    form: {
    mobile: '',
    code: '',
    agree: '',
      },
   
      rules: {
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/\d{11}/, message: '长度必须为11位', trigger: 'blur' }
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            {pattern:/\d{6}/, message: '长度为六位数', trigger: 'blur' }
        ],
         agree: [
            { required: true, message: '请同意用户协议' },
            {pattern:/true/, message: '请同意用户协议'}
        ],
      },
      codeTimer: null,
      codeTimeSeconds: initCodeTimeSeconds
    }
  },
  methods: {
    handleLogin () {
  this.$refs['form'].validate (valid => {
    if( !valid ) {
      return
    }
    this.submitLogin ()
  })
    },
    submitLogin () {
      const { mobile,code } = this.form
axios({
    method: 'POST',
    url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
    data: {
  mobile,
  code
    }
  }).then( res => {
    const userInfo = res.data.data
  
    window.localStorage.setItem('user_info',JSON.stringify(userInfo))
    // saveUser(userInfo)
  this.$message ({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        } 
        )
  }).catch ((e) => {
      this.$message.error('登录失败，手机号或验证码错误')
  })
    },
    handleSendCode () {
      this.$refs['form'].validateField('mobile', errorMessage => {
        //验证手机号是否有效
       if (errorMessage.trim ().length > 0) {
     return
       }
       //验证通过，初始化显示验证码
       this.showGeetest ()
      })   
},
showGeetest () {
   const { mobile } = this.form
      axios({
       method: 'GET',
       url: `http://toutiao.course.itcast.cn/mp/v1_0/captchas/${ mobile }`
      }).then(res => {
        const { data } = res.data
      window.initGeetest ({
        product: 'bind',
          gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true
      // },function ( captchaObj) {
      }, captchaObj => {
      //  captchaObj.onReady (function () {
        captchaObj.onReady( () => {
        //验证码ready之后才能调用verify方法显示验证码
        captchaObj.verify ()
    // }).onSuccess (function () {
       }).onSuccess ( () => {
        //your code
        // console.log (captchaObj.getValidate () )
        const {
          geetest_challenge:challenge,
        geetest_seccode: seccode,
        geetest_validate: validate
        } = captchaObj.getValidate ()
        axios({
            method: 'GET',
            url: `http://toutiao.course.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
            params: {
          challenge,
          seccode,
         validate
            }
          }).then(res => {
    //  console.log( res.data )
//定时器的开启
        this.codeTimer = window.setInterval (() => {
        this.codeTimeSeconds--
        if( this.codeTimeSeconds <=0 ) {
          window.clearInterval( this.codeTimer )
          this.codeTimeSeconds = initCodeTimeSeconds

          this.codeTimer = null  //将存储定时器引用的变量重新赋值为null
        }
      },1000)
          })
      }).onError (function () {
          //your code
      })
      })
      })
    }
  }
  
}
</script>

<style lang="less" scoped >
.login-wrap {
  height:100%;
  background-color: #2b3e4a;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
     .agree-checkbox {
      margin-right: 10px;
    }
    .agree-text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
