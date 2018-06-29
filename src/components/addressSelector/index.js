import Taro, { Component } from '@tarojs/taro'
import { View, Image,Input,ScrollView ,Text} from '@tarojs/components'
import './index.less'

export default class AddressSelector extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            scrollID:"",
            checkedListIsHide: false,
            top:0,
        }
    }
    InputChange(e){
        console.log("index", e.target.value)
    }

    render(){
        return(
            <View className='scrollMain' style='height:100%;overflow:hidden'>
                <View className='address-search-box'>
                    <Image src='https://miniapp.scqcp.com/images/search-cion.png'></Image>
                    <Input type='text' cursor='60' placeholder='成都,chengdu,cd' onInput={this.InputChange}></Input>
                </View>
                <View className='address-content-box'>
                    <ScrollView
                      scrollY
                      style='height:86%'
                      scrollTop={this.state.top}
                      scrollWithAnimation
                      className='address-checked-listbox noScrollBar'
                      hidden={this.state.checkedListIsHide}
                    >
                        <View className='address-content-line'>
                            <text>当前定位城市</text>
                            <View className='line-content now-city'>
                                <View className='locationDetail'>
                                    <text>成都</text>
                                    <text>GPS定位</text>
                                </View>
                            </View>
                        </View>
                        <View className='address-content-line'>
                            <text>历史搜索</text>
                            <View className='line-content'>
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <i></i>{" "}
                            </View>
                        </View>
                        <View className='address-content-line'>
                            <text>热门</text>
                            <View className='line-content'>
                                <View className='locationDetail'>北京</View>{" "}
                                <View className='locationDetail'>成都</View>{" "}
                                <i></i>{" "}
                                <i></i>{" "}
                            </View>
                        </View>
                        <View className='address-keyboard' id='keyboard'>
                            <View className='keyboard-unit'>A</View>{" "}
                            <View className='keyboard-unit'>B</View>{" "}
                            <View className='keyboard-unit'>C</View>{" "}
                            <View className='keyboard-unit'>D</View>{" "}
                            <View className='keyboard-unit'>E</View>{" "}
                            <View className='keyboard-unit'>F</View>{" "}
                            <View className='keyboard-unit'>G</View>{" "}
                            <View className='keyboard-unit'>H</View>{" "}
                            <View className='keyboard-unit'>I</View>{" "}
                            <View className='keyboard-unit'>J</View>{" "}
                            <View className='keyboard-unit'>K</View>{" "}
                            <View className='keyboard-unit'>L</View>{" "}
                            <View className='keyboard-unit'>M</View>{" "}
                            <View className='keyboard-unit'>N</View>{" "}
                            <View className='keyboard-unit'>O</View>{" "}
                            <View className='keyboard-unit'>P</View>{" "}
                            <View className='keyboard-unit'>Q</View>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                            <i></i>{" "}
                        </View>
                    </ScrollView>
                </View>
            </View>

        )
    }
}
