import Taro from "@tarojs/taro";

var config = {
    wxapp:'https://miniapp.scqcp.com',
    h5: 'http://localhost:5000'
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
function postIo(params,){
    var url =  Taro.getEnv() == "WEAPP"?config['wxapp']:config["h5"],params_new = {url:url+params.configUrl, ...params};

    if( Taro.getEnv() == "WEAPP"){
        params_new = Object.assign(params_new, wxParam(url, params.data,params.configUrl, params.isScan));
    }
    return new Promise(function(resolve, reject){
        //console.log("url", url+params.configUrl);
        Taro.request({...params_new}).then(function(res){
            resolve(res);
        }).catch(function(err){
            reject(err);
        });
    })
}

export{
    isWeixin,
    postIo
}
