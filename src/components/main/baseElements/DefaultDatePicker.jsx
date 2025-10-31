import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import React from "react";


export default function DefaultDatePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
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
        </MuiPickersUtilsProvider>
    );
}