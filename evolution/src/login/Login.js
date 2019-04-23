import React, { Component } from 'react';
import './Login.css';
import utils from '../utils/Utils';


class Login extends Component{
constructor(props) {
    super(props)
    this.state = {
        usersList: null,
        loginValue: '',
        passwordValue: '',
        loadingRectangleActive: props.loadingRectangleActive,
    };
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
}); 
}

encryptCredential(loginValue, passValue) {
    let encryptedLogin = utils.encrypt(loginValue);
    let encryptedPassword = utils.encrypt(passValue);
    this.props.putDataToDB(encryptedLogin, encryptedPassword);
}

credentialsNotconfirmed() {
    alert('zle dane');
}

handleLoginChange = (event) => {
    this.setState({loginValue: event.target.value});
}

handlePasswordChange = (event) => {
    this.setState({passwordValue: event.target.value});
}

changeRectangleStatus = () => {
    let temporaryState = this.state.loadingRectangleActive;
    this.setState({loadingRectangleActive: !temporaryState});
    this.props.changeRectangleStatus(temporaryState);

}

render(){
    return(
 <div className="LoginClass">
<div className="LoginFormClass">
    <form onSubmit={this.confirmCredentials}>
        <input className="loginInput" type="text" name="login" placeholder="login" value={this.state.loginValue} onChange={this.handleLoginChange}></input>
        <br></br>
        <input className="loginInput" type="text" name="password" placeholder="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}></input>
        <br></br>
        <input className="loginButton" type="submit" value=">"></input>
    </form>
</div>
    <button className='plusButton'onClick={this.changeRectangleStatus}>+</button>   
          <div className="hrLoginBottom"></div> 
      </div>
    );
}

}
export default Login;