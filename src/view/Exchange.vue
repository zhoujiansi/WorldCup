<template>
  <div class="body">
    <div class="top">
        <img src="../assets/top_bg.png" class="top_bg" />
    </div>
    <div class="ex_01">
      <div class="box-input">
          <div class="box-icon">
            姓名：
          </div>
          <div class="input-container">
            <input type="text" v-model="name" placeholder="请输入姓名"/>
          </div>
      </div>
      <div class="box-input">
          <div class="box-icon">
            手机号码：
          </div>
          <div class="input-container">
            <input type="tel" v-model="phone"  placeholder="请输入手机号码"/>
          </div>
      </div>
      <div class="box-input">
          <div class="box-icon">
            公司名称：
          </div>
          <div class="input-container">
            <input type="text" v-model="company"  placeholder="请输入公司名称"/>
          </div>
      </div>
      <div class="box-input">
          <div class="box-icon">
            收件地址：
          </div>
          <div class="input-container">
            <input type="text" v-model="zip" placeholder="请输入收件地址"/>
          </div>
      </div>
      <div class="change">
        <div class="word">您是否从事水质检测相关工作？</div>
        <div class="select">
          <div class="t1" @click="show(true)">
            <img src="../assets/no.png" class="icon" v-show="!IsShow" /><img src="../assets/yes.png" class="icon" v-show="IsShow" /><span>是</span></div>
          <div class="t2" @click="show(false)">
            <img src="../assets/no.png" class="icon" v-show="IsShow" /><img src="../assets/yes.png" class="icon" v-show="!IsShow" /><span>否</span></div>
        </div>
      </div>
      <div class="btndiv">
        <img src="../assets/ex_02.png" class="ex_02" @click="goback"/>
        <img src="../assets/ex_03.png" class="ex_03" @click="submit"/>
      </div>
    </div>
    <div class="mask" v-show="showResult">
      <img src="../assets/result_close.png" class="result_close" @click="showResultRule(false)" />
      <div class="tips">
        <img src="../assets/ex_04.png" class="ex_04"  />
        <div class="content">
          恭喜您，您已成功兑换{{result}} 礼品将在1个月内寄出，因礼品寄送量较大如部分礼品缺货我们将以同等价值其他礼品进行补寄，还请理解。
          后期将有哈希客服与您电话核实相关礼品信息，请您注意接听来自西安的客服电话。
        </div>
      </div>
    </div>
    <div class="loading" v-if="isLoading"><img src="../assets/loading.gif"/></div>
    <swipe class="my-swipe" :speed="1000" :auto="4000" :show-indicators="false" >
      <swipe-item class="slide" v-for="adver in adverList" :key="adver.id">
        <img :src="adver.imageUrl" @click="skip(adver)">
      </swipe-item>
    </swipe>
    <div class="mybottom">
      <div class="item" @click="bottomselect(1)">
        <img src="../assets/bottom1_1.jpg" class="bg" v-show="selectIndex!=1">
        <img src="../assets/bottom2_1.jpg" class="bg" v-show="selectIndex==1">
      </div>
      <div class="item" @click="bottomselect(2)">
        <img src="../assets/bottom1_2.jpg"  class="bg" v-show="selectIndex!=2">
        <img src="../assets/bottom2_2.jpg"  class="bg" v-show="selectIndex==2">
      </div>
      <div class="item" @click="bottomselect(3)">
        <img src="../assets/bottom1_3.jpg"  class="bg" v-show="selectIndex!=3">
        <img src="../assets/bottom2_3.jpg"  class="bg" v-show="selectIndex==3">
      </div>
      <div class="item" @click="bottomselect(4)">
        <img src="../assets/bottom1_4.jpg"  class="bg" v-show="selectIndex!=4">
        <img src="../assets/bottom2_4.jpg"  class="bg" v-show="selectIndex==4">
      </div>
      <div class="item" @click="bottomselect(5)">
        <img src="../assets/bottom1_5.jpg"  class="bg" v-show="selectIndex!=5">
        <img src="../assets/bottom2_5.jpg"  class="bg" v-show="selectIndex==5">
      </div>
    </div>
  </div>
</template>

<script>
import {GetAllPrizeList,AcceptPrize,TMWorldCup} from '../utils/service'
import {formatDate} from '../utils/time'
import {setStorage , getStorage} from '../server/localStorage'
import { mapState } from 'vuex'
export default {
  name: 'Exchange',
  data () {
      return {
        prizeList:[],
        PrizeIds:"",
        IsShow:false, // 是从事该职业,默认不是
        isLoading:false,
        showResult:false,
        uid:null,
        name:null,
        company:null,
        zip:null,
        phone:null,
        data8:'否',
        result:"",
        selectIndex:4
      }
  },
  computed: mapState(['userdata','adverList']),
  components:{
  },
  mounted: function() {  
      // this.GetAllPrizeList();
      if(this.$route.params.PrizeIds){
        this.PrizeIds=this.$route.params.PrizeIds;
        console.log("***PrizeIds***",this.PrizeIds);
      }
      // let uid = getStorage("uid");
      let uid = sessionStorage.getItem('uid');
      if(uid){
        this.uid = uid;
      }
  },
  methods:{
    skip(item){
      this.TMWorldCup();
      // console.log(item);
      window.location.href=item.href;
    },
    async TMWorldCup () { //获取赛程
        this.isLoading=true
        const parm = {
          pdataid: this.uid,
        }
        let result = await TMWorldCup(parm)
        let data = result.data;
        setStorage('counts',data.data.counts);// 用户数据
        this.isLoading=false;
    },
    showResultRule(status){
      this.showResult=false;
      this.$router.push({name: 'Accept'});
    },
    show(index){
      this.IsShow = index;
      if(this.IsShow){
        this.data8='是';
      }
      else{
        this.data8='否';
      }
    },
    goback(id){
      this.$router.push({name: 'Accept'});
    },
    async submit () { //提交
      if(this.PrizeIds==null || this.uid==null|| this.name==null
        || this.phone==null|| this.company==null|| this.zip==null|| this.data8==null){
        alert("请填好数据后提交");
        return false;
      }
      let checkUserPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      if (!checkUserPhone.test(this.phone)) {
        // console.log('手机号验证通过');
        alert("请输入正确的手机号");
        return false;
      }
        const params={
          "PrizeIds":this.PrizeIds, //
          "pdataid":this.uid, //登录人id
          "name":this.name, //
          "phone":this.phone, //
          "company":this.company, //
          "zip":this.zip, //
          "data8":this.data8, //
        }
        console.log(params)
        this.isLoading=true
        let result = await AcceptPrize(params)
        let data = result.data;
        this.isLoading=false;
        // this.prizeList =data.data;
        if(data.success==false){
          alert(data.message);
        }
        else{
          this.result=data.result;
          this.showResult=true; // 显示提示
          setStorage('counts',data.data.counts);// 用户数据
          setStorage('WorldCupUseCounts',data.data.WorldCupUseCounts);// 用户数据
        }
    },
    bottomselect(index){
        this.selectIndex = index;
        if(index==1){
          this.$router.push({name: 'WorldCup'});
        }
        else if(index==2){
          this.$router.push({name: 'Rule'});
        }
        else if(index==3){
          this.$router.push({name: 'Counts'});
        }
        else if(index==4){
          this.$router.push({name: 'Accept'});
        }
        else if(index==5){
          this.$router.push({name: 'Schedule'});
        }
      }
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
  width: 100%;
  height: 100%;
  /*background-color: #ffffff;*/
  background: url(../assets/page1_bg.jpg) no-repeat top center;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
}

.ex_01{
  padding-top:1.2rem;
  width: 100%;
  height: 7.57rem;
  margin-top: 1.68rem;
  background: url(../assets/ex_01.png) no-repeat top center;
  -webkit-background-size: cover;
  background-size: cover;
  box-sizing: border-box;
}
.box-input{
  display: flex;
  margin: 0 auto;
  margin-bottom:0.20rem;
  width: 4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-left: 1.2rem;
  border-radius: 0.05rem;
  background-color: rgba(255,255,255,0.6);
  box-sizing: border-box;
}
.box-input .box-icon{
  width: 35%;
  padding-left: 0.1rem;
}
.box-input .input-container{
  width: 65%;
  overflow: hidden;
}
.change{
  background-color: rgba(255,255,255,0.6);
  padding:0.1rem;
  width: 4rem;
  /*height: 0.6rem;*/
  /*line-height: 0.6rem;*/
  margin-left: 1.2rem;
  box-sizing: border-box;
}
.change .select{
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: row;
  /*justify-content:space-around;*/
  align-items:center;
}
.change .select .t1{
  margin-right: 1rem;
}
.change .icon{
  width: 0.21rem;
  margin-right: 0.1rem;
}
.btndiv{
  width: 100%;
  text-align: center;
  margin-top: 0.2rem;
}
.btndiv .ex_02{
  width: 1.7rem;
  margin-right: 0.3rem;
}
.btndiv .ex_03{
  width: 1.71rem;
}
.tips{
  position: relative;
  width: 100%;
  top:15%;
  text-align: center;
}
.tips .ex_04{
  width: 4.72rem;
  z-index: 5;
  position: relative;
}
.tips .content{
  width: 4rem;
  height: 3.6rem;
  margin-top: -0.8rem;
  margin-left: 1.2rem;
  background-color: white;
  border-radius: 0.1rem;
  padding-top: 0.5rem;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding:0rem 0.2rem; 
  padding-top:0.8rem;
  text-align: left;
}

.top{
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
}
.top .top_bg{
  width: 100%;

}
.result_close{
  width: 0.4rem;
  position: absolute;
  right: 1.05rem;
  top: 20%;
  z-index: 999;
}
.loading,.mask{
  position: fixed;
  width: 6.4rem;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 99;
}
.loading img{
  margin-top: 45%;
  margin-left: 2.56rem;
  width: 1.28rem;
  height: 1.28rem;
}
.mybottom{
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  bottom: 0px;
  width: 100%;
  font-size: 0px;
}
.mybottom .item .bg{
  width: 1.28rem;
}
.my-swipe {
  position: fixed;
  bottom: 0.91rem;
  height: 1.04rem;
  width: 6.4rem;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.slide img{
  width: 100%;
  height: 1.04rem;
}
</style>
