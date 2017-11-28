import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Table from 'bee-table';
import "bee-table/build/Table.css"
class ContentList extends Component {
    render() {
        let _this = this;
        let data = _this.props.data;
        let metaData = _this.props.metaData;
        let columnData=[];
        for(let k in data[0]){
            columnData.push({
                "title":"",
                "key":k,
                "dataIndex":k,
                 "render":null
            })
        }
        columnData = columnData.filter((e) => {
           return e.dataIndex !== "avatar";
        });
        columnData.map((e,i) => {
           if(metaData[columnData[i].dataIndex]){
               metaData[columnData[i].dataIndex].name ?
               columnData[i].title = metaData[columnData[i].key].name :
               "";
               if(metaData[columnData[i].dataIndex].style){
                  let bodyStyle = metaData[columnData[i].dataIndex].style;
                  columnData[i].render = (text) => {
                     return <span style={eval('(' + bodyStyle + ')')}>{text}</span>
                  }
               }
               if(metaData[columnData[i].dataIndex].display=="none"){
                   columnData.splice(i,1);
                   --i;
               }
           }
        });
        return (
            <div className="list um-content">
                <Table
                    columns={columnData}
                    data={data}
                />
            </div>
        );
    }
};
ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default ContentList;
