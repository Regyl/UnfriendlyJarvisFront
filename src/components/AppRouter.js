import React from 'react';

import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Home from "./main/Home";
import HistoryPaths from "../enums/HistoryPaths";
import AuthorizationNew from "./main/auth/MainAuthorization";
import OAuth from "./main/auth/OAuth";
import TourPreview from "./main/tourview/TourPreview";
import Account from "./main/Account";
import i18n from "../i18n";
import AdditionalServiceCreate from "./main/additionalService/AdditionalServiceCreate";
import AdditionalServiceSearch from "./main/additionalService/AdditionalServiceSearch";

const AppRouter = (props) => {
    const { history } = props
    return (
          <Switch history={history}>
              <Route path={HistoryPaths.Home} component={Home} />
              <Route path={HistoryPaths.Registration} component={AuthorizationNew} />
              <Route path={HistoryPaths.Auth} component={AuthorizationNew} />
              <Route path={HistoryPaths.Account} component={Account} />
              <Route path={HistoryPaths.OAuth} component={OAuth} />
              <Route path={HistoryPaths.TourPreview} component={TourPreview} />
              <Route path={HistoryPaths.AdditService} component={AdditionalServiceCreate} />
              <Route path={HistoryPaths.AdditServiceSearch} component={AdditionalServiceSearch} />
            <Redirect from={'/'} to={HistoryPaths.Home}/>
          </Switch>
    );
}

i18n();

export default withRouter(AppRouter);

// $env:NODE_OPTIONS = "--openssl-legacy-provider"