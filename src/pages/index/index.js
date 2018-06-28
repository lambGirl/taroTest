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
      todos: [],
      githubList: [],
      inputTodoValue: '',
      imagesList: [
        'https://m.360buyimg.com/babel/jfs/t19189/259/982422064/89206/94ed5482/5ab4f6cbNd323ee06.jpg',
        'https://img1.360buyimg.com/da/jfs/t14950/329/2565843691/99347/46a6681f/5ab21540N21d5240c.jpg'
      ]
    }
  }

  addTodoClick = async () => {
    this.addTodo({
      createTime: new Date().getTime(),
      title: this.state.inputTodoValue
    })
    const res = await Taro.request(`https://api.github.com/search/repositories?q=${this.state.inputTodoValue}`)
    if (res.statusCode === 200 || res.statusCode === 201) {
      this.setState({
        githubList: res.data.items
      })
    }
  }

  addTodo (todoItem) {
    const todos = this.state.todos.concat()
    todos.push(todoItem)
    this.setState({
      todos
    })
  }

  setTodoValue = e => {
    this.changeTimer && clearTimeout(this.changeTimer)
    this.changeTimer = setTimeout(() => {
      this.setState({
        inputTodoValue: e.target.value
      })
    }, 10)
  }

  deleteTodo (index, e) {
    e.preventDefault()
    const todos = this.state.todos.concat()
    todos.splice(index, 1)
    this.setState({
      todos
    })
  }

  xxhanlder = () => {
    console.log('sdsddssd')
  }



  navigateTo () {
    Taro.navigateTo({
      url: '/pages/about/about'
    })
  }

  navigateBack () {
    Taro.navigateBack({
      delta: 1
    })
  }
  ClickMe(){
    console.log("我被点击了");
  }

  onChecked(tag){
      Taro.navigateTo({
          url:'/pages/cityList/index?tag='+tag
      })
  }
  //点击查询
  onQuery(){
        Taro.switchTab({
            url: '/pages/about/about'
        })
  }

  render () {
    return (
        <View>
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

