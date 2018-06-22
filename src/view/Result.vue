<template>
  <div class="result-container">
    <div class="top">
        <img src="../assets/top_bg.png" class="top_bg" />
    </div>
    <div class="row">
      <div class="wyRank">
        <img src="../assets/wytop.png" class="wytop" @click="showCrowRule(true)">
        <div class="cont1">
          <table class="table table1">
            <thead>
              <tr>
                <th width="25%">排行</th>
                <th width="25%">昵称</th>
                <th width="50%">猜错场次</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(item, index) in crowRankList">
                <td width="25%">{{index+1}}</td>
                <td width="25%">{{item.nickname}}</td>
                <td width="50%">{{item.WorldCupGuessFailTimes||""}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="countsRank">
        <img src="../assets/counttop.png" class="counttop" @click="showCountsRule(true)">
        <div class="cont2">
          <table class="table table2">
            <thead>
              <tr>
                <th width="20%">排行</th>
                <th width="20%">昵称</th>
                <th width="30%">累计积分</th>
                <th width="30%">猜对场次</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rankList">
                <td width="20%">{{index+1}}</td>
                <td width="20%">{{item.nickname}}</td>
                <td width="30%">{{item.counts}}</td>
                <td width="30%">{{item.WorldCupGuessWinTimes||""}}</td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>
    </div>
    <img src="../assets/back_jc.png" class="back_jc" @click="back_jc" />
    <div class="mask crowRule" v-show="showCrow">
      <img src="../assets/result_close.png" class="result_close" @click="showCrowRule(false)" />
      <img src="../assets/crow.png" class="crow"  />
      
    </div>
    <div class="mask countsRule" v-show="showCounts">
      <img src="../assets/result_close.png" class="result_close" @click="showCountsRule(false)" />
      <img src="../assets/counts.png" class="counts"  />
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
  import {GetRankList , GetCrowRankList,TMWorldCup} from '../utils/service'
  import {setStorage , getStorage} from '../server/localStorage'
  import { mapState } from 'vuex'
  export default {
    name: 'Result',
    data () {
      return {
        rankList:[],
        crowRankList:[],
        isLoading:false,
        uid:null,
        showCrow:false,
        showCounts:false,
        selectIndex:1
      }
    },
    computed: mapState(['userdata','adverList']),
    mounted: function() {  
      this.GetRankList();
      this.GetCrowRankList();
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
      showCrowRule(status){
        this.showCrow = status;
      },
      showCountsRule(status){
        // WeixinJSBridge.call('closeWindow');
        this.showCounts = status;
      },
      async GetRankList () { //获取赛程
        this.isLoading=true
        let result = await GetRankList()
        let data = result.data;
        this.isLoading=false;
        this.rankList =data.data;
        // console.log(data);
      },
      async GetCrowRankList () { //获取赛程
        this.isLoading=true
        let result = await GetCrowRankList()
        let data = result.data;
        this.isLoading=false;
        this.crowRankList =data.data;
        // console.log(data);
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.result-container{
    width: 100%;
    height: 100%;
    background: url(../assets/common_bg.jpg) no-repeat top center;
    -webkit-background-size: cover;
    background-size: cover;
    overflow: hidden;
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
.row{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    /*align-items:center;*/
    padding:0rem 0.1rem;
    margin-top: 1.83rem;
    height: 5.5rem;
}
.row .wyRank{
  width: 2.6rem;
  position: relative;
}
.row .wyRank .wytop{
  width: 100%;
  z-index: 2;
  position: absolute;
}
.row .countsRank{
  width: 3.5rem;
  position: relative;
}
.row .countsRank .counttop{
   width: 100%;
   z-index: 2;
   position: absolute;
}
.cont1{
  border:solid 1px rgb(41,122,162);
  width: 94%;
  position: absolute;

  left:2%;
  top:0.6rem;
  z-index: 1;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
}
.cont2{
  border:solid 1px rgb(41,122,162);
  width: 100%;
  
  /*border-radius: 0.3rem;*/
  position: absolute;
  top:0.4rem;
  z-index: 1;
  box-sizing: border-box;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
}
.table{
  font-size: 0.19rem;
  color: white;
  /*border:solid 1px rgb(41,122,162);*/
  box-sizing: border-box;
  border-collapse: collapse;
}
.table1{
  width: 100%;
  /*margin-left: 4%;*/
  margin-top: 0.2rem;
}
.table2{
  width: 100%;
  margin-top: 0.4rem;
}

table tbody {
  display:block;
  height:4rem;
  overflow-y:scroll;
}
table thead, tbody tr{
  display:table;
  width:100%;
  table-layout:fixed;
  font-weight: lighter;
}
tr{
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.19rem;
}
tr:nth-child(even){
  background-color: rgb(31,124,194);
}
tr:nth-child(odd){
  background-color: transparent;
}
th{
  font-weight: lighter;
  background-color: rgb(31,124,194);
  height: 0.4rem;
  line-height: 0.4rem;
}
td{
  text-align: center;
}
.back_jc{
  width: 1.53rem;
  margin-left: 2.43rem;
  z-index: 999;
}
.crow, .counts{
  width: 100%;
  position: absolute;
  left: 0px;
  top:15%;
  z-index: 99;
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
