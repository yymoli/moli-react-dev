import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Card  from '../../Card/Card';
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';
import './TableList.css';
const propTypes = {
    data:PropTypes.array,
    style:PropTypes.object
}
class ContentList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:{},
            metaData:{},
            columns:[]
        }
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
        let metaData = _this.props.metaData;
        let columnData = _this.props.columns;
        let tabContentArray = [];
        let ContentArray=[];
        let headerArr=[];
        let tabHeaderArr=[];
        let totalContent=[];
        if(columnData){
            for (let i=0;i<columnData.length;i++){
                if(metaData[columnData[i].key]){
                    let metaDataKey=metaData[columnData[i].key];
                    (metaDataKey.display&&metaDataKey.style)?metaDataKey.style.display=metaDataKey.display:'';
                    headerArr.push(<div className="th1 um-bf1" style={metaDataKey.style?metaDataKey.style:''}>{metaDataKey.name?metaDataKey.name:columnData[i].title}</div>);
                }else{
                    headerArr.push(<div className="th1 um-bf1">{columnData[i].title}</div>);
                }
            }
        }
         for (let i=0;i<data.length;i++){
             for(var k in data[i]){
                 if(metaData[k]){
                     let displayContent={"display":"block"};
                     metaData[k].display=="none"?displayContent.display=metaData[k].display:displayContent.display="block";
                     ContentArray.push( <div  className="tc td1 um-bf1 um-box-center" style={displayContent}>{data[i][k]}</div>);
                 }else{
                     ContentArray.push( <div  className="tc td1 um-bf1 um-box-center" >{data[i][k]}</div>);
                 }
             }
             tabContentArray.push(<div className="content"><div className="um-box um-line">{ContentArray}</div></div>);
             ContentArray=[];
         }
        tabHeaderArr.push(<div className="header"><div className="um-box">{headerArr}</div></div>);
        totalContent.push(tabHeaderArr);
        totalContent.push(tabContentArray);
        return totalContent;
    }
    render() {
        return (
            <div className="list um-content">
                {this.renderTabContent()}
            </div>
        );
    }
};
ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default ContentList;