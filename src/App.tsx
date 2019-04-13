// react
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Demo } from "./client/components/Demo";

const root = document.getElementById("app") as HTMLElement;

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/" render={() => <Demo Caption="Hello World"/>} />
           </Switch>
        </BrowserRouter>
    </div>
     , root);

/* Routing with parameters: <Route path="/recipe/:recipeid" render={({ match: { params: { recipeid }}}) => <Recipe RecipeID={recipeid} /> } /> */