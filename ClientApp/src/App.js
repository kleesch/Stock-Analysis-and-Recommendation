import React, {Component} from "react";
import {BrowserRouter, Route, Routes, Navigate, Switch} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Marketing} from "./components/marketing/Marketing";
import {Login} from "./components/login/Login";
import {instanceOf} from "prop-types";
import {withCookies, Cookies} from "react-cookie";
import {Signup} from "./components/signup/signup";
import {Home} from "./components/homepage/homepage";
import {WatchlistAnalytics} from "./components/watchlist_analytics/watchlist_analytics";
import {Recommendations} from "./components/recommendations/recommendations";
import {Logout} from "./components/logout/logout";
import TopBar from "./components/topbar/TopBar";
import {Container} from "reactstrap";


class App extends Component {

    static displayName = App.name;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <TopBar/>
                    <Container>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/homepage" element={<Home/>}/>
                            <Route path="/marketing" element={<Marketing/>}/>
                            <Route path="/watchlist_analytics" element={<WatchlistAnalytics/>}/>
                            <Route path="/recommendations" element={<Recommendations/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/*" element={
                                <Navigate to={`/homepage`} push/>
                            }/>
                        </Routes>
                    </Container>
                </BrowserRouter>
            </Layout>
        );
    }
}

export default withCookies(App);
