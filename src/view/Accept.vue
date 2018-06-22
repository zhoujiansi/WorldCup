<template>
  <div class="Accept-body">
    <div class="top">
        <img src="../assets/top_bg.png" class="top_bg" />
    </div>
    <div class="contentdiv">
      <img class="accept_02" src="../assets/accept_02.png"/>
      <img class="accept_01" src="../assets/accept_01.png" @click="show(true)"/>
      <img class="accept_03" src="../assets/accept_03.png"/>
    </div>
    
    <div class="mask" v-show="showFlag">
      <img src="../assets/result_close.png" class="result_close" @click="show(false)" />
      <div class="tips">
        <img src="../assets/accept_04.png" class="accept_04"  />
        <div class="content">
          <div class="title">我的积分数:{{counts}}  已消耗积分:{{WorldCupUseCounts}} </div>
          <div class="item" v-for="(item, index) in prizeList" @click="select(item.id)">
            <img src="../assets/accept_07.png" v-show="!prizeIds.includes(item.id)"  class="sl left"/>
            <img src="../assets/accept_06.png" v-show="prizeIds.includes(item.id)" class="sl left"/>
            <span class="middle">{{item.prizeCounts}}积分</span>
            <span class="right">{{item.prizeName}}</span>
          </div>
          <img src="../assets/accept_05.png" class="accept_05"  @click="exchange()"/>
        </div>
      </div>
    </div>
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
import {GetAllPrizeList,TMWorldCup} from '../utils/service'
import {formatDate} from '../utils/time'
import {setStorage , getStorage} from '../server/localStorage'
import { mapState } from 'vuex'
export default {
  name: 'Accept',
  data () {
      return {
        prizeList:[],
        prizeIds:[],
        showFlag:false,
        isLoading:false,
        uid:null,
        dateTime:null,
        counts:null,
        WorldCupUseCounts:null,
        selectIndex:4
      }
  },
  computed: mapState(['userdata','adverList']),
  components:{
  },
  mounted: function() {  
      this.GetAllPrizeList();
      // let uid = getStorage("uid");
      let uid = sessionStorage.getItem('uid');
      this.counts = getStorage("counts");
      this.WorldCupUseCounts = getStorage("WorldCupUseCounts");
      if(uid){
        this.uid = uid;
      }
  },
  methods:{
    skip(item){
      // console.log(item);
      this.TMWorldCup();
      window.location.href=item.href;
    },
    show(index){
      if(this.uid==null){
        alert("您还没有登录，请登录后再试");
        this.$router.push({name: 'Login'});
        return false;
      }
      else{
        alert("尚未到奖品兑换时间")
        // this.showFlag = index;
      }
    },
    select(id){
      if(this.prizeIds.includes(id)){
        this.prizeIds.splice(this.prizeIds.findIndex(v => v === id),1);
        // console.log(this.prizeIds.join(","))
      } else{
        this.prizeIds.push(id);
        // console.log(this.prizeIds.join(","))
      }
    },
    exchange(){
      if(this.prizeIds.length>0){
        // if(this.dateTime<"2018-07-16 08:00:00"){
        //   alert("礼物兑换将在2018-07-16 08时开始")
        // }
        // else{
          this.$router.push({name: 'Exchange', params: {PrizeIds: this.prizeIds.join(",")}});
        // }
        
      } else {
        alert("请选择礼品后兑换");
        return false;
      }
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
    async GetAllPrizeList () { //获取赛程
        this.isLoading=true
        let result = await GetAllPrizeList()
        let data = result.data;
        this.isLoading=false;
        this.prizeList =data.data;
        this.dateTime=data.dateTime;
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
.contentdiv{
  margin-top: 1.83rem;
  position: relative;
    z-index: 2;
    height: 6rem;
    width: 100%;
    overflow: auto;
}
.Accept-body{
  width: 100%;
  height: 100%;
  /*background-color: #ffffff;*/
  background: url(../assets/Accept_bg.jpg) no-repeat top center;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
.Accept-body-container{
  width: 100%;
  margin-top: -0.2rem;
  padding-top: 0.2rem;
  position: absolute;
  top: 2rem;
  bottom: 1rem;
  overflow: auto;
}
.accept_02{
  width: 100%;
  /*margin-top: 1.83rem;*/
  /*z-index: 99;*/
}
.accept_01{
  position: absolute;
  width: 1.54rem;
  margin-left: 2.43rem;
  /*top: 6.85rem;*/
  bottom: 0.5rem;
  /*z-index: 99;*/
}
.accept_03{
  position: absolute;
  width: 5.16rem;
  margin-left:0.67rem; 
  /*top: 7.39rem;*/
  bottom: -1.83rem;
  /*z-index: 99;*/
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
.tips{
  position: relative;
  width: 100%;
  top:15%;
  text-align: center;
}
.tips .accept_04{
  width: 4.11rem;
  z-index: 5;
  position: relative;
}
.tips .content{
  width: 4rem;
  height: 4.5rem;
  margin-top: -0.5rem;
  margin-left: 1.2rem;
  background-color: white;
  border-radius: 0.1rem;
  padding-top: 0.5rem;
  position: relative;
  z-index: 1;
}
.tips .content .title{
  color: #0081cc;
  font-size: 0.18rem;
  text-align: center;
  margin-bottom: 0.2rem;
}
.tips .content .accept_05{
  width: 2.15rem;
  position: absolute;
  bottom: 0.1rem;
  left: 0.925rem;
}
.tips .content .item{
  padding:0rem 0.1rem; 
  display: flex;
  flex-direction: row;
  /*justify-content:space-between;*/
  align-items:flex-start;
}
.tips .content .item .left{
  /*width: 10%;*/
}
.tips .content .item .middle{
  width: 40%;
  text-align: left;
}
.tips .content .item .right{
  width: 50%;
  text-align: left;
}
.sl{
  width: 0.3rem;
}
.result_close{
  width: 0.4rem;
  position: absolute;
  right: 1.05rem;
  top: 20%;
  z-index: 999;
}
.mask{
  position: fixed;
  width: 6.4rem;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 99;
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
  z-index: 9;
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
  z-index: 9;
}
.slide img{
  width: 100%;
  height: 1.04rem;
}
</style>
