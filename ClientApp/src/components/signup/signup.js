import React, {Component} from "react";
import {Alert, Button, Card, CardTitle, Input} from "reactstrap";
import "./signup.css";

export class Signup extends Component {
    static displayName = Signup.name;

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            usernameInput: "",
            passwordInput: "",
            firstnameInput: "",
            lastnameInput: "",
            emailInput: "",
            signupResponse: [],

        };
    }

    usernameInput(e) {
        this.setState({
            usernameInput: e.target.value,
        })
    }

    passwordInput(e) {
        this.setState({
                passwordInput: e.target.value,
            }
        )
    }

    firstnameInput(e) {
        this.setState({
                firstnameInput: e.target.value,
            }
        )
    }

    lastnameInput(e) {
        this.setState({
                lastnameInput: e.target.value,
            }
        )
    }

    emailInput(e) {
        this.setState({
                emailInput: e.target.value,
            }
        )
    }


    async signupButtonPress() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.usernameInput,
                password: this.state.passwordInput,
            })
        }
        let response = await fetch('api/persons/', requestOptions)
        {
            let alerts = this.state.signupResponse
            alerts.push({
                title: "Account Created",
                description: "Please login",
                success: true
            })
            this.setState({signupResponse: alerts});
        }
    }


    generateAlerts(alerts) {
        return (
            <div>
                {alerts.map((alert, index) =>
                    <Alert color={alert.success ? 'success' : 'danger'} toggle={() => this.removeAlert(index)}>
                        <h5>{alert.title}</h5>
                        <p>{alert.description}</p>
                    </Alert>
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="outerContainer3">
                <div className="innerContainer3">
                    <div className="loginContainer3">
                        <Card color={`secondary`} inverse className="loginCard3 innerContainerItem3">
                            <CardTitle>
                                <b>Enter account information</b>
                            </CardTitle>
                            <div className="loginField3">
                                Username:
                                <Input placeholder={`Create a username`} onChange={this.usernameInput.bind(this)}
                                       value={this.state.userNameInput}/>
                            </div>

                            <div className="loginField3">
                                Password:
                                <Input type="password" placeholder={`Create a password`}
                                       onChange={this.passwordInput.bind(this)}
                                       value={this.state.passwordInput}/>
                            </div>
                        </Card>

                        <div className="innerContainerItem3">
                            <Button color="light" className="signupButton" outline
                                    onClick={this.signupButtonPress.bind(this)} href={`/login`}>
                                Create Account!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}