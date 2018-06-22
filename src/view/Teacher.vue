<template>
  <div class="teacher-body">
    <div class="teacher-body-container">
      <!-- <img src="../assets/vip_ course_01.jpg"/>
      <img src="../assets/vip_ course_02.jpg"/>
      <img src="../assets/vip_ course_03.jpg"/>
      <img src="../assets/vip_ course_04.jpg"/>
      <img src="../assets/vip_ course_05.jpg"/>
      <img src="../assets/vip_ course_06.jpg"/>
      <img src="../assets/vip_ course_07.jpg"/>
      <img src="../assets/vip_ course_08.jpg"/>
      <img src="../assets/vip_ course_09.jpg"/>
      <img src="../assets/vip_ course_10.jpg"/>
      <img src="../assets/vip_ course_11.jpg"/>
      <img src="../assets/vip_ course_12.jpg"/>
      <img src="../assets/vip_ course_13.jpg"/> -->
    </div>
    <img class="gobuy" @click="vipClick" src="../assets/goBuy.jpg"/>
  </div>
</template>

<script>
import {getPrice , submitApply} from '../utils/service'
import {setStorage , getStorage} from '../server/localStorage'
import { mapState } from 'vuex'
export default {
  name: 'Teacher',
  computed: mapState(['utm_source','publicfrom']),
  components:{
  },
  methods:{
    vipClick () {
      let utm_source = this.utm_source||""
      let publicfrom = this.publicfrom||""
      console.log("+++++",utm_source,publicfrom)
      window.location.href = `https://order.hexun.com/order/web/package?groupid=6000503&utm_source=${utm_source}&publicfrom=${publicfrom}`
    }
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teacher-body{
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.teacher-body-container{
  width: 100%;
  padding-bottom: 0.90rem;
}
.teacher-body-container img {
  display: block;
  width: 100%;
}
.gobuy{
  position: fixed;
  display: block;
  bottom: 0;
  width: 7.50rem;
}
</style>
