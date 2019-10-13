import React, { Component } from 'react';
import './YearBar.css'; 

const MAX_AGE  = 4000000000;

class YearBar extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            actualAge: 1000000000,
        }
    };

    plusYears = () => {
        let a = this.state.actualAge + 1000000000
        if (a >= 4000000000) {
            a= 4000000000
        }
        this.setState({actualAge:a})
    }
    

    render() {

        let stripeStyle = {
            width: ((this.state.actualAge/MAX_AGE)*100).toString() +'%',
        };

        return (
            <div>
            <div className='YearBarContent'>
                <div className ='YearBarStripe' style={stripeStyle}>{this.state.actualAge/1000000} &#160;
                </div>
                
            </div>
            <div  className='buttonForward'>
            <button onClick={this.plusYears}>forward</button>
            </div>
            </div>
        );
    }

}
export default YearBar