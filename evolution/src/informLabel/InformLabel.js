import React from 'react';
import './InformLabel.css';
import { connect } from "react-redux";
import { addToInformList } from '../actions';
import I18n from '../utils/I18n';

const style = {
    fontSize: '0.8em',
    color: 'black',
};

class InformLabel extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            informList: [],
            informListSlideOpen: false
        };
    }

    informListSlideopen = () => {
        let tempStatus = this.state.informListSlideOpen;
        this.setState({informListSlideOpen: !tempStatus});
    }

    renderList(classForInformDiv) {
        let list = this.props.informList;
        if (!list || list.length < 0) {
            return null;
        }
        if(list.length > 5) {
            list = list.slice(list.length-5, list.length+1);   
        }
        return(
            <div className={classForInformDiv} style={style}>
                <ul>
                    {list.map(a=> <li key={a.id}>{a.text}</li>)}
                </ul>
            </div>
        );
    };


    renderLastElement() {    
        let length = this.props.informList.length;
        if (length > 0) {
            let last = this.props.informList[length-1];
            return (   
                <div key={last.id} className="lastElement"> {last.text}</div>
            );
        } else return null;
    }

    renderInformList() {
        let classForInformDiv ='';
        if (this.state.informListSlideOpen) {
            classForInformDiv = "informListSlideOpen";
            return(
                <div>
                    {this.renderList(classForInformDiv)}
                    <div className="informLabelslideContent">
                        <button className="informLabelslideOpen" onClick={this.informListSlideopen}>&#709;</button>
                        {this.renderLastElement()}
                    </div>
                </div>
            ) 
        } else {
            classForInformDiv = "informListSlideHide";
            return (
                <div>
                    {this.renderList(classForInformDiv)}
                    <div className="informLabelslideContent">
                        <button className="informLabelslideOpen" onClick={this.informListSlideopen}>{I18n.get('button.up')}</button>
                        {this.renderLastElement()}
                    </div>
                </div>
            )
        }
    };

    render(){
        return(      
            <div className="informLabelMain">{this.renderInformList()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        informList: state.addToInformList //reducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToInformList: (info) => dispatch(addToInformList(info)) //akcja
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(InformLabel);