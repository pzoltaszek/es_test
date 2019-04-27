import React, { Component } from 'react';
import './App.css';
import LoadingRectangle from './utils/LoadingRectangle';
import Modal from './utils/Modal';
import Login from './login/Login';
import InformLabel from './informLabel/InformLabel';
import Intro from './intro/Intro';
import axios from "axios";
import { connect } from "react-redux";
import { usersFetchData } from "./actions";

const url = "http://localhost:3001/api/getUser";

//const url2= 'http://5826ed963900d612000138bd.mockapi.io/items'

class App extends Component {
  constructor(props){
    super (props)
    this.state = {
      loadingRectangleActive: false,
      idToDelete: null,
      timeoutSet: false,
      modalOpen: false,
      introOpen: false,
    };
  }

  componentDidMount() {
    //setTimeout(this.getUsersList(), 500);
    this.props.fetchData(url);
    //this.props.users.data ? this.setState({ usersList: this.props.users.data }) : this.setState({ usersList: [] });
    // this.getUsersList();
    //  if (!this.state.intervalIsSet) {
      // let timeout = 
      // this.setState({ timeoutSet: timeout });
   // }   
  }

  getUsersList() {
    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ usersList: res.data }))
  }

  deleteFromDB(id) {
    this.setState({modalOpen :true});
    let objIdToDelete = null;
    this.props.users.data.forEach(dat => {
      if (dat.id === Number(id)) {
        objIdToDelete = dat._id;
      }
    });
    if(objIdToDelete === null){
      alert('cannot delete id = null');
      return;
   } else { 
    axios.delete("http://localhost:3001/api/deleteUser", {
      data: {
        id: objIdToDelete
      }
    })
    //.then( this.props.fetchData(url))
    //.then(this.refresh)
    .catch(function(error){
                   alert('Error during delete: '+ error);
    });
   // alert('user with id: '+ id + ' Deleted');
  }
    this.setState({ idToDelete: null });
    //alert('user with id: '+ id + ' Deleted');
   // setTimeout(this.props.fetchData(), 500);
   
  }

  putDataToDB = (login, password) => {
    this.setState({modalOpen :true});
    let currentIds = this.props.users.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
   // alert('id to be added: ' + idToBeAdded)
    axios.post("http://localhost:3001/api/putUser", {
      id: idToBeAdded,
      login: login,
      password: password,
    })//.then(alert('user added'))
    // setTimeout(this.getUsersList(), 1000);
    //  this.getUsersList();
    //.then(this.props.fetchData(url)) 
  };

  refresh = () => {
    alert('refreshed');
    //setTimeout(this.getUsersList(), 500);
    //this.getUsersList();
    this.props.fetchData(url);
  }
  
  changeRectangleStatus = (flag) => {
    this.setState({loadingRectangleActive: !flag});
  }

  changeModalStatus = (flag) => {
    this.setState({modalOpen: !flag});
    this.props.fetchData(url);
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
    if(this.props.users.data !== undefined){ //to jest dziwne za pierwszym razem render nie ma users,
    if (this.props.users.data.length >0) { // a za drugim juz pobral
        return(
            <ol>
                {this.props.users.data.map(a=> 
                <li key={a.id}>Id: {a.id} 
                  Login: {a.login}  
                  {/* <button onClick={this.deleteUser()}>Delete</button> */}
                  </li>)}
            </ol>
        );
    }
    else return <p>aaaa</p>
  }
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
        <button className='startButton'onClick={this.refresh}>REFRESH</button>
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
const mapDispatchToProps = (dispatch) => {
      return {
          fetchData: (url) => dispatch(usersFetchData(url))
      };
}; //{ usersFetched }; // tu sa moje akcje
// export default App;
 export default connect(mapStateToProps, mapDispatchToProps)(App);