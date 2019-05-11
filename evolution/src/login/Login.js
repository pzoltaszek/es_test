import React, { Component } from 'react';
import './Login.css';
import utils from '../utils/Utils';
import axios from "axios";
import { connect } from "react-redux";
import { usersFetchData, addToInformList } from "../actions";
import Modal from '../utils/Modal';
import ModalAddUser from './ModalAddUser';
import I18n from '../utils/I18n';

const url = "http://localhost:3001/api/getUser";
const modalAddUserStyle = {
    width: '20%',
    height: '30%'
};

class Login extends Component{
constructor(props) {
    super(props)
    this.state = {
        loginValue: '',
        passwordValue: '',
        modalOpen: false,
    };
}

componentDidMount() {
    this.props.fetchData(url);
}

confirmCredentials = (event) => {
    event.preventDefault();
    let loginValue = this.state.loginValue;
    let passValue = this.state.passwordValue;
    if (utils.loginValidator(loginValue) && utils.passwordValidator(passValue)){
        this.encryptCredential(loginValue, passValue)
    } else {
        this.credentialsNotconfirmed();
    }
    this.setState({
        loginValue: '',
        passwordValue: '',
        idToDelete: null, 
}); 
}

encryptCredential(loginValue, passValue) {
    let encryptedLogin = utils.encrypt(loginValue);
    let encryptedPassword = utils.encrypt(passValue);
    this.props.putDataToDB(encryptedLogin, encryptedPassword)
    alert('added');
}

credentialsNotconfirmed() {
    this.props.addToInformList(I18n.get('informList.wrongCredentials'));
}

changeModalStatus = (flag) => {
    this.setState({modalOpen: !flag});
}

handleLoginChange = (event) => {
    this.setState({loginValue: event.target.value});
}

handlePasswordChange = (event) => {
    this.setState({passwordValue: event.target.value});
}

modalWillOpen = (event) => {
    this.setState({modalOpen: true});
  }

// changeRectangleStatus = () => {
//     let temporaryState = this.state.loadingRectangleActive;
//     this.setState({loadingRectangleActive: !temporaryState});
//     this.props.changeRectangleStatus(temporaryState);
// }

//   renderUsers() {
//     if(this.props.users.data !== undefined){ //to jest dziwne za pierwszym razem render nie ma users,
//     if (this.props.users.data.length >0) { // a za drugim juz pobral
//         return(
//             <ol>
//                 {this.props.users.data.map(a=> 
//                 <li key={a.id}>Id: {a.id} 
//                   Login: {a.login}  
//                   {/* <button onClick={this.deleteUser()}>Delete</button> */}
//                   </li>)}
//             </ol>
//         );
//     }
//     else return <p>aaaa</p>
//   }
// };


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

    .catch(function(error){
                   alert('Error during delete: '+ error);
    });
  }
    this.setState({ idToDelete: null }); 
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
    })
  };

handleDelete = (event) => {
    this.setState({idToDelete: event.target.value});
   // this.deleteFromDB({this.state.idToDelete});
}

renderUsersLength() {
    if(this.props.users.data !== undefined) {
        return <p>{this.props.users.data.length}</p>
    } else return <p>aaaa</p>;
}

render(){
    return(
 <div className="LoginClass">
<div className="LoginFormClass">
    <form autoComplete="off" onSubmit={this.confirmCredentials}>
        <input className="loginInput" type="text" name="login" placeholder="login" value={this.state.loginValue} onChange={this.handleLoginChange}></input>
        <br></br>
        <input className="loginInput" type="text" name="password" placeholder="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}></input>
        <br></br>
        <input className="loginButton" type="submit" value=">"></input>
    </form>
</div>
{/* <input
            type="text"
            style={{ width: "200px" }}
            onChange={this.handleDelete}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button> */}
<div>{this.renderUsersLength()}</div>
    <button className='plusButton' onClick={this.modalWillOpen}>+</button>   
          <div className="hrLoginBottom"></div> 
          <div className="modalDiv">
      <Modal modalOpen={this.state.modalOpen} changeModalStatus={this.changeModalStatus} modalContent={<ModalAddUser/>} modalStyle={modalAddUserStyle}/>
      </div>
      </div>
      
    );
}

}

const mapStateToProps = (state) => {
    return {
        users: state.users, // tu do zmiennych ktore beda moimi propsami, przypisuje poczatkowy state z reducerow
        loadingRectangleActive : state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url)),
        addToInformList: (info) => dispatch(addToInformList(info))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
