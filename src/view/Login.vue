<template>
  <div class="login-body">
    <div class="login-body-container">
      <img src="../assets/logo.png" class="logo">
      <img src="../assets/go_back.png" class="back" @click="goback">
      <div class="goindex"  @click="goindex">返回</div>
      <div class="box-container" v-show="model=='登录'">
        <div class="box-title other">{{model}}</div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/phone_icon.png" class="phone_icon" />
          </div>
          <div class="input-container">
            <input type="text" v-model="info" maxlength=30 placeholder="请输入手机号码/邮箱/昵称"/>
          </div>
        </div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/key_icon.png" class="email_icon" />
          </div>
          <div class="input-container">
            <input type="password" v-model="pwd" maxlength=20 placeholder="请输入您的密码"/>
          </div>
        </div>
        <div class="text" @click="loginCheck">
          <img v-show="check1" src="../assets/select.png" class="rememberPwd" /><img v-show="!check1" src="../assets/unselect.png" class="rememberPwd" />记住密码</div>
        <div class="box-btn" @click="login">完 成</div>
        <div class="func">
          <div class="forgetPwd" @click="changeModel('找回密码')">忘记密码?</div>
          <div class="register" @click="changeModel('会员注册')">我要注册</div>
        </div>
      </div>
      <div class="box-container" v-show="model=='会员注册'">
        <div class="box-title">会员注册</div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/phone_icon.png" class="phone_icon" />
          </div>
          <div class="input-container">
            <input type="tel" v-model="phone"  placeholder="请输入手机号"/>
          </div>
        </div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/email_icon.png" class="email_icon" />
          </div>
          <div class="input-container">
            <input type="text" v-model="nickname" placeholder="您的昵称"/>
          </div>
        </div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/email_icon.png" class="email_icon" />
          </div>
          <div class="input-container">
            <input type="text" v-model="Email" placeholder="您的邮箱"/>
          </div>
        </div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/key_icon.png" class="email_icon" />
          </div>
          <div class="input-container">
            <input type="password" v-model="pwd"  placeholder="请输入您的密码"/>
          </div>
        </div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/key_icon.png" class="email_icon" />
          </div>
          <div class="input-container">
            <input type="password" v-model="confirmPwd" placeholder="确认密码"/>
          </div>
        </div>
        <div class="box-btn" @click="register">完 成</div>
        <div class="text"><img @click="regCheck" v-show="check2" src="../assets/select.png" class="select" /><img @click="regCheck" v-show="!check2" src="../assets/unselect.png" class="select" />我已认真阅读并同意<span class="protocol" @click="show">用户协议</span></div>
      </div>
      <div class="box-container" v-show="model=='找回密码'">
        <div class="box-title other">{{model}}</div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/phone_icon.png" class="phone_icon" />
          </div>
          <div class="input-container">
            <input type="tel" v-model="phone"  placeholder="请输入手机号"/>
          </div>
        </div>
        <div class="box-input">
          <div class="box-icon">
            <img src="../assets/aq_icon.png" class="aq_icon" />
          </div>
          <div class="input-container">
            <input type="text" v-model="Email" placeholder="您的邮箱"/>
          </div>
        </div>
        <div class="box-btn" @click="updatePwd">提 交</div>
      </div>
    </div>
    <div class="pt_content" v-show="showPt">
      <img src="../assets/close.png" class="close" @click="close">
      <p class="title"> 《哈希用户注册协议》 </p>
        1. 释义 </br>
        本服务条款系由用户与哈希公司就哈希公司所属的所有互联网服务平台所订立的相关权利义务规范。因此，请于注册成为哈希公司互联网服务平台用户前，确实详细阅读本服务条款的所有内容，当您点选同意键或执行哈希公司公司互联网服务平台即视为同意并接受本服务条款的所有规范并愿受其约束。
        用户指愿意通过哈希公司公司提供的免费/付费途径获得许可（账号和密码）执行互联网服务平台的公司/团体/个人。</br>
        2. 著作权声明</br>
        哈希公司互联网服务平台所有相关著作权、专利权、商标、营业秘密及其它任何所有权或权利，均属哈希公司或其原始授权人所有。非经哈希公司或原始授权人的同意，任何人或用户均不得擅自下载、重制、传输、改作、编辑于任何为互联网服务平台目的以外的使用或任何以获利为目的的使用，否则应负所有法律责任。</br>
        3. 用户的基本义务</br>
        3.1 用户需自行配备接入、执行互联网服务平台所需的各项计算机及网络设备，并自行负担上网所需的各项费用。</br>
        3.2 哈希公司向用户提供的平台服务本身属于商业行为，用户有义务根据使用该服务的时间而支付相应的费用。</br>
        3.3 用户同意于注册时提供完整、详尽、真实的个人资料，若所提供的资料于日后有变更者，应随时于相关页面进行更新。若用户所提供的资料与事实不符或所提供的资料业已变更而未更新或有任何误导之嫌导致哈希公司无法为用户提供或进一步提供服务，哈希公司不因此承担任何责任。</br>
        3.4 用户有义务妥善保管使用在注册哈希公司互联网服务平台会员时获得的帐号及密码，并为此帐号及密码登入系统后所开始的所有行为或活动负责。</br>
        3.5 为维护自身权益，用户不应将帐号及密码泄漏或提供第三人知悉或出借或转让与他人使用，如在用户自身过失导致帐号或密码泄漏而给用户自身造成损失，用户应自行承担责任。</br>
        3.6 若用户发现帐号或密码遭他人非法使用或有异常使用的情形，因立即通知哈希公司，并提交该帐号为本人所有的有关证明，以便申请该帐号的暂停使用，因此而造成的损失，哈希公司不承担赔偿责任。但在用户根据法律规定申请立案的情况下，哈希公司有义务协助查询。</br>
        3.7 用户在接受本服务条款的同时亦表示其同时接受本协议条款的其他附属条款，哈希公司有权在而不另对用户进行个别通知的情况下添加本协议的其他附属条款。</br>

        4. 个人资料的保护及其限制</br>
        4.1 对于用户所登录留存的个人资料，除下列情形外，哈希公司同意在未得到用户同意前，不公开对外披露：</br>
        4.1.1 基于法律规定</br>
        4.1.2 基于司法机关或其它有权机关基于法定程序的要求</br>
        4.1.3 为保障哈希公司的财产及权益</br>
        4.1.4 在紧急情况下为保护其它用户或第三人的人身安全的情形下 </br>
        4.2 对于用户所登录的个人资料，用户同意哈希公司及其关系企业或合作对象，可以在合理范围内搜集、处理、保存、传递及使用该资料，以提供用户其它信息及服务或做成会计资料，或进行网络行为的调查或研究，或其它任何合法使用。</br>
        5 用户使用互联网服务平台的限制</br>
        5.1 哈希公司严禁用户利用互联网服务平台的机会做与服务无关的行为，包括但不限于妨害他人名誉或隐私权；或使用自己、匿名或冒用他人或哈希公司名义散播诽谤、不实、威胁、不雅、猥亵、不法、攻击性或侵害他人权利的消息或文字，传播色情或其它违反社会公德的言论；传输或散布计算机病毒；从事广告或贩卖商品；从事不法交易或张贴虚假不实或引人犯罪的信息；或任何违反中华人民共和国法律或其它法令的行为，亦不得利用互联网服务平台的机会，与其它用户或他人进行非法的交涉或对话。</br>
        5.2 用户对哈希公司服务管理人员所进行的询问应据实澄清，否则哈希公司有权随时终止用户使用互联网服务平台；哈希公司发现不法或可疑的行为者，哈希公司有权随时通报司法或相关机关处理，并有权同时向该机关呈报用户的基本资料及行为供该等机关为调查。用户就因此所致生的不便或困扰，不得向哈希公司请求任何损害或补偿。</br>
        5.3 用户应就其在互联网服务平台的行为或活动自负责任，哈希公司仅提供互联网服务平台予用户自行执行或与其它用户依照服务设定的方式进行竞赛或服务，哈希公司就用户在互联网服务平台的行为或活动或交易不负任何责任。</br>
        5.4 哈希公司互联网服务平台不支持使用任何外挂程序，由此引起的一切问题及后果，由用户自行承担，哈希公司不承担任何责任，并保留对外挂制作者诉诸法律的权利。</br>
        5.5 哈希公司有权对用户通过互联网服务平台对外发布的内容（包括但不限于文字、图形、图片、照片等）进行商业利用；若用户在未进行明示的前提下，发布不具有相应权利的内容，哈希公司对因此而引发的第三方纠纷不负任何责任。</br>
        6 服务的停止和更改</br>
        6.1 发生下列情形之一时，哈希公司有权停止或中断互联网服务平台：</br>
        6.1.1 对于哈希公司的网络设备进行必要的保养及施工</br>
        6.1.2 发生突发性的网络设备故障时</br>
        6.1.3 由于哈希公司所用的网络通信设备由于不明原因停止，无法提供服务时</br>
        6.1.4 由于不可抗力因素致使哈希公司无法提供互联网服务平台服务</br>
        6.1.5 由于相关政府机构的要求</br>
        6.2 无论任何情形，哈希公司就停止或更改或终止用户帐户所可能产生的不便或损害，哈希公司对用户本人或任何第三人均不负任何损害赔偿责任。</br>
        6.3 用户应了解并同意，哈希公司所属互联网服务平台可能因公司本身、其它合作厂商或相关电信业者网络系统软硬件设备的故障、失灵、或人为操作的疏失而全部或一部分中断、暂时无法使用、迟延或因他人侵入哈希公司系统篡改或伪造变造资料等，造成互联网服务平台的停止或中断者或用户档案缺失，用户不得要求哈希公司提供任何的补偿或赔偿。</br>
        7 风险承担</br>
        用户同意使用哈希公司互联网服务平台是出于用户个人意愿，并愿自负任何风险，包括但不限于其因执行哈希公司互联网服务平台或自行由哈希公司所属网站下载服务或资料图片而导致用户或其所使用的计算机软、硬件的损害，或发生任何资料的流失等。</br>
        8 责任的免除</br>
        8.1 哈希公司就其互联网服务平台，不负任何明示或默示的担保责任，亦不保证其互联网服务平台的稳定、安全、无误及不中断。用户应自行承担使用执行互联网服务平台所有的风险及因此可能致生的损害，包括而不限于其因执行互联网服务平台或自行由哈希公司所属网站下载服务或资料图片而导致用户或其所使用的计算机系统损害，或发生任何资料的流失等。</br>
        8.2 哈希公司对其互联网服务平台不保证不出现任何服务bug,并对由此可能产生的问题不承担任何赔偿责任。</br>

        9 赔偿责任的排除及限制</br>
        哈希公司对于用户使用其互联网服务平台或无法使用互联网服务平台所导致的任何直接、间接、衍生的损害或所失利益不负任何损害赔偿责任。若依法无法完全排除损害赔偿责任时，哈希公司的赔偿责任亦以用户就使用互联网服务平台所支付哈希公司的价款为限。</br>

        10 链接</br>
        哈希公司在其所属网站的所有网页上所提供的所有链接，可能链接到其它个人、公司或组织的网站，提供该等网站的目的，是便利用户自行搜寻或取得信息，哈希公司对于被链接的个人、公司或组织的网站所提供的产品、服务或信息，不担保其真实性、完整性、实时性或可信度、这些个人、公司或组织与哈希公司间亦不存在任何雇用、委任、代理、合伙或其它类似的关系。</br>
        11 哈希公司的终止权</br>
        用户应确实遵守本服务条款及有关法律命令的规定。哈希公司对于用户是否违反服务条款有最终决定权。若哈希公司认定用户违反服务条款或任何法令者，用户同意哈希公司可以随时终止用户的帐号及密码使用权。</br>
        12 损害赔偿</br>
        用户若违反服务条款或相关法令，导致哈希公司、或其关系企业、受雇人、受托人、代理人或/及其它相关履行辅助人因此而受到损害或支出费用（包括但不限于因进行民刑事行政程序所支出的律师费用），用户应负担损害赔偿责任。</br>
        13 停止或变更服务</br>
        13.1 哈希公司取消或停止用户的资格或加以限制，用户不得要求补偿或赔偿。</br>
        13.2 哈希公司保留将来新增、修改或删除互联网服务平台的全部或部分的权利，且不另行个别通知，用户不得因此要求任何补偿或赔偿。</br>
        14 广告信息或促销计划</br>
        哈希公司的互联网服务平台软件上可能刊登商业广告、或其它活动促销的广告。这些内容系广告商或商品服务提供者所为，哈希公司仅是刊登内容的媒介。用户通过其他网站所购买的服务或商品，其交易行为仅存于用户与该商品或服务的提供者之间，与哈希公司无关。</br>
        15 服务条款的修改</br>
        由于用户及市场状况的不断变化，哈希公司保留随时修改本服务条款的权利，修改本服务条款时，哈希公司将于哈希公司所属网站首页公告修改的事实，而不另对用户进行个别通知。若用户不同意修改的内容，可停止使用哈希公司的互联网服务平台。若用户继续使用哈希公司的互联网服务平台，即视为用户业已接受哈希公司所修订的内容。</br>

        16 个别条款的效力</br>
        本服务条款所定的任何条款的一部或全部无效者，不影响其它条款的效力。</br>

        17 适用法律</br>
        本服务条款的解释，效力及纠纷的解决，适用于中华人民共和国法律。</br>
    </div>
    <swipe class="my-swipe" :speed="1000" :auto="4000" :show-indicators="false" >
      <swipe-item class="slide" v-for="adver in adverList" :key="adver.id">
        <img :src="adver.imageUrl" @click="skip(adver)">
      </swipe-item>
    </swipe>
    <div class="loading" v-if="isLoading"><img src="../assets/loading.gif"/></div>
  </div>
</template>

<script>

import inputComponent from '../components/input-component'
import confirmComponent from '../components/confirm-component'
import {Login, Register, updatePwd, setUserTokenCookie,TMWorldCup} from '../utils/service'
import {setStorage , getStorage} from '../server/localStorage'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      info:'',
      phone: '',
      nickname: '',
      Email: '',
      pwd: '',
      confirmPwd: '',
      captcha: '',
      isLoading:false,
      showTime:false,
      time:0,
      second:60,
      showPt:false,
      check1:true,
      check2:true,
      model:"登录"
    }
  },
  // computed: mapState(['adverList']),
  computed: {
    adverList () {
      return this.$store.state.adverList
    }
  },
  // watch:{
  //   adverList: function (val, oldVal) {
  //     this.advertisementList = val;
  //     console.log("^^^^^^",this.advertisementList)
  //   },
  // },
  components:{

  },
  mounted: function() {  
    let pwd = getStorage("pwd");
    if(pwd){
      this.pwd= pwd;
      console.log("***pwd***",pwd)
    }     
  },
  created (){
    console.log("######adver######",this.adverList)
  },
  methods:{
    goindex(){
      this.$router.push({name: 'WorldCup'}); // 跳到首页
    },
    skip(item){
      this.TMWorldCup();
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
    loginCheck () {
      this.check1 =! this.check1;
    },
    regCheck () {
      this.check2 =! this.check2;
    },
    async login () { //用户登录
      if(!this.info){
        alert("请输入手机号码/邮箱/昵称")
        return false
      }
      if(!this.pwd){
        alert("请输入密码")
        return false
      }
      this.phone = this.Email = this.nickname = "";
      let checkUserPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      let checkUserEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (checkUserPhone.test(this.info)) {
        console.log('手机号验证通过');
        this.phone = this.info
      }
      else if (checkUserEmail.test(this.info)) {
        console.log('邮箱验证通过');
        this.Email = this.info
      }
      else{
        this.nickname = this.info
      }
      const parm = {
        phone: this.phone,
        Email: this.Email,
        nickname: this.nickname,
        pwd: this.pwd
      }
      this.isLoading=true
      let result = await Login(parm) //登录
      let data = result.data;
      if(data.success==false){
        this.isLoading=false;
        alert(data.message);
        return false;
      }
      console.log('*********',data)
      this.isLoading=false;
      // setStorage('uid',data.data);// 用户ID
      sessionStorage.setItem('uid',data.userdata.id);
      setStorage('counts',data.userdata.counts);// 用户数据
      setStorage('WorldCupUseCounts',data.userdata.WorldCupUseCounts);// 用户数据
      // this.$store.commit('SET_USERDATA',data.userdata);
      if(this.check1){ // 记住密码
        setStorage('pwd',this.pwd) //记录登录用户的登陆密码
      }
      this.$router.go(-1);
      setStorage('shareid',data.data.id);
      window.wx_share() // 执行微信分享代码
    },
    async register () { //注册
      if(!this.phone||!this.nickname||!this.Email||!this.pwd||!this.confirmPwd){
        alert("请输入注册信息");
        return false;
      }
      let checkUserPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      let checkUserEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (this.phone && checkUserPhone.test(this.phone)) {
        console.log('手机号验证通过')
      }
      else {
        alert("请输入正确的手机号")
        return false
      }
      if (this.Email && checkUserEmail.test(this.Email)) {
        console.log('邮箱验证通过')
      }
      else {
        alert("请输入正确的邮箱")
        return false
      }
      if(this.pwd!=this.confirmPwd){
        alert("密码与确认密码不一致！")
        return false;
      }
      const parm = {
        phone: this.phone,
        Email: this.Email,
        nickname: this.nickname,
        pwd: this.pwd,
        shareid: getStorage("shareid")||""
      }
      this.isLoading=true
      let result = await Register(parm)
      let data = result.data;
      if(data.success==false){
          this.isLoading=false
          alert(data.message);
          return false;
      }
      this.isLoading=false;
      // console.log('****register*****',result,data)
      // setStorage('uid',data.data.id);// 用户ID
      sessionStorage.setItem('uid',data.data.id);
      setStorage('shareid',data.data.id);
      // this.$store.commit('SET_USERDATA',data.data);
      // let shareid = getStorage("shareid");
      // if(!shareid){
      //   // 如果不存在分享ID，则把当前登录Id设为分享Id
      //   setStorage('shareid',data.data.id);
      // }
      setStorage('counts',data.data.counts);// 用户数据
      alert(data.message);
      window.wx_share() // 执行微信分享代码
      this.$router.push({name: 'WorldCup'}); // 跳到首页
      window.wx_share() // 执行微信分享代码
    },
    async updatePwd () { //注册
      if(!this.phone||!this.Email){
        alert("请输入完整信息");
        return false;
      }
      let checkUserPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      let checkUserEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (this.phone && checkUserPhone.test(this.phone)) {
        console.log('手机号验证通过')
      }
      else {
        alert("请输入正确的手机号")
        return false
      }
      if (this.Email && checkUserEmail.test(this.Email)) {
        console.log('邮箱验证通过')
      }
      else {
        alert("请输入正确的邮箱")
        return false
      }
      const parm = {
        phone: this.phone,
        Email: this.Email
      }
      this.isLoading=true
      let result = await updatePwd(parm)
      let data = result.data;
      this.isLoading=false;
      alert(data.message);
      this.$router.push({name: 'WorldCup'}); // 跳到首页
    },
    changeModel (model) {
      this.model = model;
      this.nickname =this.phone=this.Email=this.info=this.pwd=this.confirmPwd="";
    },
    show(){
      this.showPt = true;
    },
    close(){
      this.showPt = false;
    },
    goback(){
      // 返回上一页
      this.$router.go(-1);
    }
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goindex{
  width: 1.61rem;
    font-size: 0.18rem;
    color: white;
    position: absolute;
    right: 0px;
    top: 1.2rem;
    text-align: center;

}
.login-body{
  width: 100%;
  height: 100%;
  background-color: #0056ad;
}
.login-body-container{
  width: 100%;
  height: 100%;
  background: url(../assets/login_bg.jpg) top center no-repeat;
  background-size: 100% 100%;
}
.login-body-container .logo{
  width: 1.41rem;
  position: absolute;
  top:0rem;
  right: 0rem;
}
.back{
  width: 0.61rem;
  position: absolute;
  top:0rem;
  left: 0rem;
}
.func{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
  padding: 0rem 0.2rem;
}
.func .forgetPwd{
  color: white;
  text-decoration:underline;
}
.func .register{
  color: yellow;
  text-decoration:underline;
}
.box-container{
  position: relative;
  margin:0 auto;
  top: .7rem;
  width: 4.8rem;
  /*border: 1px solid #dbc4bb;*/
  border-radius: 0.08rem;
}

.box-title{
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  color: #ffffff;
  margin-bottom: 0.45rem;
}
.other{
  margin-bottom: 1.5rem;
}
.box-input{
  display: flex;
  margin: 0 auto;
  margin-bottom:0.20rem;
  width: 100%;
  height: 0.7rem;
  border-radius: 0.35rem;
  background-color: rgb(77,136,196);
}
.box-icon{
  width: 0.8rem;
  height: 0.7rem;
  text-align: center;
  line-height: 0.7rem;
}
.box-icon .phone_icon{
  width: 0.23rem;
  vertical-align: middle;
  margin-top: -0.05rem;
}
.box-icon .email_icon{
  width: 0.33rem;
  vertical-align: middle;
  margin-top: -0.05rem;
}
.box-icon .key_icon{
  width: 0.28rem;
  vertical-align: middle;
  margin-top: -0.05rem;
}
.box-icon .aq_icon{
  width: 0.24rem;
  vertical-align: middle;
  margin-top: -0.05rem;
}
.input-container{
  position: relative;
  width: 4.50rem;
  height: 0.7rem;
}
.input-container input{
  color: white;
  width: 100%;
  height: 0.7rem;
  font-size: 0.18rem;
}

.box-btn{
  margin:0 auto;
  width: 100%;
  height: 0.70rem;
  border-radius: 0.35rem;
  line-height: 0.70rem;
  text-align: center;
  font-size: 0.32rem;
  color: #ffffff;
  background-color: rgb(0,128,204);
  margin-top:0.30rem;
  margin-bottom:0.1rem;
}
.text{
  width: 100%;
  font-size: 0.19rem;
  height: 0.4rem;
  line-height: 0.4rem;
  color: white;
  margin-left: 0.3rem;
}
.text .select{
  width: 0.2rem;
  margin-right: 0.1rem;
}
.text .protocol{
  text-decoration:underline;
}
.pt_content{
  background-color: white;
  position: absolute;
  top:0.2rem;
  left:0.2rem;
  bottom:0.2rem;
  width: 6rem;
  overflow: auto;
  color: #373737;
  font-size: 0.175rem;
}
.pt_content .close{ 
  width: 0.49rem;
  position: fixed;
  right: 0.2rem;
  top: 0.2rem;
}
.pt_content .title{
  font-weight: bold;
  text-align: center;
  margin: 0.2rem 0rem;
}
.rememberPwd{
  width: 0.2rem;
  margin-right: 0.1rem;
}
.loading{
  position: fixed;
  width: 6.4rem;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
}
.loading img{
  margin-top: 45%;
  margin-left: 2.56rem;
  width: 1.28rem;
  height: 1.28rem;
}
input::-webkit-input-placeholder{ /*WebKit browsers*/
  color: white;
  font-size: 0.18rem;
}

input::-moz-input-placeholder{ /*Mozilla Firefox*/
  color: white;
  font-size: 0.18rem;
}

input::-ms-input-placeholder{ /*Internet Explorer*/ 
  color: white;
  font-size: 0.18rem;
}
.my-swipe {
  position: fixed;
  bottom: 0px;
  height: 1.04rem;
  width: 100%;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.slide img{
  width: 100%;
  height: 1.04rem;
}
</style>
