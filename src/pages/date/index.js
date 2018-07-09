import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button, Image } from '@tarojs/components';
import { isWeixin,postIo,back } from '../../utils/index';
import { connect } from '@tarojs/redux'
import { actions } from 'roronoa-zoro'
import { bindActionCreators } from 'redux'
import { namespace } from '../../models/test'
import DatesList from "../../components/dates/dates";
import Header from '../../components/head/head'

@connect(
    state => ({
        data: state[namespace],
    }),
    dispatch => bindActionCreators(actions(namespace), dispatch),
)
export default class Dates extends Component{
    constructor(props){
        super(props);
        this.state = {
            showHeader: isWeixin(),
            marker:{
                "2017-11-9": { value: "生日", detail:{}}
            },
            checkedDate:['2018-07-09'],
            monthNum:2
        }
    }
    back(){
        back();
    }
    componentWillMount(){
        var options = this.$router.params;
      //  console.log("options",options);
     //   return;
        var
            startDateTime=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1,1,0,0).getTime(),
            endDateTime = startDateTime + 24 * 60 * 60 * 1000 * Number(options.preSaleDay),
            endMonth=new Date(endDateTime).getMonth();
         //   dateSelector = this.selectComponent("#dateSelector");//setMethod

        var mn = (endMonth - new Date().getMonth() + 12) % 12 + 1;
        this.setState({
            checkedDate: [options.checkedDate],
            monthNum: mn
        })
        //设置过滤方法
       /* dateSelector.setMethod("blackout", function (dayOptions) {
            return (dayOptions.timeStamp > startDateTime) && (dayOptions.timeStamp < endDateTime)
        });*/
    }
    chooseDate(date){
        const { setInitDateCity } =  this.props;
        setInitDateCity({date});

        //起始地跳转
        back();
    }
    render(){
        return <View style={{"height":'100%'}}>
                {
                    !this.state.showHeader && <Header leftBack={this.back.bind(this)} centerTitle='选择日期'></Header>
                }
                <DatesList
                    checked={this.state.checkedDate}
                    monthShowNum={this.state.monthNum}
                    markerData={this.state.marker}
                    chooseDate={this.chooseDate.bind(this)}
                ></DatesList>
            </View>

    }
}
