import React, { Component } from 'react';
import './Login.css';
import utils from '../utils/Utils';
import { connect } from "react-redux";
import { usersFetchData, addToInformList, isLogged } from "../actions";
import Modal from '../utils/Modal';
import ModalAddUser from './ModalAddUser';
import SettingsMenu from './SettingsMenu';
import I18n from '../utils/I18n';
import settings from '../assets/settingsIcon.png';

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
            modalAddUserOpen: false,
            wrongInput: false,
            users:[],
            adminLogged: true
        };
    };

    componentDidMount() {
        this.props.fetchData(I18n.get('dataBase.userGet'));
        this.setState({users: this.props.users.data});
    };

    confirmCredentials = (event) => {
        event.preventDefault();
        let loginValue = this.state.loginValue;
        let passValue = this.state.passwordValue;
        if (utils.loginValidator(loginValue) && utils.passwordValidator(passValue)){
            this.confirmLogin(loginValue, passValue)
        } else {
            this.credentialsNotconfirmed();
        }
        this.setState({
            loginValue: '',
            passwordValue: ''
        }); 
    };

    confirmLogin(loginValue, passValue) {
        if(this.props.users.data) {
            let logins = this.props.users.data.map(data => data.login);
            return logins.includes(loginValue) ? this.confirmPassword(loginValue, passValue) : this.credentialsNotconfirmed()
        }
    };

    confirmPassword(loginValue, passValue) {
        let pass = this.props.users.data.map(data => data.password);
        return pass.includes(passValue) ? this.credentialsConfirmed(loginValue) : this.passwordNotConfirmed(loginValue)
    };

    passwordNotConfirmed(loginValue) {
        this.setState({wrongInput: true});
        this.props.addToInformList(I18n.get('informList.wrongPassword') + `${loginValue}`);
    };

    credentialsConfirmed(loginValue) {
        let logged = {login: loginValue, isLogged: true};
        this.props.userLogged(logged);
        this.props.addToInformList(I18n.get('informList.userLogged')+`${loginValue}`);
    };

    credentialsNotconfirmed() {
        this.setState({wrongInput: true});
        this.props.addToInformList(I18n.get('informList.wrongCredentials'));
    };

    changeModalAddUserStatus = (flag) => {
        this.setState({modalAddUserOpen: !flag});
    };

    handleLoginChange = (event) => {
        this.setState({wrongInput: false});
        this.setState({loginValue: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({wrongInput: false});
        this.setState({passwordValue: event.target.value});
    };

    modalAddUserWillOpen = (event) => {
        this.setState({modalAddUserOpen: true});
    };

    logout = () => {
        let logged = {login: null, isLogged: false};
        this.props.userLogged(logged);
        this.props.addToInformList(I18n.get('informList.userLogout'));
    }

    renderLoggedContent() {
        return (
            <div className="loginClass">
                <div className="loginWelcome">Welcome, {this.props.isLogged.login}</div>
                <div className='settingsMenu'>
                    <SettingsMenu adminLogged={true} logout={this.logout}/>
                </div>  
                
                <div className="hrLoginBottom"></div> 
            </div>
        );
    };

renderNotLoggedContent() {
    let inputClassName = '';
    if(this.state.wrongInput){
        inputClassName = 'loginInputWrong';
    } else {
        inputClassName = 'loginInput';
    }
    return (
        <div className="loginClass">
<div className="loginFormClass">
    <form autoComplete="off" onSubmit={this.confirmCredentials}>
        <input className={inputClassName} type="text" name="login" placeholder="login" value={this.state.loginValue} onChange={this.handleLoginChange}></input>
        <br></br>
        <input className={inputClassName} type="text" name="password" placeholder="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}></input>
        <br></br>
        <input className="loginButton" type="submit" value={I18n.get('button.right')}></input>
    </form>
</div>

    <button className='plusButton' onClick={this.modalAddUserWillOpen}>{I18n.get('button.plus')}</button>   
          <div className="hrLoginBottom"></div> 
          <div className="modalDiv">
      <Modal
        modalOpen={this.state.modalAddUserOpen} 
        changeModalStatus={this.changeModalAddUserStatus} 
        modalContent={<ModalAddUser users={this.state.users}/>} 
        modalStyle={modalAddUserStyle}>
        </Modal>
      </div>
      </div>
      
    );
};

renderContent() {
    if(this.props.isLogged.login) {
        return this.renderLoggedContent();
    } else return  this.renderNotLoggedContent();
};

render(){
    return(
        this.renderContent()
    );
}

}

const mapStateToProps = (state) => {
    return {
        users: state.users, // tu do zmiennych ktore beda moimi propsami, przypisuje poczatkowy state z reducerow
        loadingRectangleActive : state.isLoading,
        isLogged: state.isLogged
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url)),
        addToInformList: (info) => dispatch(addToInformList(info)),
        userLogged: (logged) =>dispatch(isLogged(logged))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
