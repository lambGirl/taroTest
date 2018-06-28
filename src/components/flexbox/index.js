import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { View, Text, Input} from '@tarojs/components'
import './index.less'

export default  class FlexBox  extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            vertical:  true,

        }
        this.PropTypes = {
            componentStyle:PropTypes.object,
            startClass: PropTypes.string,
            startStyle: PropTypes.object,
            endClass:PropTypes.string,
            endStyle: PropTypes.string
        }
    }
    handle(){
        this.props.checked();
    }

    render(){
        var {
            componentStyle,
            detail,
            defaultValue,
            title
        } =  this.props,flexClass =  classnames({
            "flex-box":true,
            "flex-box-v": this.state.vertical,

        });
        return (<View className='flex-box' style={componentStyle} onClick={this.handle.bind(this)}>
            <View className='leftTitle'>
                <Text>{title}</Text>
            </View>
            <View className='rightContent'>
                <Input
                    value={defaultValue}
                    placeholder={detail}
                    placeholder-style='color:#f1f1f1;'
                    disabled={true}
                ></Input>
            </View>
        </View>)
    }
}

