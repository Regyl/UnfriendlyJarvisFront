import React from "react";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {API} from "../../../api/API";
import SkeletonLoading from "../baseElements/SkeletonLoading";
import HeaderBar from "../HeaderBar";
import HistoryPaths from "../../../enums/HistoryPaths";


class AdditServiceSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceList: [],
            error: null,
            isLoaded: false
        }

        this.onCreateClick = this.onCreateClick.bind(this);
    }

    componentDidMount() {
        API.CORE.getAdditServiceList().then((res) => {
            this.setState({
                isLoaded: true,
                serviceList: res.data
            })
        }).catch((err) => {
            this.setState({
                isLoaded: true,
                error: err
            })
        })
    }

    onCreateClick() {
        this.props.history.push(HistoryPaths.AdditService);
    }


    render() {
        if (!this.state.isLoaded) {
            return <SkeletonLoading />
        } else {
            return (
                <Grid container style={{width: '100%'}} direction={'column'} justifyContent={'center'} spacing={3}>
                    <HeaderBar/>
                    {this.state.serviceList.map((item, index) => (
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Typography variant={'h6'}>{this.props.t('title')}: {item.title}</Typography>
                                    <Typography variant={'body1'}>{this.props.t('description')}: {item.description}</Typography>
                                    <Typography variant={'body2'}>{this.props.t('cost')}: {item.cost} {this.props.t('rub')}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item>
                        <Button variant={'outlined'} onClick={this.onCreateClick}>{this.props.t('create')}</Button>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default withTranslation()(withRouter(AdditServiceSearch));