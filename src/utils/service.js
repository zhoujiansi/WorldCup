/*import {dispatch, store} from '../stores'*/
import request from './fetch.js'
import axios from 'axios'
import config from '../config.js'
axios.defaults.timeout = 30 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * translate obj params to string with &
 * @param params
 * @returns {string}
 */
export function translateParams (params) {
  let url = ''
  for (let param in params) {
    url += `${param}=${encodeURIComponent(params[param])}&`
  }
  return url.substring(0, url.length - 1)
}

/*
 *登录
 */
export const Login = async (prama) => {
  let url = config.domain.user + "/WorldCup/LoginWorldCup";
  let params={
    "phone":prama.phone,//手机号
    "nickname":prama.nickname,//昵称
    "Email":prama.Email,//邮箱
    "WorldCupPwd":prama.pwd,//邮箱
  };
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
export const Register = async (prama) => {
  let url = config.domain.user + "/WorldCup/RegisterWorldCup";
  let params={
    "phone":prama.phone,//手机号
    "nickname":prama.nickname,//昵称
    "Email":prama.Email,//邮箱
    "WorldCupPwd":prama.pwd,//邮箱
  };
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
export const updatePwd = async (prama) => {
  let url = config.domain.user + "/WorldCup/BackPWDWorldCup";
  let params={
    "phone":prama.phone,//手机号
    "Email":prama.Email,//邮箱
  };
  let urlStr = url + `?${translateParams(params)}`
  let parameters = {
    url: urlStr,
    method: 'GET',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取广告
 */
export const getAdverList = async (prama) => {
  let url = config.domain.user + "/Adver/GetTypeAdvertiseList";
  let params={
    "type":prama.type //类别 
  };
  console.log()
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}

/*
 *获取赛程
 */
export const GetScheduleTimeList = async () => {
  let url = config.domain.user + "/WorldCupSchedule/GetScheduleTimeList";
  let parameters = {
    url: url,
    method: 'post'
    // data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取是否参与的赛程
 */
export const GetScheduleListByID = async (prama) => {
  let url = config.domain.user + "/WorldCupSchedule/GetScheduleListByID";
  let params={
    "pdataid":prama.pdataid //类别 
  };
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取总积分排行榜
 */
export const GetRankList = async (prama) => {
  let url = config.domain.user + "/WorldCup/GetRankList";
  let parameters = {
    url: url,
    method: 'post'
    // data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取乌鸦帝排行榜
 */
export const GetCrowRankList = async (prama) => {
  let url = config.domain.user + "/WorldCup/GetCrowRankList";
  let parameters = {
    url: url,
    method: 'post'
    // data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取全部赛程列表
 */
export const GetScheduleAllList = async () => {
  let url = config.domain.user + "/WorldCupSchedule/GetScheduleAllList";
  let parameters = {
    url: url,
    method: 'post'
    // data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取全部奖品列表
 */
export const GetAllPrizeList = async () => {
  let url = config.domain.user + "/WorldCupPrize/GetAllPrizeList";
  let parameters = {
    url: url,
    method: 'post'
    // data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *获取全部活动列表
 */
export const GetActionList = async (prama) => {
  let url = config.domain.user + "/WorldCup/GetActionList";
  let params={
    "pdataid":prama.pdataid //类别 
  };
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}

/*
 *获取我的相关积分信息
 */
export const GetMyInfo = async (prama) => {
  let url = config.domain.user + "/WorldCup/GetMyInfo";
  let params={
    "id":prama.id //登录人id
  };
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *提交竞猜内容
 */
export const SaveGuess = async (prama) => {
  let url = config.domain.user + "/WorldCupGuess/SaveGuess";
  let params={
    "ScheduleId":prama.ScheduleId, //赛程
    "pdataid":prama.pdataid, //登录人id
    "guess":prama.guess, //竞猜
    "counts":prama.counts, //下注分数
  };
  let parameters = {
    url: url,
    method: 'post',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}
/*
 *兑换礼物
 */
export const AcceptPrize = async (prama) => {
  let url = config.domain.user + "/WorldCupAcceptPrize/AcceptPrize";
  let params={
    "PrizeIds":prama.PrizeIds, //
    "pdataid":prama.pdataid, //登录人id
    "name":prama.name, //
    "phone":prama.phone, //
    "company":prama.company, //
    "zip":prama.zip, //
    "data8":prama.data8, //
  };
  let urlStr = url + `?${translateParams(params)}`
  let parameters = {
    url: urlStr,
    method: 'GET',
    data: translateParams(params)
  }
  // let urlStr = url + `?${translateParams(params)}`
  // let parameters = {
  //   url: params ? urlStr : url,
  //   method: 'get'
  // }
  let data = await axios.request(parameters)
  return data
}
/*
 *天猫点击
 */
export const TMWorldCup = async (prama) => {
  let url = config.domain.user + "/WorldCup/TMWorldCup";
  let params={
    "pdataid":prama.pdataid, //id
  };
  let urlStr = url + `?${translateParams(params)}`
  let parameters = {
    url: urlStr,
    method: 'GET',
    data: translateParams(params)
  }
  let data = await axios.request(parameters)
  return data
}

export const setUserTokenCookie = async (prama) => {
    let url = config.domain.helper + "/node/h5helper";
    let params = {
        "token": prama.token
    };
    // var response =await request(params);
    let urlStr = url + `?${translateParams(params)}`
    let parameters = {
        url:urlStr,
        method: 'get'
    }
    let data = await axios.request(parameters)
    return data
}