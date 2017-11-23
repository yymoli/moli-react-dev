import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';
import './TableList.css';
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

    renderTabContent = () => {
        let _this = this;
        let data = _this.props.data;
        let metaData = _this.props.metaData

        let ContentArray=[];

        let totalContent=[];
        for (let i=0;i<data.length;i++){
            for(var k in data[i]){
                if(metaData[k]){
                    let displayContent={"display":"block"};
                    metaData[k].display=="none"?displayContent.display=metaData[k].display:displayContent.display="block";
                    ContentArray.push(  <dt>{data[i][k]}</dt>);
                }else{
                    ContentArray.push( <dt>{data[i][k]}</dt>);
                }
            }
            ContentArray=[];
            totalContent.push(  <div  className="list-item"><div className="list-item-inner um-box-center"> <div className="cbox"><dl>{ContentArray}</dl> </div> </div> </div>);
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