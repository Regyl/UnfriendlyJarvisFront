import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import React from "react";


export default function DefaultDatePicker(props) {
    return (
        <LocalizationProvider  utils={DateFnsUtils}>
            <DatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={props.name}
                value={props.value}
                onChange={props.onChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                disabled={props.disabled}
            />
        </LocalizationProvider >
    );
}