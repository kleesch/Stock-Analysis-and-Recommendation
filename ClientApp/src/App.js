import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Marketing} from "./components/marketing/Marketing";
import { Login } from "./components/login/Login";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Signup } from "./components/signup/signup";
import { Home } from "./components/homepage/homepage";


class App extends Component {
    
    static displayName = App.name;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired  
    };

    constructor(props){
        super(props);
    }
                
    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={< Login/>}/>
                        <Route path="/signup" element={< Signup/>}/>
                        <Route path="/homepage" element={< Home/>}/>
                        <Route path="/Marketing" element={< Marketing/>}/>
                        <Route path="/*" element={
                            <div className={`text-light`}>
                                There's nothing here!
                            </div>
                        }/>
                    </Routes>
                </BrowserRouter>
            </Layout>
        );
    }
}

export default withCookies(App);
