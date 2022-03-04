import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Login} from "./components/login/Login";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";


export default class App extends Component {
    
    static displayName = App.name;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired  };
    
      state = {
        user: this.props.cookies.get("key") || ""
      };
      handleCookie = () => {
        const { cookies } = this.props;
        cookies.set("key", "value", { path: "/" }); // setting the cookie    this.setState({ user: cookies.get("user") });
      };
                
    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={< Login/>}/>
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
