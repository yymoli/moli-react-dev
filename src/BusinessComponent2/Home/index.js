import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import Card from '../../components/Card/Card';
import List from 'widget/TableList/TableList'

import "./index.css"
class ContactsDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            metaData:{},
            columns:[]
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
        let deviceType=$summer.os.toUpperCase();
        ajax({
            "type": "get",
            //"url": "/userlink/getMyTableList",
            "url": "/moli-demo/rest/uiView",
            "param":{
                "componentCode":"demo",
                "viewCode":"demo",
                "deviceType": "IOS"
            },
        },function(data){
            if(data.metas){
                let metasFianal=data.metas.demo.properties;
                _this.setState({metaData : metasFianal});
            }
            let listData = data.views.User.records;
            var columnsData = [{
                "title": "部门",
                "dataIndex": "departmentName",
                "key": "departmentName",
                "type": "text"
            },{
                "title": "电话",
                "dataIndex": "phone",
                "key": "phone",
                "type": "text"
            }, {
                    "title": "部门编号",
                    "dataIndex": "departmentId",
                    "key": "departmentId",
                    "type": "text"
                },{
                "title": "性别",
                "dataIndex": "sex",
                "key": "sex",
                "type": "text"
            },{
                "title": "姓名",
                "dataIndex": "name",
                "key": "name",
                "type": "text"
            },
                {
                    "title": "ID",
                    "dataIndex": "id",
                    "key": "id",
                    "type": "text"
                },


            ];
            _this.setState({columns:columnsData,data : listData});
        },function(res){
            console.log(res);
        });
    }
    closeFn =() => {
        summer.closeComponent({
            componentId: "cardView"
        });
    }
    changeFn = (allD) => {
        this.setState({
            changeData: allD,
            btn_disabled:false
        });
    }
    render() {
        let content=null;
        if(this.state.data.length==0){
            content= <img src="../static/img/preload.png" alt="" className="loading-img"/>
        }else {
            content=<List data={this.state.data} metaData={this.state.metaData} columns={this.state.columns}  />
        }
        return (
            <div className="um-win">
                <div className="um-header">
                    <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
                    <h3>联系人</h3>
                </div>

                <div className="um-content"  id="umcontent" >
                    {content}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<ContactsDetails/>, document.querySelector("#app"))
