import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index/index'
import configStore from './store'

import './app.scss'

const store = configStore();

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/hello/hello',
      'pages/about/about',
      'pages/cityList/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '团子汽车票',
      navigationBarTextStyle: 'black'
    },
      tabBar: {
          list: [
              {

                  pagePath: 'pages/index/index',
                  text: '首页',
                  iconPath: 'asset/tabBar_icon_index.png',
                  selectedIconPath: 'asset/tabBar_icon_index_select.png'
              },
              {
                  pagePath: "pages/hello/hello",
                  text: "订单",
                  iconPath: "asset/tabBar_icon_order.png",
                  selectedIconPath: "asset/tabBar_icon_order_select.png"
              },
              {
                  pagePath: "pages/about/about",
                  text: "我的",
                  iconPath: "asset/tabBar_icon_main.png",
                  selectedIconPath: "asset/tabBar_icon_main_select.png"
              }
          ],
          color:"#9B9B9B",
          selectedColor:"#559EF7",
      }
  }

  componentDidMount () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
