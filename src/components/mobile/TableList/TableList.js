import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';
import { List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const propTypes = {
    data:PropTypes.array,
    style:PropTypes.object
}
const Item = List.Item;
const Brief = Item.Brief;
class ContentList extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        let metaData = this.props.metaData;
        this.setState({
            metaData: metaData
        })
    }
    componentWillReceiveProps(nextProps) {
        let metaData = nextProps.metaData;
        this.setState({
            metaData: metaData
        })
    }

    renderTabContent = () => {
        let _this = this;
        let data = _this.props.data;
        let metaData = _this.props.metaData

        let ContentArray=[];

        let totalContent=[];
        let Brief=[];
        for(let i=0;i<data.length;i++){
            for(var k in data[i]){
                Brief.push(<div> {data[i][k]} </div>)
            }
            totalContent.push(  <Item
                arrow="horizontal"
                multipleLine
                onClick={() => {}}
            >
                {Brief}
            </Item>);
            Brief=[];
          }
        return totalContent;
    }
    render() {

        return (
            <div className="list um-content">
                <div className="header">
                <div className="um-box">
                 </div>
                </div>
                <div className="content">
                    <List   className="my-list">
                        { this.renderTabContent()}
                    </List>
                </div>
            </div>
        );
    }
};
ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default ContentList;