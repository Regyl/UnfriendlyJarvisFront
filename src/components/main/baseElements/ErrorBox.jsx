import {Box, Grid} from "@mui/material";
import React from "react";

function ErrorBox() {
    return (
        <Grid container style={{width: '100%'}} spacing={3}>
            <Box>Ошибка</Box>
        </Grid>
    );
}

export default ErrorBox;