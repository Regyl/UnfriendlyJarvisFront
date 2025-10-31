import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {withTranslation} from "react-i18next";


class TourPreviewAdditionalService extends Component {

    render() {
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container justifyContent={'center'}>
                        <Typography color="text.primary" variant={'h6'}>{this.props.t('additService')}</Typography>
                        <SupportAgentIcon />
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        );
    }
}

export default withTranslation()(withRouter(TourPreviewAdditionalService));