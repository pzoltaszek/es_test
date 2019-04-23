import React, { Component } from 'react';
import './Intro.css';

// var style = {
//     dispaly: 'flex'
// }

class Intro extends Component {
    constructor(props){
        super (props)
        this.state = { 
            introOpen: props.introOpen,
        };
      }

    closeIntro = () => {
    this.props.closeIntro(true);
    }

      render() {
        if(this.props.introOpen){
        return (
    <div>
        <div id="myModal" className="intro">
        
        </div>
        <div className="intro-content">
        <span className="close" onClick={this.closeIntro}>&times;</span>
            <p>Intro content</p>
        </div>
        <div className="intro-content2">
            <p>Intro content2</p>
        </div>
        <div className="intro-content3">
            <p>Intro content3</p>
        </div>
    </div>   
        );
    } else return null;
      }
    }
    
export default Intro;