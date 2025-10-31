import * as React from 'react';
import {Component} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";


class AnotherStepper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: props.activeStep,
            steps: [this.props.t('firstStep'), this.props.t('secondStep'), this.props.t('thirdStep'), this.props.t('fourthStep')],
            optionalSteps: [2]
        }

        this.handleSkip = this.handleSkip.bind(this);
    }

    isStepOptional(step) {
        return this.state.optionalSteps.includes(step);
    }

    isStepSkipped(step) {
        return this.props.skippedSteps.includes(step);
    }

    handleSkip() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    render() {
        return (
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={this.props.activeStep}>
                    {this.state.steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (this.isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (this.isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {this.state.activeStep === this.state.steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/*<Button onClick={handleReset}>Reset</Button>*/}
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {/*<Typography sx={{ mt: 2, mb: 1 }}>Step {this.state.activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {this.isStepOptional(this.state.activeStep) && (
                                <Button color="inherit" onClick={this.handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={this.handleNext}>
                                {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>*/}
                    </React.Fragment>
                )}
            </Box>
        )
    }

}

export default withTranslation()(withRouter(AnotherStepper));