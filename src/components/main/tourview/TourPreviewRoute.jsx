import React, {Component} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {withRouter} from "react-router-dom";
import DefaultTimeline from "../baseElements/DefaultTimeline";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {withTranslation} from "react-i18next";

class TourPreviewRoute extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paths: props.paths,
        }
    }

    render() {
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container justifyContent={'center'}>
                        <Typography color="text.primary" variant={'h6'}>{this.props.t('route')}</Typography>
                        <AltRouteIcon />
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={8}>
                            {this.state.paths.map((item, index) => (
                                <Typography>
                                    x: {item.x}, y: {item.y}, name: {item.name}
                                </Typography>
                            ))}
                        </Grid>
                        <Grid item xs={4}>
                            <DefaultTimeline />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    }
}

export default withTranslation()(withRouter(TourPreviewRoute));