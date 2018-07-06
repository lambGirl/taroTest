import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { actions } from 'roronoa-zoro'
import { bindActionCreators } from 'redux'
import { namespace } from '../../models/test'
import FlexBox from '../../components/flexbox/index';
import  { postIo,isWeixin,back }  from '../../utils/index'
import './index.less'

@connect(
    state => ({
        data: state[namespace],
    }),
    dispatch => bindActionCreators(actions(namespace), dispatch),
)

export default  class Index extends Component {
  config = {
    navigationBarTitleText: '团子汽车票'
  }

  constructor (props) {
    super(...arguments);
    this.state = {
        startCity: props.data.startCity
    }
  }

  onChecked(tag){
      if(tag == "start"){
          Taro.navigateTo({
              url:'/pages/startCity/index?tag='+tag
          })
      }

  }

  componentDidMount(){
     // const { queryTest } = this.props
      //console.log("props", this.props)
  }
  //点击查询
  onQuery(){
      if(isWeixin()){
          this.onQueryWx();
          return;
      }
      postIo({
          configUrl:'/api?server=tz_visit',
          method:"POST",
          data:JSON.stringify({
              type:'1',
              openId: "sdfsdfsdf"
          }),
          header:{
              'Content-Type': 'application/json'
          }
      }).then(function(res){
        //  console.log("res",res);
      }).catch(function(err){

      })

  }
  onQueryWx(){
      postIo({
          configUrl:'/ticket/getConnStartCity',
          method:"POST",
          data:{ stationNo: "" },
          header:{
              'Content-Type': 'application/json'
          }
      }).then(function(res){
          console.log("res",res);
      }).catch(function(err){

      })
  }
  render(){
     // console.log("startCity", this.state);
      return (
        <View >
            <View className='noScrollBar'>
                <View className='topBanner'>
                    <Image src='https://miniapp.scqcp.com/images/banner_1.png' mode='aspectFill'></Image>
                </View>
                <View className='pd-10'>
                    <View className=' bgc-fff bdr-4 _inputbox'>
                        <FlexBox title='出发' defaultValue={this.state.startCity.alias} detail='请选择起始地' checked={this.onChecked.bind(this,'start')}/>
                        <View className='line'></View>
                        <FlexBox title='目的地' defaultValue={this.state.startCity.alias} detail='请选择目的地' checked={this.onChecked.bind(this,'end')}/>
                        <View className='line'></View>
                        <FlexBox  title='时间' defaultValue={this.state.startCity.alias} detail='请选择时间' checked={this.onChecked.bind(this,'time')}/>
                        <View className='switch'>
                            <Image src='https://miniapp.scqcp.com/images/exchange_address.png' className='switchImg'></Image>
                        </View>
                        <Button style='border:none;background-color:#559EF7;color:#fff;margin-top: 25rpx;width:661rpx;height:90rpx;' onClick={this.onQuery.bind(this)}>查询</Button>
                    </View>
                </View>
                <Image src='https://miniapp.scqcp.com/images/bottomBanner.png' className='bottomImg'></Image>
            </View>
        </View>
    )
  }
}




