import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
// import Tab from 'widget/molibox-tabs/index';
import Input from 'widget/molibox-input/index';

import "./index.css"
class ContactsDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
           metaData:[],
           data:[]
        }
        this.initThemes();
    }
    componentWillMount(){
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
        } else {
            summer.on("ready", this.getData);
        }
    }
    initThemes(){
        let defaultThemeesPath = "../static/themes/default/css/iuapmobile.um.css";
        let selThemesPath = localStorage.getItem("selThemes");
        if(selThemesPath){
            defaultThemeesPath = selThemesPath;
        }
        let link = document.querySelector("#themeslink");
        if(link){
            if(selThemesPath){
                link.setAttribute("href", defaultThemeesPath);
            }
        }else{
            let head = document.getElementsByTagName('head')[0];
            let newlink = document.createElement('link');
            newlink.id = "themeslink";
            newlink.href = defaultThemeesPath;
            newlink.rel = 'stylesheet';
            newlink.type = 'text/css';
            head.appendChild(newlink);
        }
    }
    getData = () => {
        //接受参数
        if($summer.os=="ios" || $summer.os=="android"){
            var data_param = summer.pageParam;
            this.setState({
                data_params: data_param
            })
        }
        let _this = this;
        ajax({
            "type": "get",
            "url": "/userlink/getMyTabs",
            // "url": "/rest/user",
            "param":{
                "componentCode":"demo",
                "viewCode":"demo",
                "lang":"CN"
            },
        },function(data){
           if(data.metas){
               let metasFianal=data.metas.demo.properties;
               let listData = data.views.User.records;
               _this.setState({metaData : metasFianal, data : listData});
           }

        },function(res){
            console.log(res);
        });
    }
    closeFn =() => {
        summer.closeComponent({
            componentId: "cardView"
        });
    }
    columnRender=()=>{}
    changeFn = (allD) => {
        this.setState({
            changeData: allD,
            btn_disabled:false
        });
    }
    render() {
        return (
            <div className="um-win">
                <div className="um-header">
                    <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
                    <h3>联系人</h3>
                </div>
                {/* <Tab
                   metaData = {this.state.metaData}
                   data = {this.state.data}
                /> */}
                <Input />
            </div>
        )
    }
}

ReactDOM.render(<ContactsDetails/>, document.querySelector("#app"))
