import React, { Component } from 'react';
import utils from '../utils/Utils';
import { connect } from "react-redux";
import { addToInformList, isLogged } from "../actions";
import axios from "axios";
import I18n from '../utils/I18n';

class ModalAddUser extends Component{
    constructor(props) {
        super(props)
        this.state = {
            newLoginValue: '',
            newPasswordValue: '',
            wrongInput: false,
            users:[]
        };
    };

    componentDidMount() {
        this.setState({users: this.props.users})
    };

    confirmNewCredentials = (event) => {
        event.preventDefault();
        let loginValue = this.state.newLoginValue;
        let passValue = this.state.newPasswordValue;
        if (utils.loginValidator(loginValue) && utils.passwordValidator(passValue)){
            if(this.checkLoginAlreadyExists(loginValue)){
                this.loginAlreadyExists(loginValue);
            } else {
                this.encryptNewCredential(loginValue, passValue);
            }
        } else {
            this.newCredentialsNotconfirmed();
        }
        this.setState({
            newLoginValue: '',
            newPasswordValue: '',
        }); 
    };
    
    encryptNewCredential(loginValue, passValue) {
        let encryptedLogin = utils.encrypt(loginValue);
        let encryptedPassword = utils.encrypt(passValue);
        this.putDataToDB(encryptedLogin, encryptedPassword)
    };

    checkLoginAlreadyExists(loginValue) {
        let logins = this.state.users.data.map(data => data.login);
        return logins.includes(loginValue);
    };

    loginAlreadyExists(loginValue) {
        this.props.addToInformList(I18n.get('informList.loginExists') + `: "${loginValue}"`);
        this.setState({wrongInput: true});
    };
    
    newCredentialsNotconfirmed() {
        this.props.addToInformList(I18n.get('informList.wrongCredentials'));
        this.setState({wrongInput: true});
    };

    handleNewLoginChange = (event) => {
        this.setState({wrongInput: false});
        this.setState({newLoginValue: event.target.value});        
    };
    
    handleNewPasswordChange = (event) => {
        this.setState({wrongInput: false});
        this.setState({newPasswordValue: event.target.value});  
    };

    putDataToDB = (login, password) => {
        let currentIds = this.state.users.data.map(data => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
        }
        axios.post(I18n.get('dataBase.userPost'), {
          id: idToBeAdded,
          login: login,
          password: password,
        });
        this.props.addToInformList(I18n.get('informList.addUser'));
        let logged = {login: login, isLogged: true};
        this.props.userLogged(logged);
        this.props.changeModalStatus(true);
    };

    renderContent() {
        let inputClassName = '';
        if(this.state.wrongInput){
            inputClassName = 'loginInputWrong';
        } else {
            inputClassName = 'loginInput';
        }
        return (
            <div className="modalAddUser">
                <h5>Add new user:</h5>
                <form autoComplete="off" onSubmit={this.confirmNewCredentials} >
                    <input className={inputClassName} type="text" name="login" placeholder="login" value={this.state.newLoginValue} onChange={this.handleNewLoginChange}></input>
                    <br></br>
                    <input className={inputClassName} type="text" name="password" placeholder="password" value={this.state.newPasswordValue} onChange={this.handleNewPasswordChange}></input>
                    <br></br>
                    <input className="loginButton" type="submit" value={I18n.get('button.right')}></input>
                </form>
            </div>
        );
    };

    render() {
        return(
            this.renderContent()
        );
    };
}

const mapStateToProps = (state) => {
    return {
        users: state.users, //reducers state
        loadingRectangleActive : state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addToInformList: (info) => dispatch(addToInformList(info)),
        userLogged: (logged) =>dispatch(isLogged(logged)) //actions
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddUser);