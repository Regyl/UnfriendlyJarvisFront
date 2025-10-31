import {Component} from "react";
import {Button, Grid, Snackbar, TextField} from "@mui/material";
import HeaderBar from "./HeaderBar";
import {withRouter} from "react-router-dom";
import {API} from "../../api/API";
import {withTranslation} from "react-i18next";
import GlobalVariables from "../../enums/GlobalVariables";
import HistoryPaths from "../../enums/HistoryPaths";
import SkeletonLoading from "./baseElements/SkeletonLoading";

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            countries: [],
            cities: [],
            user: null,
            open: null
        };

        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (!GlobalVariables.authToken) {
            this.props.history.push(HistoryPaths.Auth);
        }

        API.DICTIONARIES.getCatalogRecords('COUNTRY').then((res) => {
            this.setState({
                countries: res.data,
                isLoaded: true
            })
        }).catch((err) => {
            this.setState({
                isLoaded: true,
                error: err
            })
        });

        API.DICTIONARIES.getCatalogRecords('CITY').then((res) => {
            this.setState({
                cities: res.data,
                isLoaded: true
            })
        }).catch((err) => {
            this.setState({
                isLoaded: true,
                error: err
            })
        });

        API.AUTH.getUserData(GlobalVariables.authToken).then((res) => {
            this.setState({
                user: res.data
            })
        })
    }

    onSaveClick() {
        API.AUTH.updateUserData(this.state.user).then((res) => {
            this.setState({
                user: res.data,
                open: true
            })
        })
    }

    handlePropertyChange(index, newVal) {
        const val = newVal.target.value;
        var newUser = this.state.user;
        switch (index) {
            case 0:
                newUser.firstName = val;
                break;
            case 1:
                newUser.middleName = val;
                break;
            case 2:
                newUser.lastName = val;
                break;
            case 3:
                newUser.birthDate = val;
                break;
            case 4:
                newUser.documentSeries = val;
                break;
            case 5:
                newUser.documentNumber = val;
                break;
            case 6:
                newUser.issueDate = val;
                break;
            default:
                console.log('unexpected value: ' + index)
        }

        this.setState({
            user: newUser
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        if (!this.state.user) {
            return <SkeletonLoading />
        } else {
            return (
                <Grid container style={{width: '100%'}} direction={'column'} alignItems={'center'} spacing={3}>
                    <HeaderBar/>
                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        message={this.props.t('dataWereUpdated')}
                    />
                    <Grid item>
                        <TextField label={this.props.t('login')} value={GlobalVariables.authToken} disabled
                                   variant={'outlined'}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('name')} variant={'outlined'} onChange={(event) => this.handlePropertyChange(0, event)} value={this.state.user.firstName}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('middleName')} variant={'outlined'} onChange={(event) => this.handlePropertyChange(1, event)} value={this.state.user.middleName}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('lastName')} variant={'outlined'} onChange={(event) => this.handlePropertyChange(2, event)} value={this.state.user.lastName}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('birthDate')} type={'date'} variant={'outlined'} onChange={(event) => this.handlePropertyChange(3, event)} value={this.state.user.birthDate}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('passportSeries')} type={'number'} variant={'outlined'} onChange={(event) => this.handlePropertyChange(4, event)} value={this.state.user.documentSeries}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('passportNumber')} type={'number'} variant={'outlined'} onChange={(event) => this.handlePropertyChange(5, event)} value={this.state.user.documentNumber}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('issueDate')} type={'date'} variant={'outlined'} onChange={(event) => this.handlePropertyChange(6, event)} value={this.state.user.issueDate}/>
                    </Grid>
                    {/*<Grid item style={{width: '15%'}}>
                        <Autocomplete
                            disablePortal
                            options={this.state.countries}
                            style={{width: '100%'}}
                            getOptionLabel={(option) => option.label || ""}
                            renderInput={(params) => <TextField {...params} label={this.props.t('country')}/>}
                        />
                    </Grid>
                    <Grid item style={{width: '15%'}}>
                        <Autocomplete
                            disablePortal
                            options={this.state.cities}
                            style={{width: '100%'}}
                            getOptionLabel={(option) => option.label || ""}
                            renderInput={(params) => <TextField {...params} label={this.props.t('city')}/>}
                        />
                    </Grid>*/}
                    <Grid item>
                        <Button onClick={this.onSaveClick} variant={"outlined"}>
                            {this.props.t('save')}
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }

}

export default withTranslation()(withRouter(Account));