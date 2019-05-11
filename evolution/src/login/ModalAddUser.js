import React, { Component } from 'react';

class ModalAddUser extends Component{
    constructor(props) {
        super(props)
        this.state = {
            newLoginValue: '',
            newPasswordValue: '',
        };
    }

    handleNewLoginChange = (event) => {
        this.setState({newLoginValue: event.target.value});
    }
    
    handleNewPasswordChange = (event) => {
        this.setState({newPasswordValue: event.target.value});
    }

    confirmAAA = () => {
        let a = this.state.newLoginValue
        alert(a);
    }

    render(){
        return(
            <div className="modalAddUser">
                <h5>Add new user:</h5>
                <form autoComplete="off" >
                    <input className="loginInput" type="text" name="login" placeholder="login" value={this.state.newLoginValue} onChange={this.handleNewLoginChange}></input>
                    <br></br>
                    <input className="loginInput" type="text" name="password" placeholder="password" value={this.state.newPasswordValue} onChange={this.handleNewPasswordChange}></input>
                    <br></br>
                </form>
                <button onClick={this.confirmAAA}>></button>
            </div>
        );
    }
}
export default ModalAddUser;