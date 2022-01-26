import React, {Component} from "react";
import {Button, Card, CardTitle, Input} from "reactstrap";
import "./Login.css";

export class Login extends Component {
    static displayName = Login.name;
    
    render () {
        return (
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="loginContainer">
                        <Card color={`secondary`} inverse className="loginCard innerContainerItem">
                            <CardTitle>
                                <b>Stock Market Management</b>
                            </CardTitle>
                            <div className="loginField">
                                Username:
                                <Input placeholder={`Username`}/>
                            </div>
                            <div className="loginField">
                                Password:
                                <Input placeholder={`Password`}/>
                            </div>
                            <div className="loginField buttonField">
                                <Button color="light" outline block>
                                    Login
                                </Button>
                            </div>
                        </Card>
                        <div className="text-light innerContainerItem">
                            <h6><span>OR</span></h6>
                        </div>
                        <div className="innerContainerItem">
                            <Button color="danger" className="signupButton" outline>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div> 
            </div>      
        );
    }
}