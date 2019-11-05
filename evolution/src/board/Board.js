import React, { Component } from 'react';
import './Board.css';
import Intro from '../intro/Intro';
import GameBoard from './GameBoard';
import { connect } from "react-redux";
import { usersFetchData } from "../actions";
import I18n from '../utils/I18n';

class Board extends Component {
    constructor(props){
        super (props)
        this.state = {
            isUserLogged: false,
            introOpen: false,
            gameBoardActive: true,    // mozna modyfikowac default: false
            introButton: true,
      };
    };

    introWillOpen = (event) => {
        this.setState({introOpen: true});
    };

    closeIntro = (flag) => {
        this.setState({introOpen: !flag});
    };

    startGame = () => {
        this.closeIntro(true);
        this.setState({
            introButton: false,
            gameBoardActive: true})
    };

    renderWhenlogged() {
        if (this.state.gameBoardActive){
            return (
                <GameBoard/>
            )
        } else {
            let introButton = null;
            if(this.state.introButton) {
                introButton = <button className='startButton' hint="main tooltip" onClick={this.introWillOpen}>{I18n.get('button.start')}</button>
            }
            return (
                <div className="Board">
                    <div className="Boardheader">
                        <br></br>
                        {introButton}
                    </div>
                    <Intro introOpen={this.state.introOpen} closeIntro={this.closeIntro} startGame={this.startGame}/>
                </div>
            );
        }

    };

    render() {
        if(this.props.isLogged.isLogged){
            return (
                this.renderWhenlogged()
            );
        } else {
            return null;
        }
    };
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        loadingRectangleActive : state.isLoading,
        isLogged: state.isLogged
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Board);
