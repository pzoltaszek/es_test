import React, { Component } from 'react';
import './Modal.css';

var style = {
    dispaly: 'flex'
}

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
    
      render() {
        if(this.props.modalOpen){
        return (
            
           <div id="myModal" className="modal" style={style}>
{/* Modalcontent: */}
<div className="modal-content">
  <span className="close" onClick={this.changeModalStatus}>&times;</span>
  <p>Some text in the Modal..</p>
</div>

</div>
          
           
        );
    } else return null;
      }
    }
    
export default Modal;