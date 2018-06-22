<template>
  <div class="home-body">
    <div class="page page0" >
      <img src="../assets/page0_01.png" class="page0_01" />
    </div>
    <!-- <div class="loading" v-if="isLoading"><img src="../assets/loading.gif"/></div>
    <div class="confirm" v-if="showConfirm"><img src="../assets/tips.png" @click="confirm"/></div> -->
  </div>
</template>

<script>
import inputComponent from '../components/input-component'
import confirmComponent from '../components/confirm-component'
import {getIssue} from '../utils/service'
import {setStorage , getStorage} from '../server/localStorage'
export default {
  name: 'Home',
  data () {
    return {
      // isHave: false,
      // isLoading:false,
      // showConfirm:false
    }
  },
  computed:{},
  created () {
    this.start()
  },
  components:{
    inputComponent:inputComponent,
    confirmComponent:confirmComponent
  },
  methods:{
    start(){
      setTimeout(()=> {
        this.$router.push({name: 'WorldCup'});
      },2000);
    },
    ch(){
      // setStorage('userId','29836823')
      let status=getStorage("status");
      let user = getStorage('userId')
      if(user&&status&&status==="done"){
        this.isHave = true;
      }
    },
    getCoupon () {
      this.checkUser()
      // this.isHave = !this.isHave
    },
    confirm(){
      this.showConfirm=false;
      this.$router.push('/Teacher');
    },
    checkUser () {
      let user = getStorage('userId')
      let status=getStorage("status")
      if(user === null) {
        this.$router.push('/Login');
      }
      else{
        if(status&&status==="done"){
          this.$router.push('/Teacher');
        }
        else{
          this.isLoading=true
        }
      }
    },
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-body{
  width: 100%;
  height: 100%;
  max-width: 640px;
  min-width: 321px;
  background-color: #c70000;
  position: relative;
  overflow: hidden;
}
.page{
  width: 100%;
  height: 100%;
  max-width: 640px;
  min-width: 321px;
  background: url(../assets/page0_bg.jpg) no-repeat center center;
  -webkit-background-size: cover;
  background-size: cover;
  
}
.page0 .page0_01{
  position: absolute;
  top: 0%;
  width: 100%;
  left: 0%;
}
.loading{
  position: fixed;
  width: 7.50rem;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
}
.loading img{
  margin-top: 5rem;
  margin-left: 3.11rem;
  width: 1.28rem;
  height: 1.28rem;
}
.confirm{
  position: fixed;
  width: 7.50rem;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.7);
}
.confirm img{
  margin-top: 1rem;
  width: 7.50rem;
}
</style>
