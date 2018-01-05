import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import { Row, Col } from '../molibox-layout/index';
import './index.css'

const defaultProps = {
    metaData: {},
    data: {},
    changeFn(){},
};

class Card extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    handleChange = (e, key) => {
        const {data,changeFn} = this.props;
        data[key] = e.target.value;
        changeFn(data);
    }

    processMetaData = (key, val) => {
        const {metaData} = this.props;
        if (metaData.card && metaData.card.properties && metaData.card.properties[key] && metaData.card.properties[key][val]) {
            return metaData.card.properties[key][val];
        } else {
            return null;
        }
    }

    renderCard = () => {
        let _this = this;
        let list = [];
        const {data} = this.props;
        for (let item in data) {
            list.push(
                <Col lg={4} md={4} sm={6} xs={12}>
                    <div className="um-list-item-inner um-box">
                        <div className="um-list-item-left">
                            {this.processMetaData(item, 'title')}
                        </div>
                        <div className="um-list-item-right um-bf1">
                            <input
                                type="text"
                                className="form-control"
                                value={data[item]}
                                onChange={ (e) =>{this.handleChange(e,item)} }
                                disabled={ this.processMetaData(item,'disabled') }
                                style={ this.processMetaData(item,'style') }
                            />
                        </div>
                    </div>
                </Col>
            );
        }
        return list;
    }

    render() {
        return (
            <div className="mt20">
                <Row>
                    {this.renderCard()}
                </Row>
            </div>
        )
    }
}
Card.defaultProps = defaultProps;
export default Card ; 