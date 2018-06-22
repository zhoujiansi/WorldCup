<template>
  <div class="body">
    <div class="top">
        <img src="../assets/top_bg.png" class="top_bg" />
    </div>
    <div class="tops">
      <div class="countsTips">
        <div class="t1">
          <div class="d1"><span class="s1">总积分:</span><span class="s2">{{myInfo.data.counts}}</span></div>
          <div class="d2"><span class="s3" @click="showResultRule(true)">查看积分历史</span></div>
        </div>
        <div class="t1">
          <div class="d1"><span class="s1">积分榜:</span><span class="s2">{{myInfo.position + 1}}</span></div>
          <div class="d2"><span class="s1">乌鸦帝榜:</span><span class="s2">{{myInfo.crowposition + 1}}</span></div>
        </div>
      </div>
      <div class="right">
        <div class="line">
          <img src="../assets/c_01.png" class="c_01" />
          <div class="bjd">
            <div class="jd" :style="{width:mywidth}"></div><span class="word">{{myInfo.data.WorldCupGuessTimes || "0"}}/{{myInfo.SumCounts}}</span>
          </div>
        </div>
        <div class="jc">竞猜场次:{{myInfo.data.WorldCupGuessTimes || "0"}}  猜对场次:{{myInfo.data.WorldCupGuessWinTimes || "0"}}</div>
        <!-- <div class="jc"></div> -->
        <div class="jc">未开赛场次:{{myInfo.UnCounts}}</div>
      </div>
    </div>
    <div class="content">
      <div class="title">我的竞猜历史</div>
      <div class="container">
        <div class="item" v-for="guess in myInfo.guessList">
          <div class="time">比赛时间：{{guess.starttime | formatDate}} {{guess.starttime | formatDate2}} {{guess.starttime | formatDate1}}</div>
          <div class="main">
            <div class="countryA">
              <!-- <img src="../assets/country.png" class="country" /> -->
              <img :src="'./static/img/country/'+guess.countryA + '.png'" class="country">
              <p class="countryName">{{guess.countryA}}</p>
            </div>
            <div class="countA common">{{guess.countryACounts?guess.countryACounts:'?'}}</div>
            <div class="common">:</div>
            <div class="countB common">{{guess.countryBCounts?guess.countryBCounts:'?'}}</div>
            <div class="countryA">
              <!-- <img src="../assets/country.png" class="country" /> -->
              <img :src="'./static/img/country/'+guess.countryB + '.png'" class="country">
              <p class="countryName">{{guess.countryB}}</p>
            </div>
          </div>
          <div class="result">
            <!-- <div>竞猜：{{guess.type=='竞猜中'?'竞猜中':(guess.data2=='胜'?'['+guess.guess+']获胜':'['+(guess.guess==guess.countryA?guess.countryB:guess.countryA)+']获胜')}}</div> -->
            <div>竞猜：{{'['+guess.guess+'获胜]'}}</div>
            <div>{{guess.type=='竞猜中'?'竞猜中':(guess.data2=='胜'?'获得['+guess.data1+']积分':'扣除['+guess.counts+']积分')}} </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showResult">
      <img src="../assets/result_close.png" class="result_close" @click="showResultRule(false)" />
      <div class="tips">
        <img src="../assets/c_02.png" class="c_02"  />
        <div class="content">
          <div class="item"  :class="item.actionText=='竞猜失败'?'lose':''" v-for="item in actionList">
            {{item.creattime | formatDate}}
            {{item.creattime | formatDate1}}
            {{item.actionText}}
            {{item.text+item.counts}}
          </div>
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
      <div class="item" @click="select(1)">
        <img src="../assets/bottom1_1.jpg" class="bg" v-show="selectIndex!=1">
        <img src="../assets/bottom2_1.jpg" class="bg" v-show="selectIndex==1">
      </div>
      <div class="item" @click="select(2)">
        <img src="../assets/bottom1_2.jpg"  class="bg" v-show="selectIndex!=2">
        <img src="../assets/bottom2_2.jpg"  class="bg" v-show="selectIndex==2">
      </div>
      <div class="item" @click="select(3)">
        <img src="../assets/bottom1_3.jpg"  class="bg" v-show="selectIndex!=3">
        <img src="../assets/bottom2_3.jpg"  class="bg" v-show="selectIndex==3">
      </div>
      <div class="item" @click="select(4)">
        <img src="../assets/bottom1_4.jpg"  class="bg" v-show="selectIndex!=4">
        <img src="../assets/bottom2_4.jpg"  class="bg" v-show="selectIndex==4">
      </div>
      <div class="item" @click="select(5)">
        <img src="../assets/bottom1_5.jpg"  class="bg" v-show="selectIndex!=5">
        <img src="../assets/bottom2_5.jpg"  class="bg" v-show="selectIndex==5">
      </div>
    </div>
  </div>
</template>

<script>
import {GetActionList,GetMyInfo,TMWorldCup} from '../utils/service'
import {formatDate} from '../utils/time'
import {setStorage , getStorage} from '../server/localStorage'
import { mapState } from 'vuex'
export default {
  name: 'Counts',
  data () {
      return {
        myInfo:{data:{counts:""}},
        actionList:[],
        mywidth:"0rem",
        IsShow:false, // 是从事该职业,默认不是 
        isLoading:false,
        showResult:false,
        uid:null,
        selectIndex:3
      }
  },
  computed: mapState(['userdata','adverList']),
  components:{
  },
  filters:{
    formatDate(time){
      let date = new Date(time.replace(/-/g, "/"));
      return  formatDate(date,"MM月dd日");
    },
    formatDate1(time){
      let date = new Date(time.replace(/-/g, "/"));
      return  formatDate(date,"hh:mm");
    },
    formatDate2(time){
      let date = new Date(time.replace(/-/g, "/"));
      var myddy=date.getDay();//获取存储当前日期
      var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      return   weekday[myddy];
    }
  },
  mounted: function() {  
      // this.GetAllPrizeList();
      
      // let uid = getStorage("uid");
      let uid = sessionStorage.getItem('uid');
      if(uid){
        this.uid = uid;
        this.GetActionList(this.uid)
        this.GetMyInfo(this.uid)
      } else {
        alert("您还没有登录，请登录后再试");
        this.$router.push({name: 'Login'});
        return false;
      }
  },
  methods:{
    skip(item){
      // console.log(item);
      this.TMWorldCup();
      window.location.href=item.href;
    },
    showResultRule(status){
      this.showResult=status;
    },
    show(index){
      this.IsShow = index;
    },
    goback(id){
      this.$router.push({name: 'Result'});
    },
    async GetActionList (uid) { //获取赛程
        const parm = {
          pdataid: uid
        }
        this.isLoading=true
        let result = await GetActionList(parm)
        let data = result.data;
        this.isLoading=false;
        data.data.forEach(function(item,index){
          item.text="获得积分";
          if(item.action=="login"){
            item.actionText="系统登录";
          }
          else if(item.action=="register"){
            item.actionText="系统注册";
          }
          else if(item.action=="TM"){
            item.actionText="进入天猫";
          }
          else if(item.action=="share"){
            item.actionText="分享活动";
          }
          else if(item.action=="friend"){
            item.actionText="成功邀请";
          }
          else if(item.action=="guess"){
            if(item.counts.indexOf('-')>-1){
              item.actionText="竞猜失败";
              item.text="扣除积分";
            }
            else{
              item.actionText="竞猜成功";
            }
          }
        });
        this.actionList =data.data;
        console.log(this.actionList)
    },
    async GetMyInfo (uid) { //获取赛程
        const parm = {
          id: uid
        }
        this.isLoading=true
        let result = await GetMyInfo(parm)
        let data = result.data;
        this.isLoading=false;
        this.myInfo =data;
        this.mywidth=data.data.WorldCupGuessTimes?(data.data.WorldCupGuessTimes/data.SumCounts)+"rem":"0rem";
        // console.log("this.myInfo",this.myInfo,this.mywidth)
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
    select(index){
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
  background: url(../assets/common_bg.jpg) no-repeat top center;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
.tops{
  margin-top: 1.83rem;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:flex-end;
  padding: 0rem 0.1rem;
}
.countsTips{
  width: 3rem;
  border-radius: 0.1rem;
  background-color: rgb(21,48,67);
  padding: 0.1rem 0.05rem;
  font-size: 0.15rem;
  line-height: 0.35rem;
}
.countsTips .t1{
  display: flex;
  flex-direction: row;
  /*justify-content:space-between;*/
  align-items:center;
}
.countsTips .d1{
  width: 50%;
}
.countsTips .d2{
  width: 50%;
}
.countsTips .s1{
  color: #0081cc;
}
.countsTips .s2{
  color: white;
}
.countsTips .s3{
  color: #f1bf28;
  text-decoration:underline;
}

.right{
  width: 3rem;
  color: white;
  font-size: 0.15rem;
  line-height: 0.35rem;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
.right .line {
  display: flex;
  flex-direction: row;
  /*justify-content:space-between;*/
  align-items:center;
  /*margin-bottom: 0.1rem;*/
}
.right .line .c_01{
  width: 0.3rem;
  z-index: 2;
}
.right .line .bjd{
  width: 1.5rem;
  height: 0.2rem;
  border-radius: 0.2rem;
  background-color: black;
  margin-left: -0.2rem;
  z-index: 1;
  text-align: center;
}
.right .line .bjd .word{
  position: absolute;
  font-size: 0.15rem;
  height: 0.2rem;
  line-height: 0.2rem;
  z-index: 6;
  transform: translateX(-50%);
}
.right .line .bjd .jd{
  position: absolute;
  background-color: rgb(4,176,231);
  width: 0rem;
  height: 0.2rem;
  border-radius: 0.2rem;
  color: white;
  font-size: 0.15rem;
  z-index: 1;
}
.content{
  position: relative;
  width: 100%;
  height: 5rem;
  /*top:0rem;
  bottom: 2rem;*/
  /*overflow: auto;*/
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
}
.content .title{
  color: white;
  font-size: 0.21rem;
  text-align: center;
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
}
.content .container{
  padding: 0rem 0.8rem;
  box-sizing: border-box;
}
.content .container .item{
  border-radius: 0.1rem;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.1rem;
  width: 100%;
  box-sizing: border-box;
}
.content .container .item .time{
  color: black;
  font-size: 0.17rem;
}
.content .container .item .main{
  color: white;
  display: flex;
  flex-direction: row;
  /*justify-content:space-between;*/
  align-items:center;
  background-color: black;
  margin-top: 0.05rem;
  margin-bottom: 0.05rem;
}
.content .container .item .main .countryA{
  width: 27.5%;
  text-align: center;
  height: 1rem;
}
.content .container .item .main .countA{
  background-color: red;
}
.content .container .item .main .countB{
  background-color: #f1bf28;
}
.common{
  width: 15%;
  line-height: 1rem;
  text-align: center;
  font-size: 0.43rem;
}
.countryName{
  color: white;
  font-size: 0.16rem;
  text-align: center;
}
.country{
  width: 0.62rem;
}
.content .container .item .result{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  font-size: 0.17rem;
  color: black;
}
.tips{
  position: relative;
  width: 100%;
  top:15%;
  text-align: center;
}
.tips .c_02{
  width: 4.8rem;
  z-index: 5;
  position: relative;
}
.tips .content{
  width: 4.6rem;
  height: 3.6rem;
  margin-top: -0.5rem;
  margin-left: 0.9rem;
  background-color: white;
  border-radius: 0.1rem;
  padding-top: 0.5rem;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding:0rem 0.1rem; 
  padding-top:0.8rem;
  text-align: left;
  overflow: auto;
}
.tips .item{
  font-size: 0.18rem;
  color: #0081cc;
}
.tips .lose{
  color: #1a242f;
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
