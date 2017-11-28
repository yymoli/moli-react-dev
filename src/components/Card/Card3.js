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
            defaultData : {
                name: {
                    "title":"name",
                    "disabled": false,
                    "style":{
                        "color": "#bcbcbc"
                    }
                },
                mobile: {
                    "title":"mobile",
                    "disabled": false,
                    "style":{
                        "color": "#000"
                    }
                },
                "email":{
                    "title":"邮箱3",
                    "disabled": false,
                    "style":{
                        "color": "#bcbcbc"
                    }
                },
                "companyName": {
                    "title": "公司4",
                    "disabled": false,
                    "style": {
                        "color": "#bcbcbc"
                    }
                }
            },
            allData:{},
            metas:{}
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let allData = nextProps.data;
        let metas = nextProps.metas;
        this.setState({
            allData: allData,
            metas: metas
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

    titleRec =(key,val) => {
        let metas = this.state.metas;
        let defaultData = this.state.defaultData;
        if(metas.card && metas.card.properties && metas.card.properties[key] && metas.card.properties[key][val] ){
            return metas.card.properties[key][val];
        }else{
            return defaultData[key][val];
        }
    }

    render() {
        let data = this.state.allData;
        let metas = this.state.metas;
        return (
            <div className="mt20">
                <Row>
                    <Col lg={4} md={4} sm={6} xs={12} >
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                {this.titleRec('name','title')}
                            </div>
                            <div className="um-list-item-right um-bf1">
                                <input
                                    type="text"
                                    className="form-control" value={data.userName}
                                    onChange={(e)=>this.handleChange("name",e)}
                                    disabled={this.titleRec('name','disabled')}
                                    style={this.titleRec('name','style')}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={6} xs={12} >
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                {this.titleRec('mobile','title')}
                            </div>
                            <div className="um-list-item-right um-bf1">
                                <input
                                    type="text"
                                    className="form-control" value={data.mobile}
                                    onChange={(e)=>this.handleChange("mobile",e)}
                                    disabled={this.titleRec('mobile','disabled')}
                                    style={this.titleRec('mobile','style')}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={6} xs={12} >
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                {this.titleRec('email','title')}
                            </div>
                            <div className="um-list-item-right um-bf1">
                                <input
                                    type="text"
                                    className="form-control" value={data.email}
                                    onChange={(e)=>this.handleChange("email",e)}
                                    disabled={this.titleRec('email','disabled')}
                                    style={this.titleRec('email','style')}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={6} xs={12} >
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                {this.titleRec('companyName','title')}
                            </div>
                            <div className="um-list-item-right um-bf1">
                                <input
                                    type="text"
                                    className="form-control" value={data.companyName}
                                    onChange={(e)=>this.handleChange("companyName",e)}
                                    disabled={this.titleRec('companyName','disabled')}
                                    style={this.titleRec('companyName','style')}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
Card.defaultProps = defaultProps;
export default Card ; 