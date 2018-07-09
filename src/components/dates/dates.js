import './dates.less'
import { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Date } from "../../utils/index"
import { isWeixin } from "../../utils";

export  default  class DatesList extends Component{

    constructor(props){
        super(...arguments);
        this.state = {
            title: [ "日", "一", "二", "三", "四", "五", "六" ],
            nowDate: new Date().format("yyyy-MM-dd"), //当前时间
            monthShowNum: props.monthShowNum,
            dateAry:[],
            markerData:props.markerData,
            checked:props.checked,
            previousLevel:[]
        }
    }
    componentWillMount(){
        var
            props = this.state,
            nowDateAry = props.nowDate.split("-"),
            year = Number(nowDateAry[0]),
            nowMonthIndex = Number(nowDateAry[1])-1,
            monthNum = props.monthShowNum;
        var dateAry=[];
        for(var m=0;m<monthNum;m++){
            var
                y = year + Math.floor((nowMonthIndex + m)/12),
                mi = (nowMonthIndex+m)%12;
            var monthData = this.drawMonth(y, mi,m);
            dateAry.push(monthData)
        }
        this.setState({ dateAry: dateAry})

    }
    isLeapYear(year) {  return(year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);  }
    //检测是否大小月输出天数
    getMonthDayNum(year,month){
        if ([1, 3, 5, 7, 8, 10, 12].indexOf(month)!=-1){
            return 31
        }
        if ([4, 6, 9, 11].indexOf(month) != -1){
            return 30
        }
        if(month==2){
            if (this.isLeapYear(Number(year))){
                return 29
            }else{
                return 28
            }
        }
    }
    //绘制月
    drawMonth(year,monthIndex,mi){
        var
            blackout = this.blackout,
            nowDateStr = this.state.nowDate,
            tomorrowStr = new Date(new Date().getTime()+24*60*60*1000),
            markerData = this.state.markerData,
            monthFirstDayWeekIndex = new Date(year,monthIndex,1).getDay(),
            monthObj={
                vacancy: monthFirstDayWeekIndex,//前面空位
                value: year + "年" + (monthIndex+1)+"月",
                day:[]
            },
            dayNum = this.getMonthDayNum(year, monthIndex+1)+1;
        // console.log(blackout.call(null,1),"blackout")
        //循环天
        for (var d = 1; d < dayNum;d++){
            var
                date=new Date(year,monthIndex,d),
                timeStamp=date.getTime(),
                dateStr = new Date(date),
                classStr="",
                dayOptions={
                    value: d,
                    marker: {},
                    className:"",
                    date: date,
                    timeStamp: timeStamp,
                }
            ;
            switch (dateStr){
                case nowDateStr:
                    classStr += "date-today";
                    dayOptions.value ="今天"
                    break;
                case tomorrowStr:
                    dayOptions.value="明天";
                    break;
            };
            if (markerData[dateStr]){
                dayOptions.value = markerData[dateStr].value;
                dayOptions.marker = markerData[dateStr];
                classStr+=" date-marker"
            }

            if (blackout && !blackout.call(this,dayOptions)){
                classStr += " date-disable"
            } else if (this.state.checked.indexOf(dateStr)!=-1){
                classStr += " date-checked";
                this.state.previousLevel=[mi,d-1]
            }
            dayOptions.className = classStr;
            // console.log(dateStr,nowDateStr,"--------")
            monthObj.day.push(dayOptions)
        }
        return monthObj
    }

    render(){
        let date_box =  !isWeixin()?"height: 94%;overflow:hidden":"",
            date_content = !isWeixin()?"height:95%":"";
        return <View className='date-box'  style={date_box}>
            <View className='date-title'>
                {
                    this.state.title.map((item,index)=>{
                        return <View  key={index}>{item}</View>
                    })
                }
            </View>
            <ScrollView className='date-content' scroll-y={true} style={date_content}>
                {
                    this.state.dateAry.map((item)=>{
                        return <View className='date-month'>
                            <View className='month-title'>{item.value}</View>
                            <View className='month-content'>
                                {
                                    item.day.map((day,index)=>{
                                        return <View key={index}>
                                            <View className={`date-day ${day.className}`}>{day.value}</View>
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    })
                }

            </ScrollView>
        </View>
    }
}
