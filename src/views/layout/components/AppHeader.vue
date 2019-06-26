<template>
  <el-row :gutter="20">
   <el-col :span="10">
  江苏传智播客教育科技股份有限公司
     </el-col>
  <el-col :span="5" :offset="5">
    <el-dropdown>
       <img width="30" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi">
       <!-- <img :src="userInfo.photo" width="30"> -->
  <span class="el-dropdown-link">
  {{ userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>用户设置</el-dropdown-item>
    <!-- // .native 事件修饰符将原始的html页面注册到组件的根元素 -->
    <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
 
  </el-dropdown-menu>
</el-dropdown>
  </el-col>
</el-row>

</template>
<script>
import {getUser, removeUser} from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    this.userInfo = getUser()
  },
  methods: {
handleLogout () {
        this.$confirm('确认退出吗', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清空本地存储中的user_info
          // window.localStorage.removeItem('user-info')
          removeUser()
          //跳转到登录页
          this.$router.push( { name: 'login'} )
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
      }
    }
}

</script>
<style lang="less" scoped>

</style>
