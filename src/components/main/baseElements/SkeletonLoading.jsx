import {Grid} from "@mui/material";
import {Skeleton} from "@mui/lab";


function SkeletonLoading() {
    return (
        <Grid container style={{width: '100%'}} spacing={3}>
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
            {gridItem()}
        </Grid>
    );
}

function gridItem() {
    return (
        <Grid item>
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <Skeleton animation="wave" variant="text" width={200} height={30} />
                </Grid>
                <Grid item>
                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                </Grid>
                <Grid item>
                    <Skeleton animation="wave" variant="rect" width={210} height={120} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SkeletonLoading;