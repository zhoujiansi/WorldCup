<template>
  <div class="Schedule-body">
    <div class="top">
        <img src="../assets/top_bg.png" class="top_bg" />
    </div>
    <div class="Schedule-body-container">
      <div class="item" v-for="(item, index) in scheduleList">
        <div class="time">{{item.date}}</div>
        <div class="schedule">
          <div class="arr" v-for="arr in item.scheduleList">
            <div class="time1">{{arr.starttime | formatDate1}} </div>
            <div class="group">{{arr.grouptype}}</div>
            <div class="bridge">
              <img :src="'./static/img/country/'+arr.countryA + '.png'" class="country countryA">
              <span class="left">{{arr.countryA}}</span><span class="middle">VS</span><span class="right">{{arr.countryB}}</span>
              <img :src="'./static/img/country/'+arr.countryB + '.png'" class="country countryB">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <img class="gobuy" @click="vipClick" src="../assets/goBuy.jpg"/> -->
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
import {GetScheduleAllList,TMWorldCup} from '../utils/service'
import {formatDate} from '../utils/time'
import {setStorage , getStorage} from '../server/localStorage'
import { mapState } from 'vuex'
export default {
  name: 'Schedule',
  data () {
      return {
        scheduleList:[],
        isLoading:false,
        uid:null,
        selectIndex:5
      }
  },
  computed: mapState(['adverList']),
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
    }
  },
  mounted: function() { 
      this.GetScheduleAllList();
      // let uid = getStorage("uid");
      let uid = sessionStorage.getItem('uid');
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
      back_jc(){
        // WeixinJSBridge.call('closeWindow');
        this.$router.push({name: 'WorldCup'});
      },
      async GetScheduleAllList () { //获取赛程
        this.isLoading=true
        let result = await GetScheduleAllList()
        let data = result.data;
        this.isLoading=false;
        var obj=[];
        // console.log(data.data);
        data.data.forEach(function(item,index){
          // console.log("8888888888",item.starttime)
          var ttt=item.starttime.replace(/-/g, "/");
          // console.log("999999999",item.ttt)
          let mydate = new Date(ttt);
          // console.log(ttt,mydate)
          var date = formatDate(mydate,"MM月dd日");
          var s = obj.filter(function(it){
            return it.date==date;
          })
          if(s.length>0){
            s[0].scheduleList.push(item);
          }
          else{
            var obt = {date:date,scheduleList:[item]};
            obj.push(obt);
          }
        });
        console.log(obj)
        // this.rankList =data.data;
        this.scheduleList =obj;
        console.log(this.scheduleList);
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
.Schedule-body{
  width: 100%;
  height: 100%;
  /*background-color: #ffffff;*/
  background: url(../assets/schedule_bg.jpg) no-repeat top center;
  -webkit-background-size: cover;
  background-size: cover;
  overflow: hidden;
}
.Schedule-body-container{
  width: 100%;
  position: absolute;
  top: 2rem;
  bottom: 2rem;
  overflow: auto;
}
.Schedule-body-container .item{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items:center;
  border-radius: 2px;
  border:solid white 1px;
  padding: 0.1rem 0.1rem;
  padding-left: 0.05rem;
  padding-right: 0.3rem;
  margin: 0rem 0.2rem;
  margin-bottom: 0.2rem;
}
.Schedule-body-container .item .time{
  width: 1.2rem;
  color: #f4de24;
  font-size: 0.2rem;
}
.Schedule-body-container .item .schedule{
  width: 4.8rem;
  font-size: 0.18rem;
  color: white;
}
.Schedule-body-container .item .schedule .arr{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items:center;
  margin: 0.1rem 0rem;
}
.Schedule-body-container .item .schedule .arr .time1{
  width: 15%;
}
.Schedule-body-container .item .schedule .arr .group{
  width: 12%;
}
.Schedule-body-container .item .schedule .arr .bridge{
  width: 73%;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  border-bottom:solid white 1px;
  border-top:solid white 1px;
  /*width: 2.9rem;*/
  height: 0.36rem;
  background-color: rgb(0,128,204);
  font-size: 0.18rem;
}
.country{
  width: 0.43rem;
  vertical-align: middle;
}
.countryA{
  margin-left: -0.15rem;
}
.countryB{
  margin-right: -0.2rem;
}
.left{
  width: 45%;
  overflow: hidden;
  text-align: left;
}
.middle{
  color: yellow;
  width: 10%;
  text-align: center;
}
.right{
  width: 45%;
  overflow: hidden;
  text-align: right;
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

.loading{
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
