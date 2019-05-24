import React, { Component } from 'react';
import utils from '../utils/Utils';
import { connect } from "react-redux";
import { addToInformList } from "../actions";
import './ModalAdminMenuRow.css';
import axios from "axios";
import I18n from '../utils/I18n';

class ModalAdminMenuRow extends Component{
    constructor(props) {
        super(props)
        this.state = {
            adminEditedLoginValue: '',
            confirmDelete: false,
            startEdit: false
        };
    };

    confirmAdminEditedCredentials = () => {
        let loginValue = this.state.adminEditedLoginValue;
        if (utils.loginValidator(loginValue)){
            if(this.checkLoginAlreadyExists(loginValue)){
                this.loginAlreadyExists(loginValue);
            } else {
                this.encryptNewCredential(loginValue);
            }
        } else {
            this.newCredentialsNotconfirmed();
        }
        this.setState({
            adminEditedLoginValue: '',
        }); 
    };
    
    encryptNewCredential(loginValue) {
        let encryptedLogin = utils.encrypt(loginValue);
       // this.UPDATE DB(encryptedLogin)
    };

    checkLoginAlreadyExists(loginValue) {
        let logins = this.props.users.data.map(data => data.login);
        return logins.includes(loginValue);
    };

    loginAlreadyExists(loginValue) {
        this.props.addToInformList(I18n.get('informList.loginExists') + `: "${loginValue}"`);
    };
    
    newCredentialsNotconfirmed() {
        this.props.addToInformList(I18n.get('informList.wrongCredentials'));
    };

    confirmDeleteUser = (id) => {
        let objIdToDelete = null;
        this.props.users.data.forEach(dat => {
            if (dat.id === Number(id)) {
                objIdToDelete = dat._id;
            }
        });
        if(objIdToDelete === null){
            this.props.addToInformList(I18n.get('informlistAdmin.errorId'));
            return;
        } else { 
            this.deleteFromDB(objIdToDelete);          
        }
    };

    confirmEditUser = (id) => {
        this.setState({startEdit: false});
        this.confirmAdminEditedCredentials();
    }

    confirmDeleteStatus =() => {
        this.setState({confirmDelete: true});
    };

    startEditedStatus = () => {
        this.setState({startEdit: true});
    };

    handleAdminNewLoginChange = (event) => {
        this.setState({adminEditedLoginValue: event.target.value});
        this.setState({isEdited: true});
    };

    deleteFromDB(objIdToDelete) {    
        axios.delete(I18n.get('dataBase.userDelete'), {
            data: {
                id: objIdToDelete
            }
        })   
        .catch(function(error){
            this.props.addToInformList(I18n.get('informlistAdmin.errorDb') + error);
        });
        this.props.addToInformList(I18n.get('informlistAdmin.deleteSuccess'));
        this.setState({confirmDelete: false});
    };

    renderUsersRow() {
        let user = this.props.userData;
        let confirmDeleteButton = null;
        let editLoginColumn = <td className="adminLoginColumn" >{user.login}</td>
        if(this.state.confirmDelete) {
            confirmDeleteButton = <button className="adminDeleteButton" onClick={() => this.confirmDeleteUser(this.props.userData.id)}>confirm</button>
        }
        if(this.state.startEdit) {
            editLoginColumn = 
                <td>
                    <form autoComplete="off" onSubmit={() => this.confirmEditUser(this.props.userData.id)}>
                        <input 
                            className= "loginInput"
                            type="text" name="login" 
                            placeholder={user.login} 
                            value={this.state.adminEditedLoginValue} 
                            onChange={this.handleAdminNewLoginChange}>
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
            <tr className="adminMenuUsersTableTr">
                <td className="adminIdColumn" >{user.id}</td>
                {editLoginColumn}
                <td className="adminPassColumn" >{user.password}</td>
                <td><button className="adminEditButton"  onClick={this.startEditedStatus}>edit</button></td>
                <td className="adminDeleteColumn">
                    <button key={user.id} className="adminDeleteButton" onClick={this.confirmDeleteStatus}>x</button> 
                    {confirmDeleteButton}
                </td>                                   
            </tr>
        );
    };

    render() {
        return(
            this.renderUsersRow()
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
        addToInformList: (info) => dispatch(addToInformList(info))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalAdminMenuRow);