import {Button} from "@mui/material";
import {Component} from "react";
import {withRouter} from "react-router-dom";


class BackButton extends Component {
    constructor(props) {
        super(props);
        this.onBackClick = this.onBackClick.bind(this);
    }

    render() {
        return (
            <Button onClick={this.onBackClick} variant={"outlined"}>
                Back
            </Button>

        );
    }

    onBackClick() {
        this.props.history.goBack();
    }
}

export default withRouter(BackButton);