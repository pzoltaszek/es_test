import React, { Component } from 'react';
import { connect } from "react-redux";
import { usersFetchData, addToInformList, isLogged } from "../actions";
import './ModalUserEdit.css';
import I18n from '../utils/I18n';
import axios from "axios";

class ModalUserEdit extends Component{
    constructor(props) {
        super(props)
        this.state = {
            wrongInput: false,
            confirmDelete: false,
            confirmDeleteTime: 3,
            startEdit: false,
            userEditedPassValue: '',
            isEdited: false,
            user: null,
        };
    };

    componentWillMount() {
        let logged = this.props.isLogged;
        let user = this.props.users.data.filter(u => u.login === logged.login);
        this.setState({user: user[0]});
    };

    logout() {
        let logged = {login: null, isLogged: false};
        this.props.userLogged(logged);
        this.props.fetchData(I18n.get('dataBase.userGet')); 
    };

    saveUserEdit = (id) => {
        let passValue = this.state.userEditedPassValue;
        let objIdToUpdate = id;
        this.setState({userEditedPassValue: ''});
        this.updateDB(passValue, objIdToUpdate);
    };

    confirmDeleteStatus() {
        this.setState({confirmDelete: true});
        this.intervalDeleteTimer = setInterval(() => this.confirmDeleteTimer(),1000);
    };

    confirmDeleteTimer() {
        if (this.state.confirmDeleteTime <= 0) {
            clearInterval(this.intervalDeleteTimer);
            this.setState({
                confirmDeleteTime: 3,
                confirmDelete: false
            });
        }else {
            this.setState(state => ({confirmDeleteTime: state.confirmDeleteTime -1}));
        }    
    };

    confirmDeleteUser = (id) => {
        let objIdToDelete = id;
        if(objIdToDelete === null){
            this.props.addToInformList(I18n.get('informList.errorDb'));
            return;
        } else { 
            this.deleteFromDB(objIdToDelete);          
        }
    };

    deleteFromDB(objIdToDelete) {    
        axios.delete(I18n.get('dataBase.userDelete'), {
            data: {
                id: objIdToDelete
            }
        })   
        .catch(function(){
            this.props.addToInformList(I18n.get('informList.errorDb'));
        });
        this.props.addToInformList(I18n.get('informList.deleteSuccess'));
        this.setState({confirmDelete: false});
        this.logout();
    };

    startEditedStatus = () => {
        this.setState({startEdit: true});
    };

    confirmEditUser = (id) => {
        this.setState({startEdit: false});
        this.saveUserEdit(id);
    };

    handleUserNewPassChange = (event) => {
        this.setState({userEditedPassValue: event.target.value});
    };

    updateDB(passValue, objIdToUpdate) {
        axios.post(I18n.get('dataBase.userUpdate'), {
            id: objIdToUpdate,
            update: { password: passValue },
        })
        .catch(function(){
            this.props.addToInformList(I18n.get('informList.errorDb'));
        });
        this.props.addToInformList(I18n.get('informList.userEditPass'));
        this.logout();
    };

    renderContent() {
        return (
            <table className="userTable">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>login</th>
                        <th>pass</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>   
                    {this.renderUserRow()}          
                </tbody>               
            </table>
        );
    };


    renderUserRow() {
        //let user = this.props.userData;
        let confirmDeleteButton = null;
        let editPasswordColumn = <td className="userPasswordColumn" >{this.state.user.password}</td>
        if(this.state.confirmDelete) {
            confirmDeleteButton = <button className="userEditButton" onClick={() => this.confirmDeleteUser(this.state.user._id)}>confirm {this.state.confirmDeleteTime}</button>
        }
        if(this.state.startEdit) {
            editPasswordColumn = 
                <td>
                    <form autoComplete="off" onSubmit={() => this.confirmEditUser(this.state.user._id)}>
                        <input 
                            className= "loginInput"
                            type="text" 
                            placeholder={this.state.user.password}
                            value={this.state.userEditedPassValue} 
                            onChange={this.handleUserNewPassChange}>
                        </input>
                        <input
                        className= "loginButton"
                            type= "submit"
                            value= "ok">
                        </input>
                    </form>
                </td>
        }       
        return (      
            <tr className="userTableTr">
                <td className="userIdColumn" >{this.state.user.id}</td>
                <td className="userLoginColumn" >{this.state.user.login}</td>
                {editPasswordColumn}              
                <td><button className="userEditButton"  onClick={this.startEditedStatus}>edit</button></td>
                <td className="userDeleteColumn">
                    <button key='{user.id}' className="userEditButton" onClick={() => this.confirmDeleteStatus()}>x</button> 
                    {confirmDeleteButton}
                </td>                                   
            </tr>
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
        loadingRectangleActive : state.isLoading,
        isLogged: state.isLogged
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(usersFetchData(url)), //actions
        addToInformList: (info) => dispatch(addToInformList(info)),
        userLogged: (logged) =>dispatch(isLogged(logged))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalUserEdit);