import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import Aside from '../components/aside/index.js';
import NavBar from '../components/navBar/index.js';
import ChatView from '../components/chatView/index.js';
import TextArea from '../components/textArea/index.js';
import "./index.css"
class Chat extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="chatWin">
               <NavBar />
               <div className="chatCon">
                  <div className="chatCon-l">
                     <Aside />
                  </div>
                  <div className="chatCon-r">
                     <div className="chatCon-view">
                        <ChatView />
                     </div>
                     <div className="chatCon-input">
                        <TextArea />
                     </div>
                  </div>
               </div>
            </div>
        )
    }
}

ReactDOM.render(<Chat/>, document.querySelector("#app"))
