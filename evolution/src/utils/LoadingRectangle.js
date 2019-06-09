import React, { Component } from 'react';
import './LoadingRectangle.css';

class LoadingRectangle extends Component {
    constructor(props){
        super (props)
        this.state = {
        };
      }

    render() {
      if (this.props.active) {
        return (
          <div className="loadingRectangleBody">
            <div className="LoadingRectangleDiv">
              <div id="line_b" className="line_h"></div>
              <div id="line_r" className="line_v"></div>
              <div id="line_t" className="line_h"></div> 
              <div id="line_l" className="line_v"></div>
            </div>             
          </div>
        );
      }
      else return null;
    };
  };
  
  export default LoadingRectangle;