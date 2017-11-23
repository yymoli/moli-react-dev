import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import { Row, Col } from '../layout/index';
import './Card.css'

const defaultProps = {

};

class Card extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            defaultMeta : {
                name: {
                    "title":"姓名1",
                    "disabled": true,
                    "style":{
                        "color": "#bcbcbc"
                    }
                },
                mobile: {
                    "title":"手机号2",
                    "disabled": true,
                    "style":{
                        "color": "#bcbcbc"
                    }
                },
                "email":{
                    "title":"邮箱3",
                    "disabled": true,
                    "style":{
                        "color": "#bcbcbc"
                    }
                },
                "companyName": {
                    "title": "公司4",
                    "disabled": true,
                    "style": {
                        "color": "#bcbcbc"
                    }
                }
            },
            allData:{},
            metaData:{}
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let allData = nextProps.data;
        let metaData = nextProps.metaData;
        this.setState({
            allData: allData,
            metaData: metaData
        });
    }


    handleChange =(key,e) => {
        //debugger;
        let _this = this;
        let allD = _this.state.allData;

        allD[key] = e.target.value;
        _this.setState({
            allData: allD
        });
        _this.props.changeFn(allD)
    }

    renderContent =() => {
        let list = [];
        let data = this.state.allData;
        let defaultData = this.state.defaultData;
        if(!defaultData || !data ) return;
        for(var item in defaultData){
            list.push(
                <Col lg={4} md={4} sm={6} xs={12} >
                    <div className="um-list-item-inner">
                        <div className="um-list-item-left">
                            {this.titleRec(item,'title')}
                        </div>
                        <div className="um-list-item-right">
                            <input type="text"
                                   disabled={this.titleRec(item,'disabled')}
                                   style={this.titleRec(item,'style')}
                                   className="form-control"
                                   value={data[item]}
                                   onChange={(e)=>this.handleChange(item,e)}
                            />
                        </div>
                    </div>
                </Col>
            )
        }

        return list;
    }

    titleRec =(key,val) => {
        let metaData = this.state.metaData;
        if(!metaData) return;
        let defaultData = this.state.defaultMeta;
        if(metaData&& metaData.com && metaData.com[key] && metaData.com[key][val] ){
            return metaData.com[key][val];
        }else{
            return defaultData[key][val];
        }
    }

    render() {

        return (
            <div className="mt20">
                <Row>
                    {this.renderContent()}
                </Row>
            </div>
        )
    }
}
Card.defaultProps = defaultProps;
export default Card ; 