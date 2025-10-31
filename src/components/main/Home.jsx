import {Box, Grid, Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import HeaderBar from "./HeaderBar";
import RecommendationTab from "./tabs/RecommendationTab";
import TourChoosingTab from "./tabs/TourChoosingTab";
import TabArray from "../../enums/TabArray";
import TourChoosingAutomaticTab from "./tabs/TourChoosingAutomaticTab";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    render() {
        return (
            <Grid container component={'span'}>
                <HeaderBar />
                <Grid item component={'span'} style={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={this.state.value} onChange={this.handleChange}>
                            {
                                TabArray.map((item, i) => {
                                    return (<Tab label={item.name} value={item.number} {...allyProps(item.number)} />)
                                })
                            }
                        </Tabs>
                    </Box>

                    <TabPanel value={this.state.value} index={0}>
                        <RecommendationTab />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <TourChoosingTab />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <TourChoosingAutomaticTab />
                    </TabPanel>
                </Grid>
            </Grid>
        );
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function allyProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default withRouter(Home);
