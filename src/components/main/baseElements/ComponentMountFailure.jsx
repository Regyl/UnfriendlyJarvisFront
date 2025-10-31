import {Button, Grid} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ReplayIcon from "@mui/icons-material/Replay";
import React from "react";


export default function ComponentMountFailure(props) {

    return (
        <Grid container>
            <Alert severity="error" action={
                <Button onClick={props.onRetryClick} variant={'outlined'} endIcon={<ReplayIcon />}>Retry</Button>
            }>This is a warning alert — check it out!</Alert>
        </Grid>
    );
}