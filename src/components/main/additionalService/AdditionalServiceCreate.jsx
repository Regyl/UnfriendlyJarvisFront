import React from "react";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {Button, Grid, TextField} from "@material-ui/core";
import {API} from "../../../api/API";
import SkeletonLoading from "../baseElements/SkeletonLoading";
import HeaderBar from "../HeaderBar";
import {Autocomplete} from "@material-ui/lab";
import HistoryPaths from "../../../enums/HistoryPaths";


class AdditionalServiceCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceList: [],
            error: null,
            isLoaded: false,
            companies: [],
            cities: [],

            chosenCompany: null,
            title: null,
            description: null,
            cost: null
        }

        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handlePropertyChange = this.handlePropertyChange.bind(this);
    }

    componentDidMount() {

        API.CORE.getCompanies().then((res) => {
            this.setState({
                isLoaded: true,
                companies: res.data
            })
        }).catch((err) => {
            this.setState({
                isLoaded: true,
                error: err
            })
        })

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
    }

    onSaveClick() {
        const dto = {
            title: this.state.title,
            company: this.state.chosenCompany,
            cost: this.state.cost,
            description: this.state.description
        }
        API.CORE.saveAdditService(dto).then((res) => {
            this.props.history.push(HistoryPaths.AdditServiceSearch)
        })
    }

    handleCompanyChange(company) {
        this.setState({
            chosenCompany: company
        })
    }

    handlePropertyChange(index, newVal) {
        const val = newVal.target.value;
        switch (index) {
            case 0:
                this.setState({
                    title: val
                })
                break;
            case 1:
                this.setState({
                    description: val
                })
                break;
            case 2:
                this.setState({
                    cost: val
                })
                break;
            default:
                console.log('unexpected value: ' + index)
        }
    }


    render() {
        if (!this.state.isLoaded) {
            return <SkeletonLoading />
        } else {
            return (
                <Grid container style={{width: '100%'}} direction={'column'} alignItems={'center'} spacing={3}>
                    <HeaderBar/>
                    <Grid item>
                        <TextField label={this.props.t('title')} variant={'outlined'} value={this.state.title} onChange={(event) => this.handlePropertyChange(0, event)}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('description')} variant={'outlined'} value={this.state.description} onChange={(newVal) => this.handlePropertyChange(1, newVal)}/>
                    </Grid>
                    <Grid item>
                        <TextField label={this.props.t('cost')} type={'number'} variant={'outlined'} value={this.state.cost} onChange={(newVal) => this.handlePropertyChange(2, newVal)}/>
                    </Grid>
                    <Grid item style={{width: '20%'}}>
                        <Autocomplete
                            disablePortal
                            options={this.state.companies}
                            style={{width: '100%'}}
                            getOptionLabel={(option) => option.label || ""}
                            onChange={(event, value) => this.handleCompanyChange(value)}
                            renderInput={(params) => <TextField {...params} label={this.props.t('ownerCompany')}/>}
                        />
                    </Grid>
                    <Grid item style={{width: '20%'}}>
                        <Autocomplete
                            disablePortal
                            options={this.state.cities}
                            style={{width: '100%'}}
                            getOptionLabel={(option) => option.label || ""}
                            renderInput={(params) => <TextField {...params} label={this.props.t('city')}/>}
                        />
                    </Grid>
                    <Grid item style={{width: '20%'}}>
                        <Button onClick={this.onSaveClick} variant={"outlined"} style={{width: '100%'}}>
                            {this.props.t('save')}
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default withTranslation()(withRouter(AdditionalServiceCreate));