import * as React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Saved from "./components/Saved";
import Search from "./components/Search";

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Saved} />
                        <Route path="/saved" component={Saved} />
                        <Route path="/search/:title" component={Search} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </React.Fragment>
    )
}

export default App;