import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
// import SwipeableViews from 'react-swipeable-views';
// import {autoPlay} from 'react-swipeable-views-utils';
import {withRouter} from "react-router-dom";
import HistoryPaths from "../../../enums/HistoryPaths";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const images = props.images;
    const maxSteps = images.links.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const handleCardClick = () => {
        props.history.push({
            pathname: HistoryPaths.TourPreview,
            state: {id: images.tourId}
        })
    }

    return (
        <Box sx={{ borderRadius: '16px', border: '2px solid brown', borderColor: '#BB8B54FF' }}>
            {/*<Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>{images.shortDisplayName}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                onClick={handleCardClick}
            >
                {images.links.map((step, index) => (
                    <div key={images.shortDisplayName}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    //maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step}
                                alt={step.shortDisplayName}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />*/}
        </Box>
    );
}

export default withRouter(SwipeableTextMobileStepper);