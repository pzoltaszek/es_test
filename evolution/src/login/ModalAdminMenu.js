import React, { Component } from 'react';
import { connect } from "react-redux";
import { usersFetchData, addToInformList } from "../actions";
import './ModalAdminMenu.css';
import I18n from '../utils/I18n';
import ModalAdminMenuRow from './ModalAdminMenuRow';

class ModalAdminMenu extends Component{
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

    refresh = () => {
        this.props.fetchData(I18n.get('dataBase.userGet')); 
        this.props.addToInformList(I18n.get('informlistAdmin.usersListRefreshed'))
    };

    renderContent() {
        return (
            <table className="adminMenuUsersTable">
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
                {this.props.users.data.slice(1, this.props.users.data.length).map(data=>
                    <ModalAdminMenuRow 
                        key={data.id}
                        userData = {data}>
                    </ModalAdminMenuRow>)}  
                    <tr>
                        <td>
                            <button onClick={this.refresh}>{I18n.get('button.refresh')}</button>
                        </td>         
                    </tr>
                </tbody>               
            </table>
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
        fetchData: (url) => dispatch(usersFetchData(url)), //actions
        addToInformList: (info) => dispatch(addToInformList(info))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalAdminMenu);