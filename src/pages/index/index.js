import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import FlexBox from '../../components/flexbox/index';
import './index.less'

import { increment, decrement, asyncInc } from '../../actions/counter'

class Index extends Component {
  config = {
    navigationBarTitleText: '团子汽车票'
  }

  constructor () {
    super(...arguments);
    this.state = {
    }
  }





  onChecked(tag){
      Taro.navigateTo({
          url:'/pages/cityList/index?tag='+tag
      })
      //location.href =  '/pages/cityList/index?tag='+tag;

  }
  //点击查询
  onQuery(){
        Taro.switchTab({
            url: '/pages/about/about'
        })
  }


  render () {
    return (
        <View >
            <View className='noScrollBar'>
                <View className='topBanner'>
                    <Image src='https://miniapp.scqcp.com/images/banner_1.png' mode='aspectFill'></Image>
                </View>
                <View className='pd-10'>
                    <View className=' bgc-fff bdr-4 _inputbox'>
                        <FlexBox title='出发' defaultValue={this.state.startCity} detail='请选择起始地' checked={this.onChecked.bind(this,'start')}/>
                        <View className='line'></View>
                        <FlexBox title='目的地' defaultValue={this.state.startCity} detail='请选择目的地' checked={this.onChecked.bind(this,'end')}/>
                        <View className='line'></View>
                        <FlexBox  title='时间' defaultValue={this.state.startCity} detail='请选择时间' checked={this.onChecked.bind(this,'time')}/>
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

export default connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  inc () {
    dispatch(increment())
  },
  dec () {
    dispatch(decrement())
  },
  asyncInc () {
    dispatch(asyncInc())
  }
}))(Index)
