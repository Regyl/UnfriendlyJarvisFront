import React, {Component} from "react";
import {
    AppBar,
    Breadcrumbs,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Link,
    Menu,
    MenuItem,
    Select,
    Toolbar,
    Typography
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {API} from "../../api/API";
import HistoryPaths from "../../enums/HistoryPaths";
import {withRouter} from "react-router-dom";
import GlobalVariables from "../../enums/GlobalVariables";
import {withTranslation} from "react-i18next";


class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            lang: 'ru'
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAccountClick = this.handleAccountClick.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleAdditionalServiceClick = this.handleAdditionalServiceClick.bind(this);
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleLogout() {
        API.logout().then(this.props.history.push(HistoryPaths.Home));
        this.handleClose();
    }

    handleAccountClick() {
        this.props.history.push({pathname: HistoryPaths.Account});
        this.handleClose();
    }

    handleAdditionalServiceClick() {
        this.props.history.push({pathname: HistoryPaths.AdditServiceSearch});
        this.handleClose();
    }

    handleLanguageChange(event) {
        const targetLang = event.target.value;
        this.props.i18n.changeLanguage(targetLang)
        this.setState({
            lang: targetLang
        })
    }

    render() {
        return(
            <Grid item style={{width: '100%', height: '100%'}}>
                <AppBar position="static" style={{backgroundColor: GlobalVariables.basicColor}}>
                    <Toolbar>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/">
                                        {GlobalVariables.name}
                                    </Link>
                                    <Typography color="text.primary">Основной</Typography>
                                    {/*<Typography color="text.primary">Breadcrumbs</Typography>*/}
                                </Breadcrumbs>
                            </Grid>
                            <Grid item xs={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{this.props.t('lang')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={this.state.lang}
                                        label={this.props.t('lang')}
                                        onChange={this.handleLanguageChange}
                                    >
                                        <MenuItem value={'ru'}>RU</MenuItem>
                                        <MenuItem value={'en'}>EN</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <IconButton
                            size="medium"
                            color="inherit"
                            onClick={this.handleMenu}
                            style={{marginLeft: 'auto'}}>
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}>
                            <MenuItem onClick={this.handleAccountClick}>{this.props.t('myAccount')}</MenuItem>
                            <MenuItem onClick={this.handleLogout}>{this.props.t('signOut')}</MenuItem>
                            <MenuItem onClick={this.handleAdditionalServiceClick}>{this.props.t('additService')}</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Grid>
        );
    }

}

export default withTranslation()(withRouter(HeaderBar));