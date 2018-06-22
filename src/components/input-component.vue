<template>
  <section class="input-section">
    <div class="input-section-title">{{inputTitle}}</div>
    <div class="input-section-box">
      <input ref="input" :type="inputType" :value="value" @focus="inputFocus" @blur="inputBlur" v-on:input="updateValue($event.target.value)" :placeholder="placeholder"></input>
    </div>
    <div class="input-section-tips">
      <p>{{errMsg}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props:["inputpramas","value"],
  data () {
    return {
      inputTitle:this.inputpramas.inputTitle,
      inputType:this.inputpramas.inputType||"text",
      placeholder:this.inputpramas.placeholder,
      inputLen:this.inputpramas.inputLen||"20",
      canBeNull:this.inputpramas.canBeNull||false,
      formatType:this.inputpramas.formatType||3,
      errMsg:"",
    }
  },
  computed:{
  },
  created(){
  },
  mounted(){

  },
  methods:{
    inputFocus(event){
      this.errMsg="";
    },
    updateValue(value){
      if(this.formatType==1){
        var str=value
        // 删除两侧的空格符
        .trim()
        //删掉非数字
        .replace(/[^0-9]/g, '')
        // 保留 2 位小数
        .slice(
          0,this.inputLen);
      }else if(this.formatType==2){
        var str=value
        // 删除两侧的空格符
        .trim()
        //数字保留2小数
        .replace(/^\D*([1-9]\d*\.?\d{0,2})?.*$/,'$1')
        // 保留 2 位小数
        .slice(
          0,value.indexOf('.') === -1
            ? this.inputLen
            : this.inputLen + 3);
      }else{
        var str=value
        // 删除两侧的空格符
        .trim()
        // 保留 2 位小数
        .slice(
          0,this.inputLen);
      }
      this.$refs.input.value = str;
      this.$emit('input', str)
    },
    inputBlur(event){
      if(!this.canBeNull&&!event.target.value){
        this.errMsg=this.inputpramas.errMsg
      }
    },
    showErrorMsg(msg){
      this.errMsg=msg;
    }
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-section{
  margin: 0 auto;
  width: 686px;
  font-size: 28px;
  line-height: 1;
}
.input-section-title{
  font-size: 28px;
  height: 28px;
}
.input-section-box{
  margin-top: 20px;
  width: 650px;
  height: 68px;
  line-height: 68px;
  padding: 0 18px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #ffffff;
}
.input-section-box input{
  width: 650px;
  height: 68px;
  font-size: 28px;
}
.input-section-tips{
  padding: 6px 0 10px 0;
  height: 24px;
  font-size: 24px;
  color: #f23023;
}
</style>
