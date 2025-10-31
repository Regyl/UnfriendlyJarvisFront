import React, {Component} from "react";
import {API} from "../../../api/API";
import {withRouter} from "react-router-dom";
import HeaderBar from "../HeaderBar";
import {Card, Divider, Grid, TextField} from "@mui/material";
import SwipeableTextMobileStepper from "../baseElements/SwipeableElement";
import SkeletonLoading from "../baseElements/SkeletonLoading";
import Typography from "@mui/material/Typography";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ImageMasonry from "../baseElements/ImageMasonry";
import TourPreviewAdditionalService from "./TourPreviewAdditionalService";
import DefaultDatePicker from "../baseElements/DefaultDatePicker";
import TourPreviewRoute from "./TourPreviewRoute";
import {withTranslation} from "react-i18next";
import {Autocomplete} from "@mui/lab";

class TourPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tourId: props.location.state.id,
            cities: [],
            error: null,
            isLoaded: false,
            item: null
        };
    }

    componentDidMount() {
        const promise1 = API.CORE.getTourPreview(this.state.tourId)
            .then((res) => res.data)
            .catch((err) => {
                return {
                    isLoaded: true,
                    error: err
                };
            });

        const promise2 = API.DICTIONARIES.getCatalogRecords('CITY')
            .then((res) => res.data)
            .catch((err) => {
                return {
                    isLoaded: true,
                    error: err
                };
            });

        Promise.all([promise1, promise2])
            .then(([res1, res2]) => {
                this.setState({
                    item: res1,
                    cities: res2,
                    isLoaded: true
                })
            })
            .catch((error) => {
                console.log('error: ' + error)
                this.setState(error)
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Grid container>
                    <HeaderBar />
                    <SkeletonLoading />
                </Grid>
            )
        }

        return (
            <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12}>
                    <HeaderBar />
                </Grid>
                <Grid item xs={3}>
                    <SwipeableTextMobileStepper images={this.state.item} />
                    <Card>
                        <Grid container justifyContent={'center'}>
                            <Typography color="text.secondary" variant="body1">
                                {this.props.t('cost')}: {this.state.item.fullPrice} {this.props.t('rub')}
                            </Typography>
                        </Grid>
                        <Divider light />
                    </Card>
                </Grid>

                <Grid container direction={'column'} spacing={3} alignItems={'center'} xs={2}>
                    <Grid item>
                        <DefaultDatePicker name={this.props.t('dateFrom')} disabled value={this.state.item.dateFrom} />
                    </Grid>
                </Grid>
                <Grid container xs={5} justifyContent={'center'}>
                    <FlightTakeoffIcon />
                </Grid>
                <Grid item xs={2}>
                    <DefaultDatePicker name={this.props.t('dateTo')} disabled value={this.state.item.dateTo}/>
                </Grid>

                <Grid item xs={10}>
                    <Autocomplete
                        disablePortal
                        disabled
                        value={this.state.cities.find(temp => temp.id === this.state.item.cityFromId)}
                        options={this.state.cities}
                        style={{width: '100%'}}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => <TextField {...params} label={this.props.t('cityFrom')}/>}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        disabled
                        value={this.state.cities.find(temp => temp.id === this.state.item.cityToId)}
                        options={this.state.cities}
                        style={{width: '100%'}}
                        getOptionLabel={(option) => option.label || ""}
                        renderInput={(params) => <TextField {...params} label={this.props.t('cityTo')}/>}
                    />
                </Grid>
                {/*<Grid item xs={2}>
                    <Typography variant={'subtitle1'}>
                        {this.props.t('hotel')}: {this.state.item.hotel.fullName}
                    </Typography>
                </Grid>*/}

                <Grid item xs={12}>
                    <TourPreviewRoute paths={this.state.item.paths}/>
                </Grid>

                <Grid item xs={12}>
                    <TourPreviewAdditionalService />
                </Grid>

                <Grid item xs={12}>
                    <ImageMasonry />
                </Grid>
            </Grid>
        )
    }
}

export default withTranslation()(withRouter(TourPreview));