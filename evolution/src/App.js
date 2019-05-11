import React, { Component } from 'react';
import './App.css';
import LoadingRectangle from './utils/LoadingRectangle';
import Login from './login/Login';
import InformLabel from './informLabel/InformLabel';
import { connect } from "react-redux";
import { usersFetchData, addToInformList } from "./actions";
import Board from './board/Board';
import I18n from './utils/I18n';

class App extends Component {
  constructor(props){
    super (props)
    this.state = {
    };
  }

  componentDidMount() {
    let date = new Date();
    this.props.addToInformList(I18n.get('informList.welcome')+ date.toLocaleDateString());
  }

  render() {
    return (
       <div className="App">
        <Login/>
        <Board/>
        <InformLabel/>
        <LoadingRectangle active={this.props.loadingRectangleActive} />
      </div>      
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loadingRectangleActive : state.isLoading
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(usersFetchData(url)),
    addToInformList: (info) => dispatch(addToInformList(info))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);