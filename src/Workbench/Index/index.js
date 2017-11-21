import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';

import appComponentManage from 'api/appComponentManager.js'
import WgtPanel from '../components/WgtPanel/WgtPanel';
import NavBar from '../../components/NavBar/index.js'
import Icon from '../../components/icon/index'

import "./index.css"
class WorkSpace extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allData: {},
            metaData: {},
            changeData:{},
            data_params:{},
            headerData:{}
        }
    }
    /**
     *
     */
    componentWillMount(){
        //debugger;
        if(window.data_params){
            var data_param = $summer.strToJson(window.data_params);
            this.setState({
                data_params: data_param
            })
        }
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        if ($summer.os == 'pc') {
            this.getData();
            this.getHeaderData();
        } else {
            summer.on("ready", this.getData);
        }
    }

    getData = () => {
        let _this = this;
        // 这里应该是上一个页面传过来的
        let id = this.state.data_params && this.state.data_params.id ? this.state.data_params.id : 4;
        ajax({
            "type": "get",
            //"url": "/user/find",
            "url": "/userlink/getContactsDetails",
            "param":{
                "meta": JSON.stringify({
                    "clientType": $summer.os,
                    "componentId":"card001"
                }),
                "id":id
            },
        },function(data){
            if(data.flag == 0){
                let allData = data.data;
                _this.setState({
                    allData: allData
                });

                let metaData = data.metaData;
                _this.setState({
                    metaData: metaData
                });
            }

        },function(res){
            console.log(res);
        });
    }
    getHeaderData = () => {
        let _this = this;
        // 这里应该是上一个页面传过来的
        ajax({
            "type": "get",
            //"url": "/user/find",
            "url": "/userlink/header",
            "param":{
                "meta": JSON.stringify({
                    "clientType": $summer.os,
                    "componentId":"card001"
                }),
            },
        },function(data){
            _this.setState({
                headerData: data
            });

        },function(res){
            console.log(res);
        });
    }

    closeFn =() => {
        appComponentManager.closeComponent({
            componentId: "cardView"
        });
    }

    save = () => {
        let data = this.state.changeData;

    }

    changeFn = (allD) => {
        alert("开发中...")
    }
    openaaa =() => {
        alert(123)
    }
    switchThemes = ()=> {
        let link = document.querySelector("#themeslink");
        let href = link.getAttribute("href");
        if(href && href.indexOf('static/themes/')){ 
            
            
        }
        let curT = href.split('static/themes/')[1].split('/')[0];
        let Ts = ["default","red","orange","blue","green","gray","blue2"];
        
        let newT = Ts.splice(Ts.indexOf(curT)-1,1);
        let news = `../static/themes/${newT}/css/iuapmobile.um.css`;
        link.setAttribute("href", news);
    }
    render() {
        let _this = this;
        let headerData=this.state.headerData;
        let mode,iconname,title;
        if(JSON.stringify(headerData) != "{}"){
            mode = headerData.data.mode;
            iconname = <Icon type={headerData.data.leftIconName} />;
            title=headerData.data.children;
        }
        return (
            <div className="um-win">
                <div className="um-header">
                    <NavBar
                             rightContent={<div onClick={this.switchThemes} >更改主题</div>}
                    >{this.state.headerData.data.children?this.state.headerData.data.children:"首页"} </NavBar>
                </div>
                <div className="um-content">
                    <WgtPanel data={this.state.allData} metaData={this.state.metaData} changeFn = {this.changeFn}/>
                </div>
                <div className="um-footer">

                </div>
            </div>
        )
    }
}

ReactDOM.render(<WorkSpace/>, document.querySelector("#app"))
