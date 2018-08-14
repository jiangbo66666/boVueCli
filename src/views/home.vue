<template>
  <div>登陆成功</div>
</template>

<script>
import axios from 'axios'
  export default{
    data () {
      return {
        
      }
    },
    mounted() {
      axios.get('users',{params:{query:"",pagenum:2,pagesize:1}}).then(res=>res)
    },
  }
</script>

<style lang="less">

</style>

