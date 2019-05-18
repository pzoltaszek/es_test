import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props){
        super (props)
        this.state = { 
            modalOpen: props.modalOpen,
        };
      }

    changeModalStatus = () => {
        this.props.changeModalStatus(true);
    }

    renderContent() {
        if(this.props.modalContent) {
            return (
                <div>
                    {this.props.modalContent}
                </div>
            )
        } else return null;   
    };
    
    render() {
        if(this.props.modalOpen){
            return (
                <div className="modal">
                    <div className="modal-content" style={this.props.modalStyle}>
                        <div className="closingSquare">
                            <span className="closeModalX" onClick={this.changeModalStatus}>&times;</span>
                        </div>
                        <div>{this.renderContent()}</div>
                    </div>
                </div>          
            );
        } else return null;
    }
}  
export default Modal;