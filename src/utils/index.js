import Taro from "@tarojs/taro";
import 'babel-polyfill';

var config = {
    wxapp:'https://miniapp.scqcp.com',
    h5: 'http://192.168.1.107:5000'
}

function diao () {
  return 'sdsd'
}

function isWeixin(){
    return Taro.getEnv() == "WEAPP" ||false
}

function wxParam(url, data, configUrl,isScan){

    var urlChunk=configUrl.split("?"),
        queryStr = urlChunk.slice(1),
        herf = urlChunk[0].split("/"),
        dataChunk = herf.slice(-2),
        hasCodeType = /^\d+$/.test(dataChunk[1]);
    var newUrl = herf[1];
    var data = {
        pubRequest: {
            encryType: hasCodeType? dataChunk[1]:"2",
            version: "v1.0",
            method: hasCodeType ? dataChunk[0] : dataChunk[1],
            token: "",
            isScan:isScan||false
        },
        body: data || {}
    };

    return {
        url:url+"/"+newUrl,
        data: data,
    }
}

function postIo(params){
    //console.log("过来请求了嘛");
    var url =  Taro.getEnv() == "WEAPP"?config['wxapp']:config["h5"],params_new = {url:url+params.configUrl, ...params};

    if( Taro.getEnv() == "WEAPP"){
        params_new = Object.assign(params_new, wxParam(url, params.data,params.configUrl, params.isScan));
    }

    return new Promise(function(resolve, reject){

        Taro.request(params_new).then(function(res){
          //  console.log("我是promise",res);
            resolve(res);
        }).catch(function(err){
            reject(err);
        });
    })
}

function getLetter(){
    var A_Z = [];
    for (var i = 65; i < 91; i++) {
        A_Z.push(String.fromCharCode(i));
    }
    return A_Z
}
function set(key,val){
    Taro.setStorageSync(key, val);
}
function get(key){
    return Taro.getStorageSync(key);
}

function back(){
    if(Taro.getEnv() == "WEAPP"){
        Taro.navigateBack();
        //Taro.navigateTo("/");
        return;
    }
    history.back();

}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
Date.prototype.week = function () {
    if(this.format('yyyy/MM/dd')==new Date().format('yyyy/MM/dd')){
        return '今天'
    }
    if(this.format('yyyy/MM/dd')==new Date((new Date()/1000+86400)*1000).format('yyyy/MM/dd')){
        return '明天'
    }
    return ' 星期' + '日一二三四五六'.charAt(this.getDay());
};
export{
    isWeixin,
    postIo,
    getLetter,
    set,
    get,
    back,
    Date
}
