import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Card  from 'widget/Card/Card';
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';
import './list.css';
const propTypes = {
    data:PropTypes.array,
    style:PropTypes.object
}
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
    renderHeader = () => {
        var _this = this;
        let metaData = _this.props.metaData;
        let metaTitle=[];
        let headerArr=[];
        for(let i in metaData){
           // metaTitle.push( metaData[i].name);
            headerArr.push(<div className="th1 um-bf1" style={metaData[i].style}>{metaData[i].name}</div>);
       }
        return headerArr;
    }
    renderTabContent = () => {
        let _this = this;
        let data = this.props.data;
        let metaData = _this.props.metaData
        let tabContentArray = [];
        let ContentArray=[];
         for (let i=0;i<data.length;i++){
             for(let k in data[i]){
                 ContentArray.push( <div  className="td1 um-bf1 um-box-center">{data[i][k]}</div>);
             }
             tabContentArray.push(<div className="um-box um-line">{ContentArray}</div>);
             ContentArray=[];
         }
        return tabContentArray;
    }
    render() {
       let header= this.renderHeader()
        return (
            <div className="list um-content">
                <div className="header">
                <div className="um-box">
                    	{header}
                 </div>
                </div>
                <div className="content">
                    {this.renderTabContent()}
                </div>
            </div>
        );
    }
};
ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default ContentList;