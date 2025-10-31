import * as React from 'react';
import {Component} from 'react';
import DefaultStepper from "../baseElements/Stepper";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import DefaultDatePicker from "../baseElements/DefaultDatePicker";
import {withRouter} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {API} from "../../../api/API";
import {Autocomplete} from "@mui/lab";
import {withTranslation} from "react-i18next";
import SkeletonLoading from "../baseElements/SkeletonLoading";
import PaymentPhoto from "../../../img/img.png";
import HistoryPaths from "../../../enums/HistoryPaths";
import GlobalVariables from "../../../enums/GlobalVariables";

class TourChoosingTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            skippedSteps: [],
            dateFrom: '2024-06-12',
            dateTo: null,
            cityFrom: null,
            cityTo: null,
            cities: [],
            isLoaded: false,
            error: null,
            searchResults: [],
            pickedPath: null,
            pickedHotel: null,
            inputDisabled: false,
            paymentLoading: null,
            savedTour: null,

            rzdChecked: null,
            airChecked: true
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePathPick = this.handlePathPick.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleHotelPick = this.handleHotelPick.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.onPaidClick = this.onPaidClick.bind(this);
        this.handleAdditServicePick = this.handleAdditServicePick.bind(this);
        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    }

    componentDidMount() {
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

    handleSearch() {
        const dto = {
            cityFromId: this.state.cityFrom,
            cityToId: this.state.cityTo,
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        };

        switch (this.state.activeStep) {
            case 0:
                var arr = new Array();
                if (this.state.rzdChecked) {
                    arr.push('RZD')
                }
                if (this.state.airChecked) {
                    arr.push('AIR')
                }
                const dto2 = {
                    cityFromId: this.state.cityFrom,
                    cityToId: this.state.cityTo,
                    dateFrom: this.state.dateFrom,
                    dateTo: this.state.dateTo,
                    excludePathTypes: arr
                };

                API.CORE.getTourPaths(dto2).then((res) => {
                    this.setState({
                        searchResults: res.data
                    })
                })
                break;
            case 1:
                API.CORE.getHotels(dto).then((res) => {
                    this.setState({
                        searchResults: res.data
                    })
                })
                break;
            case 2:
                API.CORE.getAdditServiceList().then((res) => {
                    this.setState({
                        searchResults: res.data
                    })
                })
                break;
            default:
                console.log('doing nothing')
        }

    }

    handleCityChange(isFrom, newVal) {
        if (isFrom) {
            this.setState({
                cityFrom: newVal.id
            })
        } else {
            this.setState({
                cityTo: newVal.id
            })
        }
    }

    handleDateChange(isFrom, newVal) {
        var date = null;
        if (newVal) {
            date = newVal.toISOString().slice(0, 10)
        }

        if (isFrom) {
            this.setState({
                dateFrom: date
            })
        } else {
            this.setState({
                dateTo: date
            })
        }
    }

    handlePathPick(item) {
        console.log('pickedPath: ' + item)
        this.setState({
            pickedPath: item,
            inputDisabled: true,
            searchResults: null
        })
        this.handleStepChange(true)
    }

    handleHotelPick(item) {
        console.log('picked hotel: ' + item)
        this.setState({
            pickedHotel: item,
            searchResults: null
        })
        this.handleStepChange(true)
    }

    handleAdditServicePick(item) {
        this.setState({
            pickedAdditService: item
        })
        this.handleStepChange(true)
    }

    handleStepChange(next) {
        if (next && this.state.activeStep === 2) {
            this.setState({paymentLoading: true})
            const dto = {
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo,
                cityFromId: this.state.cityFrom,
                cityToId: this.state.cityTo,
                peopleNum: 1,
                path: this.state.pickedPath,
                hotel: this.state.pickedHotel,
                additService: null
            }
            API.CORE.saveTour(dto).then((res) => {
                this.setState({
                    paymentLoading: false,
                    savedTour: res.data
                })
                if (!GlobalVariables.authToken) {
                    this.props.history.push(HistoryPaths.Auth)
                }
            })
        }

        if (next) {
            this.setState({
                activeStep: this.state.activeStep + 1
            })
        } else {
            this.setState({
                activeStep: this.state.activeStep - 1
            })
        }
    }

    handleSkip() {
        this.state.skippedSteps.push(this.state.activeStep)
        this.handleStepChange(true)
    }

    handleCheckboxCheck(index, obj) {
        var val = obj.target.checked;
        if (index === 0) {
            this.setState({
                rzdChecked: val
            })
        } else {
            this.setState({
                airChecked: val
            })
        }
    }

    getAdditSearchParams(index) {
        if (index === 0) {
            return (
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {this.props.t('pathAdditionalParameters')}
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
                                <FormLabel component="legend">{this.props.t('excludePathType')}</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.rzdChecked} onChange={(val) => this.handleCheckboxCheck(0, val)} />
                                        }
                                        label={this.props.t('rzd')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={this.state.airChecked} onChange={(val) => this.handleCheckboxCheck(1, val)}/>
                                        }
                                        label={this.props.t('avia')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={'true'}/>
                                        }
                                        label={this.props.t('ship')}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={'true'}/>
                                        }
                                        label={this.props.t('auto')}
                                    />
                                </FormGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            )
        } else if (index === 1) {
            return (
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {this.props.t('pathHotelAdditionalParameters')}
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            )
        } else if (index === 2) {
            return (
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {this.props.t('additServiceAdditionalParameters')}
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            )
        }
    }

    onPaidClick() {
        this.props.history.push({
            pathname: HistoryPaths.TourPreview,
            state: {id: this.state.savedTour.tourId}})
    }

    render() {
        if (this.state.paymentLoading) {
            return (
                <SkeletonLoading/>
            )
        } else if (this.state.paymentLoading === false) {
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <img width="400" height="400" src={PaymentPhoto}/>
                    </Grid>
                    <Grid item>
                        <Button onClick={this.onPaidClick}
                        >{this.props.t('ifPaid')}</Button>
                    </Grid>
                    <DefaultStepper activeStep={this.state.activeStep} skippedSteps={this.state.skippedSteps}/>
                </Grid>
            )
        } else {
            return (
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <DefaultDatePicker disabled={this.state.inputDisabled} name={this.props.t('dateFrom')}
                                           onChange={(newVal) => this.handleDateChange(true, newVal)}
                                           value={this.state.dateFrom}/>
                    </Grid>
                    <Grid item xs={2}>
                        <DefaultDatePicker disabled={this.state.inputDisabled} name={this.props.t('dateTo')}
                                           onChange={(newVal) => this.handleDateChange(false, newVal)}
                                           value={this.state.dateTo}/>
                    </Grid>

                    <Grid item xs={10}>
                        <Autocomplete
                            disablePortal
                            disabled={this.state.inputDisabled}
                            options={this.state.cities}
                            style={{width: '100%'}}
                            getOptionLabel={(option) => option.label || ""}
                            onChange={(event, value) => this.handleCityChange(true, value)}
                            renderInput={(params) => <TextField {...params} label={this.props.t('cityFrom')}/>}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Autocomplete
                            disablePortal
                            disabled={this.state.inputDisabled}
                            options={this.state.cities}
                            style={{width: '100%'}}
                            getOptionLabel={(option) => option.label || ""}
                            onChange={(event, value) => this.handleCityChange(false, value)}
                            renderInput={(params) => <TextField {...params} label={this.props.t('cityTo')}/>}
                        />
                    </Grid>

                    {this.getAdditSearchParams(this.state.activeStep)}


                    <Grid item xs={12}>
                        <Button variant="contained" onClick={this.handleSearch}>{this.props.t('search')}</Button>
                    </Grid>

                    {this.state.activeStep === 0 &&
                        this.state.searchResults.map((item, index) => {
                            return (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={10}>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('cost')}: {item.price} {this.props.t('rub')}
                                                    </Typography>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('duration')}: {item.duration} {this.props.t('min')}
                                                    </Typography>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('departureDttm')}: {item.departureDttm}
                                                    </Typography>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('pathType')}: {item.pathType}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <CardActions>
                                                        <Button variant={'outlined'}
                                                                onClick={() => this.handlePathPick(item)}>{this.props.t('pick')}</Button>
                                                    </CardActions>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                        || this.state.activeStep === 1 && this.state.searchResults &&
                        this.state.searchResults.map((item, index) => {
                            return (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={10}>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('fullName')}: {item.fullName}
                                                    </Typography>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('score')}: {item._score}
                                                    </Typography>
                                                    <Typography variant={'subtitle1'}>
                                                        {this.props.t('cost')}: {item.price} {this.props.t('rub')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <CardActions>
                                                        <Button variant={'outlined'}
                                                                onClick={() => this.handleHotelPick(item)}>{this.props.t('pick')}</Button>
                                                    </CardActions>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                        || this.state.activeStep === 2 && this.state.searchResults &&
                        this.state.searchResults.map((item, index) => {
                            return (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant={'h6'}>{this.props.t('title')}: {item.title}</Typography>
                                            <Typography variant={'body1'}>{this.props.t('description')}: {item.description}</Typography>
                                            <Typography variant={'body2'}>{this.props.t('cost')}: {item.cost} {this.props.t('rub')}</Typography>
                                            <CardActions>
                                                <Button variant={'outlined'}
                                                        onClick={() => this.handleAdditServicePick(item)}>{this.props.t('pick')}</Button>
                                            </CardActions>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }

                    <DefaultStepper activeStep={this.state.activeStep} skippedSteps={this.state.skippedSteps}/>
                    <Button color="inherit" onClick={this.handleSkip} sx={{mr: 1}}>
                        Skip
                    </Button>
                </Grid>
            )
        }
    }
}

export default withTranslation()(withRouter(TourChoosingTab));