import Taro, { Component } from '@tarojs/taro'
import { View, Image,Input,ScrollView ,Text} from '@tarojs/components'
import {getLetter} from "../../utils/index";
import './index.less'

export default class AddressSelector extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            scrollID:"",
            checkedListIsHide: false,
            top:0,
            keyboard: getLetter(),
            keyboardNull:[],
            hotCity:[], //热门城市
            hotCityNull:[],//热门城市空格
            cityList:[],    //所有城市
            searchData_s:[],    //搜索得到的值
        }
    }
    InputChange(e){
        var
            value = e.target.value.replace(/\s+/g, "").toLowerCase(),
            s,c
        ;
        if (value.length>0){
            c = true;
            this.solidSearchIng(value)
            // this.setData({ searchData: this.searchIng(value)})
        }else{
            c = false;
        }
        this.setState({
            checkedListIsHide: c,
        })
    }
    //按照汉字排序
    localeCompare(a,b){
        if(!a&&!b){
            return;
        }
        return a.shortName.localeCompare(b.shortName);
    }

    //设置search到的值
    solidSearchIng(v){
       var datas =  this.state.cityList;
       var filterArray =  datas.filter(function(product){
            return Object.keys(product).some(function(key){
                return product['shortName'].indexOf(v) == 0 ||
                    product['fullName'].indexOf(v) == 0 ||
                    product['alias'].indexOf(v) != -1 ||
                    Object.keys(product['stations']).some(function(key){
                        return product['stations'][key].alias.indexOf(v) != -1 || product['stations'][key].fullName == v || product['stations'][key].fullName.indexOf(v) == 0 || product['stations'][key].shortName.indexOf(v) == 0;
                    })
            })
        });
       //console.log("filterArray",filterArray);
        this.setState({
            searchData_s:filterArray.sort(this.localeCompare),
        });

    }

    componentWillMount(){
        const keyboardNull = 7-this.state.keyboard.length%6;
        this.setState({
            keyboardNull: new Array(keyboardNull)
        });
    }

    componentDidMount(){
      //  console.log("componentDidMount");
    }

    componentWillReceiveProps(oldProp){
        //console.log("我来过吗");
        const hotCityNull =  4-oldProp.hotCity.length%3;
        this.setState({
            hotCity: oldProp.hotCity,
            hotCityNull:new Array(hotCityNull),
            cityList: oldProp.cityList,
            searchData_s:oldProp.cityList
        })
    }
    //被点击后的效果
    bindClick(val, tag){
        //执行父组件的方法
        this.props.bindClick(val, tag);
    }

    render(){
        return(
            <View className='scrollMain' style='height:100%;overflow:hidden'>
                <View className='address-search-box'>
                    <Image src='https://miniapp.scqcp.com/images/search-cion.png'></Image>
                    <Input type='text' cursor='60' placeholder='成都,chengdu,cd' onInput={this.InputChange.bind(this)}></Input>
                </View>
                <View className='address-content-box'>
                    {!this.state.checkedListIsHide&&<ScrollView
                      scrollY
                      style='height:86%'
                      scrollTop={this.state.top}
                      scrollWithAnimation
                      className='address-checked-listbox noScrollBar'

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
                                <i></i>{" "}
                            </View>
                        </View>
                        <View className='address-content-line'>
                            <text>热门</text>
                            <View className='line-content'>
                                {
                                     this.state.hotCity.map((val)=>{
                                         return (
                                             <span><View className='locationDetail' onClick={this.bindClick.bind(this, val,false)}>{val.alias}</View>{" "}</span>
                                         )
                                     })
                                }
                                {
                                    this.state.hotCityNull.map(()=>{
                                        return <span> <i></i>{" "}</span>
                                    })
                                }
                            </View>
                        </View>
                        <View className='address-keyboard' id='keyboard'>
                            {
                                this.state.keyboard.map((val,index)=>{
                                       return <span key={index}> <View className='keyboard-unit'>{val}</View> {" "}</span>
                                })
                            }
                            {
                                this.state.keyboardNull.map((item,index)=>{
                                    return <span key={index}> <i></i>{" "}</span>
                                })
                            }
                        </View>
                        <View className='checked-list-searchBox'>
                            {
                                this.state.cityList.map((obj,index)=>{
                                    return <View key={index}><Text>{obj["labelKey"]}</Text><Text>{obj.parentRegion||""}</Text></View>
                                })
                            }

                        </View>
                    </ScrollView>}
                    {this.state.checkedListIsHide&&<View className={`address-search-listbox ${this.state.searchData_s.length>0&&'nbgc'||''} noScrollBar`}>
                            {
                                this.state.searchData_s.map((item,index)=>{
                                    return <View className={item.className||'address-search-city'} key={index}><Text>{item['labelKey']}</Text><Text>{item.parentRegion||""}</Text></View>
                                })
                            }
                        <View style={{display: `${this.state.searchData_s.length==0&&"block"||"none"}`}}>
                            <image src='https://miniapp.scqcp.com/images/bottomBanner.png' style='width:319rpx;height:267rpx;margin:0 auto;display:block;'></image>
                            <View style='text-align:center;color:#9b9b9b;'>没有您所搜索的数据</View>
                        </View>
                    </View>}
                </View>
            </View>

        )
    }
}
