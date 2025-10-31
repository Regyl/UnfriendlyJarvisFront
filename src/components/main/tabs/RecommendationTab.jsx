import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import Masonry from '@mui/lab/Masonry';
import SwipeableTextMobileStepper from "../baseElements/SwipeableElement";
import {API} from "../../../api/API";
import SkeletonLoading from "../baseElements/SkeletonLoading";
import ComponentMountFailure from "../baseElements/ComponentMountFailure";

class RecommendationTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: null
        };
    }

    componentDidMount() {
        API.CORE.getRecommendations().then((res) => {
            this.setState({
                items: res.data,
                isLoaded: true
            })
        }).catch((error) =>
            this.setState({
                isLoaded: true,
                error
            })
        )
    }

    render() {
        console.log('items: ' + this.state.items);
        if (!this.state.isLoaded) {
            return <SkeletonLoading />;
        } else if (this.state.error) {
            return <ComponentMountFailure onRetryClick={this.componentDidMount()} />;
        }

        return (
            <Grid container direction={'column'} justifyContent={'center'}>
                <Masonry columns={4} spacing={2}>
                    {this.state.items.map((item, index) => (
                        <SwipeableTextMobileStepper images={item} />
                    ))}
                </Masonry>
            </Grid>
        );
    }

}

export default RecommendationTab;