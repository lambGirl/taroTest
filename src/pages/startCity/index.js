import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button, Image } from '@tarojs/components';
import { isWeixin,postIo } from '../../utils/index';
import './index.less';
import AddressSelector from "../../components/addressSelector/index";
import Left from '../../asset/left.png'


export default class CityList extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            showHeader: isWeixin(),
            hotCity:[],
            cityList:[],
        }
    }
    back(){
      //如果是h5的就需要做这个设置
      if(!isWeixin()){
          history.back();
      }
    }
    componentDidMount(){
      //  console.log("componentDidMount");
    }
    componentWillMount (){
        //初始化热门城市
        this.initStart({
            h5Url:'/api?server=tz_getStartHotCity',
            weappUrl: '/ticket/getStartHotCity',
            tag:'hotCity',
            data:{}
        })

        //初始化开始城市
        this.initStart({
            h5Url:'/api?server=tz_queryAllConnStartPlace',
            weappUrl: '/ticket/getConnStartCity',
            tag:'cityList',
            data:{ stationNo: "" }
        })
    }
    initStart(param){
       // console.log("initStart--------------")
        let url =  param.h5Url||'/api?server=tz_getStartHotCity'; //H5的情况
        if(isWeixin()){
            url = param.weappUrl||'/ticket/getConnStartCity';
        }
        //需要初始化，开始城市，初始化热门城市
        postIo({
            configUrl:url,
            method:'POST',
            data:param.data,
            header:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
         //  console.log("url",url,res);
            if(param.tag == "hotCity"){
                this.setState({
                    hotCity: isWeixin()?res.data.body.data:res.data.data.body.data
                })
                return;
            }
            this.setState({
                cityList: isWeixin()?res.data.body.data:res.data.data.body.data
            })
        }).catch((err)=>{

        })
    }

    chooseItem(item,tag){
        console.log("item",item,tag);
        //历史记录存储
        if(tag){

        }
        //起始地跳转

    }

    render(){
        //console.log("hotCity", this.state.hotCity);
        return (
            <View style='height:100%;overflow:hidden;'>
                {
                    !this.state.showHeader && <View className='header'>
                        <View className='left' onClick={this.back.bind(this)}>
                            <Image src={Left}></Image>
                        </View>
                        <View className='center'>选择城市</View>
                    </View>
                }
               <AddressSelector hotCity={this.state.hotCity} cityList={this.state.cityList} bindClick={this.chooseItem.bind(this)}></AddressSelector>
            </View>
        )
    }
}
