import Taro from "@tarojs/taro"
function diao () {
  return 'sdsd'
}
function isWeixin(){
    return Taro.getEnv() == "WEAPP" ||false
}
export{
    diao,
    isWeixin
}
