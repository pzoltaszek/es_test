import React, { Component } from 'react';
import './App.css';
import LoadingRectangle from './utils/LoadingRectangle';
import Modal from './utils/Modal';
import Login from './login/Login';
import InformLabel from './informLabel/InformLabel';
import Intro from './intro/Intro';
import axios from "axios";
import { connect } from "react-redux";
import { usersFetched } from "./actions";

class App extends Component {
  constructor(props){
    super (props)
    this.state = {
      loadingRectangleActive: false,
      usersList: [],
      idToDelete: null,
      timeoutSet: false,
      modalOpen: false,
      introOpen: false,
    };
  }

  componentDidMount() {
     this.getUsersList();
    //  if (!this.state.intervalIsSet) {
      // let timeout = setTimeout(this.getUsersList(), 500);
      // this.setState({ timeoutSet: timeout });
   // }   
  }

  getUsersList() {
    fetch("api/getUser?cache="+Math.random()*1000000) 
      .then(res => res.json())
      .then(res => this.setState({ usersList: res.data }))
  }

  deleteFromDB(id) {
    let objIdToDelete = null;
    this.state.usersList.forEach(dat => {
      if (dat.id === Number(id)) {
        objIdToDelete = dat._id;
      }
    });
    if(objIdToDelete === null){
      alert('cannot delete id = null');
      return;
    } else { 
    axios.delete("/api/deleteUser", {
      data: {
        id: objIdToDelete
      }
    })
    .catch(function(error){
                   alert('Error during delete: '+ error);
    });
  }
    this.setState({ idToDelete: null });
    alert('user with id: '+ id + ' Deleted');
     setTimeout(this.getUsersList(), 500);
     this.getUsersList();
  }

  putDataToDB = (login, password) => {
    let currentIds = this.state.usersList.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    axios.post("/api/putUser?cache="+Math.random()*1000000, {
      id: idToBeAdded,
      login: login,
      password: password,
    }).then(alert('user added'));
    setTimeout(this.getUsersList(), 1000);
    // this.getUsersList();
  };
  
  changeRectangleStatus = (flag) => {
    this.setState({loadingRectangleActive: !flag});
  }

  changeModalStatus = (flag) => {
    this.setState({modalOpen: !flag});
  }

  closeIntro = (flag) => {
    this.setState({introOpen: !flag});
  }

  handleDelete = (event) => {
    this.setState({idToDelete: event.target.value});
   // this.deleteFromDB({this.state.idToDelete});
}

modalWillOpen = (event) => {
  this.setState({modalOpen: true});
}

introWillOpen = (event) => {
  this.setState({introOpen: true});
}

  renderUsers() {
    if (this.state.usersList.length >0) {
        return(
            <ol>
                {this.state.usersList.map(a=> 
                <li key={a.id}>Id: {a.id} Login: {a.login}  
                  {/* <button onClick={this.deleteUser()}>Delete</button> */}
                  </li>)}
            </ol>
        );
    }
    else return <p></p>
};



  render() {
    return (
       <div className="App">
          <Login loadingRectangleActive = {this.state.loadingRectangleActive} changeRectangleStatus={this.changeRectangleStatus} putDataToDB={this.putDataToDB}/>
          <p>{this.state.wynik}</p>
          <p>{this.state.wynik2}</p>
          {/* <button className='plus'onClick={this.changeRectangel}>+</button> */}
          <br></br>
        <header className="header">
        <button className='startButton' onClick={this.modalWillOpen}>MODAL</button>
        <br></br>
        <button className='startButton' onClick={this.introWillOpen}>START</button>
          <LoadingRectangle active={this.state.loadingRectangleActive} />
        </header>   
        <div>
          <h3>Users:</h3>
          <div> {this.renderUsers()}</div>
          <p>sdfdsfdsf ssdadada asdadasdad asdadasd asdadada adadasd adadasdasdads adsad adsa dasdasdads ads addasdadas adadada </p>
          </div> 
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={this.handleDelete}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
          <Modal modalOpen={this.state.modalOpen} changeModalStatus={this.changeModalStatus}/>
          <Intro introOpen={this.state.introOpen} closeIntro={this.closeIntro}/>
        <InformLabel/>
      </div>
      
    );
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users, // tu do zmiennych ktore beda moimi propsami, przypisuje poczatkowy state z reducerow
  }
};
const mapDispatchToProps = { usersFetched }; // tu sa moje akcje
export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);