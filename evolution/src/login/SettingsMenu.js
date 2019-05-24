import React, { Component } from 'react';
import './SettingsMenu.css';
import Modal from '../utils/Modal';
import ModalAdminMenu from './ModalAdminMenu';
import I18n from '../utils/I18n';
import settingsIcon from '../assets/settingsIcon.png';

const modalAdminMenuStyle = {
    width: '70%',
    height: '50%'
};

class SettingsMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            modalAdminMenuOpen: false
        };
    };

    settingsWillSlide = () => {
        // let tempStatus = this.state.slideSettingsOpen;
        this.setState({slideSettingsOpen: true});
    };

    settingsWillUnslide = () => {
        this.setState({slideSettingsOpen: false});
    };

    modalAdminMenuWillOpen = (event) => {
        this.setState({modalAdminMenuOpen: true});
        this.settingsWillUnslide();
    };

    changeModalAdminMenuStatus = (flag) => {
        this.setState({modalAdminMenuOpen: !flag});
    };

    renderSettingsContent() {
        let adminMenu = null;
        let slideSettingsHidden ='slideSettingsContent3';
        if(this.props.adminLogged) {
            adminMenu = <li key="2" className="SettingsList" onClick={this.modalAdminMenuWillOpen}>{I18n.get('commonText.adminMenu')}</li>;
        }
        if(this.state.slideSettingsOpen){
            slideSettingsHidden ='slideSettingsContent2';
        }
        return(
            <div className="slideSettings" onMouseEnter={this.settingsWillSlide} onMouseLeave={this.settingsWillUnslide}>
                <div className="slideSettingsContent1">
                    <button className='settingsButton'>
                        <img alt='!' src={settingsIcon} height="13" width="13"/>
                    </button>
                    <div className={slideSettingsHidden}>
                        <ul>
                            <li key="1" className="SettingsList">{I18n.get('commonText.editProfile')}</li>
                            {adminMenu}
                            <li key="3" className="SettingsList" onClick={this.props.logout}>{I18n.get('commonText.logout')}</li>
                        </ul>
                    </div>  
                </div>
                <div className="modalDiv">
                    <Modal
                        modalOpen={this.state.modalAdminMenuOpen} 
                        changeModalStatus={this.changeModalAdminMenuStatus} 
                        modalContent={<ModalAdminMenu users={this.state.users}/>} 
                        modalStyle={modalAdminMenuStyle}>
                    </Modal>
                </div>                  
            </div>
            );   
    }

    render(){
        return(
            this.renderSettingsContent()
        );
    }
}; 

export default SettingsMenu;