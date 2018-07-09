import { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import './index.less'
import Left from '../../asset/left.png'
export default class Head extends Component {
  constructor(props){
      super(...arguments);
  }
  back(){
    this.props.leftBack();
  }
  render() {
    return (
        <View className='header'>
            <View className='left' onClick={this.back.bind(this)}>
                <Image src={Left}></Image>
            </View>
            <View className='center'>{this.props.centerTitle}</View>
        </View>
    )
  }
}
