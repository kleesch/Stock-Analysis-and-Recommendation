import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Login} from "./components/login/Login";
import { Signup } from "./components/signup/signup";


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={< Login/>}/>
                        <Route path="/signup" element={< Signup/>}/>

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