import React, { Component } from 'react';
import './Board.css';
import Intro from '../intro/Intro';
import { connect } from "react-redux";
import { usersFetchData } from "../actions";
import I18n from '../utils/I18n';

class Board extends Component {
    constructor(props){
        super (props)
        this.state = {
            isUserLogged: false,
            introOpen: false,
            slideOpen: true,       
      };
    }
   
    introWillOpen = (event) => {
        this.setState({introOpen: true});
    }

    closeIntro = (flag) => {
        this.setState({introOpen: !flag});
    }
  
    slideOpen = () => {
        let tempStatus = this.state.slideOpen;
        this.setState({slideOpen: !tempStatus});
    }
  
    renderSlide(){ 
    if(this.state.slideOpen) {
      return(
    <div className="slide">
            <div className="slideContent1">Global <button className="slideOpen" onClick={this.slideOpen}>{I18n.get('button.up')}</button></div>
                <div className="slideContent2">aaa aaa aaa <br></br> bbb bbb bbb <br></br> ccc ccc ccc </div>          
            </div>
      );
    }  else return (
    <div className="slide">
            <div className="slideContent1">Global <button className="slideOpen" onClick={this.slideOpen}>&#709;</button></div>
                <div className="slideContent3">aaa aaa aaa <br></br> bbb bbb bbb <br></br> ccc ccc ccc
                 </div>
            </div>
    );
    }

    render() {
        return (
        <div className="Board">
            <div className="Boardheader">
                <br></br>
                <button className='startButton' hint="main tooltip" onClick={this.introWillOpen}>{I18n.get('button.start')}</button>
            </div>   
            <div>{this.renderSlide()}</div>
            <Intro introOpen={this.state.introOpen} closeIntro={this.closeIntro}/>
        </div>     
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        loadingRectangleActive : state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Board);