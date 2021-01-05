import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ListView from './Components/ListView/listView';


function Routes() {
    return(
        <Router>
            <div className="app-container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/list-view">
                        <ListView />
                    </Route>
                </Switch>   
            </div>
        </Router>
    )
}

export default Routes;