import {Alert, Stack} from "@mui/material";

export default function DefaultErrorLoading() {
    return (
        <Stack spacing={3}>
            <Alert severity="error">Something went wrong</Alert>
        </Stack>
    );
}