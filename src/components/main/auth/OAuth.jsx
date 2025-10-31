import React from 'react';
import {Grid} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {ClimbingBoxLoader} from "react-spinners";
import {API} from "../../../api/API";
import OAuthProviderType from "../../../enums/OAuthProviderType";
import GlobalVariables from "../../../enums/GlobalVariables";
import HistoryPaths from "../../../enums/HistoryPaths";

const styles = {
    mainForm : {
        position: 'fixed',
        top: '35%',
        left: '45%',
        width: '10%',
        height: '40%',
    },

}

class OAuth extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const code = new URLSearchParams(this.props.location.search).get('code')
        const state = new URLSearchParams(this.props.location.search).get('state')
        API.signInOauth(code, state, OAuthProviderType.GitHub.name).then((res) => {
            GlobalVariables.authToken = res.data;
            console.log('authToken: ' + GlobalVariables.authToken)
            this.props.history.push(HistoryPaths.Home)
        })
    }


    render() {
        return (
            <Grid container
                  direction={"column"}
                  spacing={2}
                  style={{width: '100%', height: '100%'}}
            >
                <Grid item>
                    <Grid container
                          direction={"column"}
                          style={styles.mainForm}>
                        <ClimbingBoxLoader color="#36d7b7" />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(OAuth);