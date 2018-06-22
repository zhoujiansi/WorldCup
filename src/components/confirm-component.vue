<template>
  <section class="confirm-section" v-if="confirmParams">
    <div class="confirm-box">
      <div class="text-box">
        <p class="text-h1" v-if="confirmParams&&confirmParams.h1">{{confirmParams.h1}}</p>
        <p class="text-h2" v-if="confirmParams&&confirmParams.h2">{{confirmParams.h2}}</P>
      </div>
      <div class="btn-box">
        <div class="btn-box-item btn-cancel" v-if="confirmParams&&confirmParams.cancelFunc" @click="confirmParams.cancelFunc">取消</div>
        <div class="btn-box-item btn-confirm" v-if="confirmParams&&confirmParams.confirmFunc" @click="confirmParams.confirmFunc">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:["confirmParams"],
  data () {
    return {

    }
  },
  computed:{
  },
  created(){
  },
  mounted(){

  },
  methods:{

  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.confirm-section{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0,0,0,.5);
}
.confirm-box{
  margin: 0 auto;
  margin-top: 40%;
  width: 560px;
  border-radius: 8px;
  background-color: rgb(255,255,255);
  overflow: hidden;
}
.text-box{
  width: 500px;
  padding: 58px 30px 36px 30px;
  text-align: center;
  line-height: 1.2;
  font-size: 36px;
}
.btn-box{
  display: flex;
  width: 560px;
  height: 100px;
}

.text-h2{
  margin-top: 36px;
  color: #f23030;
}

.btn-box-item{
  flex:1;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 36px;
}
.btn-cancel{
  border-top: 1px solid #d2d3d5;
  color: #999999;
}
.btn-confirm{
  background-color: #f23030;
  color: #ffffff;
}
</style>
