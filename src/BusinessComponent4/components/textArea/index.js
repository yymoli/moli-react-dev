import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import "./index.css"
class TextArea extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="chatTextArea">

            </div>
        )
    }
}

export default TextArea;
