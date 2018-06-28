import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button, Image } from '@tarojs/components';
import { isWeixin } from '../../utils/index';
import './index.less'
export default class CityList extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            showHeader: isWeixin()
        }
    }
    back(){
        Taro.navigateBack();
    }
    render(){

        return (
            <View>
                {
                    !this.state.showHeader && <View className='header'>
                        <View className='left' onClick={this.back.bind(this)}>
                            <Image src='../../asset/left.png'></Image>
                        </View>
                        <View className='center'>选择城市</View>
                    </View>
                }
                <View>我是选择城市的列表</View>
            </View>
        )
    }
}
