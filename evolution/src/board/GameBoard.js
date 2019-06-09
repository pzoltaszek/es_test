import React, { Component } from 'react';
import './GameBoard.css';
import { connect } from "react-redux";
import { usersFetchData } from "../actions";
import I18n from '../utils/I18n';


class GameBoard extends Component {
    constructor(props){
        super (props)
        this.state = {
            slideOpen: true,    
      };
    };
  
    slideOpen = () => {
        let tempStatus = this.state.slideOpen;
        this.setState({slideOpen: !tempStatus});
    };
  
    renderSlide(){ 
        if(this.state.slideOpen) {
        return(
            <div className="slide">
                <div className="slideContent1">
                    Global 
                    <button className="slideOpen" onClick={this.slideOpen}>{I18n.get('button.up')}</button>
                </div>
                <div className="slideContent2">aaa aaa aaa <br></br> bbb bbb bbb <br></br> ccc ccc ccc </div>          
            </div>
        );
        } else return (
            <div className="slide">
                <div className="slideContent1">
                    Global 
                    <button className="slideOpen" onClick={this.slideOpen}>&#709;</button>
                </div>
                <div className="slideContent3">aaa aaa aaa <br></br> bbb bbb bbb <br></br> ccc ccc ccc</div>
            </div>
        );
    };

    render() {
        return (
            <div className="GameBoard">
                <div>Pasek lat</div>   
                <div>{this.renderSlide()}</div>
            </div>     
        );
    };
};

const mapStateToProps = (state) => {
    return {
        loadingRectangleActive : state.isLoading,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);