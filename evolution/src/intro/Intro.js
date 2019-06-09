import React, { Component } from 'react';
import './Intro.css';
import I18n from '../utils/I18n';
import bigBang from '../assets/bigBang.png';
import atomIcon from '../assets/atomIcon.png';
import lifeIcon from '../assets/lifeIcon.png';

class Intro extends Component {
    constructor(props){
        super (props)
        this.state = { 
            introOpen: props.introOpen,
        };
    };

    closeIntro = () => {
        this.props.closeIntro(true);
    };

    startGame = () => {
        this.props.startGame();
    }

    render() {
        if(this.props.introOpen){
        return (
            <div className="intro">
                <div className="intro-content">
                    <div className="intro-content1">
                        <p>{I18n.get('intro.window1')}</p>
                        <div className="intro-content1-img"><img alt='!' src={bigBang} height="100%" width="100%"/></div>
                    </div>
                    <div className="intro-content2">
                        <p>{I18n.get('intro.window2')}</p>
                        <div className="intro-content2-img"><img alt='!' src={atomIcon} height="100%" width="100%"/></div>
                    </div>
                    <div className="intro-content3">
                        <p>{I18n.get('intro.window3')}</p>
                    </div>
                    <div className="intro-content4">
                        <p>{I18n.get('intro.window4')}</p>
                        <div className="intro-content4-img"><img alt='!' src={lifeIcon} height="100%" width="100%"/></div>
                    </div>
                    <span className="close" onClick={this.closeIntro}>&times;</span>
                    <button className="intro-continue-button" onClick={this.startGame}>{I18n.get('button.continue')}</button>
                </div>
            </div>   
        );
        } else return null;
    };
};
    
export default Intro;