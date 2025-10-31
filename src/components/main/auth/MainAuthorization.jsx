import React, {Component} from 'react';
import {Button, Chip, Grid, IconButton, TextField} from "@mui/material";
import HistoryPaths from "../../../enums/HistoryPaths";
import {API} from "../../../api/API";
import {withRouter} from "react-router-dom";
import {Facebook, GitHub, Twitter} from "@mui/icons-material";
import OAuthProviderType from "../../../enums/OAuthProviderType";
import HeaderBar from "../HeaderBar";
import {withTranslation} from "react-i18next";

const styles = {
    mainForm : {
        position: 'fixed',
        top: '35%',
        left: '40%',
        width: '20%',
        height: '40%',
    },

}

class MainAuthorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            isButtonDisabled: true,
            chipVisible: 'none',
            redirect: null
        }

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.handleErrorLogin = this.handleErrorLogin.bind(this);
        this.onOauthClick = this.onOauthClick.bind(this);
        this.onSignUpClick = this.onSignUpClick.bind(this);
    }

    handleChangeLogin(e) {
        this.setState({login: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value, isButtonDisabled: this.login === '' });
    }

    onLoginClick() {
        API.signInBasic(this.state.login, this.state.password).then((response) => {
            console.log('response.data: ' + response.data);
            if (response.data) {
                this.props.history.push({pathname: HistoryPaths.Account, state: {profession: response.data}});
            }
        }).catch((err) => {
            this.handleErrorLogin();
        });
    }

    onSignUpClick() {
        let user = {
            email: this.state.login,
            password: this.state.password
        }

        API.signUp(user).then((response) => {
            this.onLoginClick();
        }).catch((err) => {
            this.handleErrorLogin();
        });
    }

    handleErrorLogin() {
        this.setState({login: '', password: '', isButtonDisabled: true, chipVisible: true})
    }

    onOauthClick(oAuthProviderType) {
        window.location.replace(oAuthProviderType.initUrl);
    }

    render() {
        return (
            <Grid container
                  direction={"column"}
                  spacing={2}
                  style={{width: '100%', height: '100%'}}
            >
                <Grid item>
                    <HeaderBar />
                </Grid>
                <Grid item>
                    <Grid container
                          direction={"column"}
                          style={styles.mainForm}>
                        <Chip label={'Incorrect login or password'} variant={'outlined'} style={{display: this.state.chipVisible, color: 'red'}}/>
                        <TextField required label={this.props.t('login')} onChange={this.handleChangeLogin} value={this.state.login}/>
                        <TextField required label={this.props.t('password')} type={"password"} onChange={this.handleChangePassword} value={this.state.password}/>
                        <Grid container direction={'row'} justifyContent={'center'}>
                            <Button variant={"outlined"} onClick={this.onLoginClick} disabled={this.state.isButtonDisabled}>{this.props.t('signIn')}</Button>
                            <Button variant={"outlined"} onClick={this.onSignUpClick} disabled={this.state.isButtonDisabled}>{this.props.t('signUp')}</Button>
                        </Grid>
                        <Grid container direction={'row'} justifyContent={'center'}>
                            <IconButton aria-label="github" color="secondary" onClick={() => this.onOauthClick(OAuthProviderType.GitHub)}>
                                <GitHub />
                            </IconButton>
                            <IconButton aria-label="facebook" color="secondary" onClick={() => this.onOauthClick(OAuthProviderType.Facebook)}>
                                <Facebook />
                            </IconButton>
                            <IconButton aria-label="twitter" color="secondary" onClick={() => this.onOauthClick(OAuthProviderType.Twitter)}>
                                <Twitter />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withTranslation()(withRouter(MainAuthorization));