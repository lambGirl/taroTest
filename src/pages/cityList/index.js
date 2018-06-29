import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button, Image } from '@tarojs/components';
import { isWeixin } from '../../utils/index';
import './index.less';
import AddressSelector from "../../components/addressSelector/index";
import Left from '../../asset/left.png'

export default class CityList extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            showHeader: isWeixin()
        }
    }
    back(){
      //如果是h5的就需要做这个设置
      if(!isWeixin()){
          history.back();
      }
    }
    render(){

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
               <AddressSelector></AddressSelector>
            </View>
        )
    }
}
