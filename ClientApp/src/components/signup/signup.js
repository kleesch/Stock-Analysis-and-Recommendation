import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import {Alert, Button, Card, CardTitle, Input} from "reactstrap";
import "./signup.css";

export class Signup extends Component {
    static displayName = Signup.name;

    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            success: false,
            usernameInput: "",
            passwordInput: "",
            passwordConfirmInput: "",
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

    passwordConfirmInput(e) {
        this.setState({
                passwordConfirmInput: e.target.value,
            }
        )
    }

    firstnameInput(e) {
        this.setState({
                firstnameInput: e.target.value,
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
        if (this.state.passwordInput !== this.state.passwordConfirmInput) {
            let alerts=this.state.alerts
            alerts.push({
                title: "Passwords Don't Match",
                description: "The passwords you entered don't match!",
                success: false
            })
            this.setState({alerts: alerts});
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.usernameInput,
                password: this.state.passwordInput,
            })
        }
        let response = await fetch('api/persons/signup/', requestOptions)
        if (response.status===201){
            let alerts = this.state.alerts
            alerts.push({
                title: "Account Created",
                description: "You may now login with this account!",
                success: true
            })
            this.setState({alerts: alerts});
        } else if (response.status===409){
            let alerts = this.state.alerts
            alerts.push({
                title: "Username Taken",
                description: "The username you're using is already taken!",
                success: false
            })
            this.setState({alerts: alerts});
        } else if (response.status===400){
            let alerts = this.state.alerts
            alerts.push({
                title: "Invalid Username/Password",
                description: "You cannot leave fields blank!",
                success: false
            })
            this.setState({alerts: alerts});
        }

        
    }

    removeAlert(index) {
        let alerts = this.state.alerts;
        alerts.splice(index, 1);
        this.setState({loginAttemptResponses: alerts});
    }


    generateAlerts(alerts) {
        return (
            <div style={{width: "90%"}}>
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
        let alerts = this.generateAlerts(this.state.alerts);
        return (
            <div className="outerContainer3">
                <div className="innerContainer3">
                    <div className="loginContainer3">
                        <Card color={`secondary`} inverse className="loginCard3 innerContainerItem3">
                            <CardTitle>
                                <b>Enter Account Information</b>
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

                            <div className="loginField3">
                                Confirm Password:
                                <Input type="password" placeholder={`Confirm password`}
                                       onChange={this.passwordConfirmInput.bind(this)}
                                       value={this.state.passwordConfirmInput}
                                       invalid={this.state.passwordConfirmInput !== this.state.passwordInput && this.state.passwordConfirmInput !== ""}
                                       valid={this.state.passwordInput === this.state.passwordConfirmInput && this.state.passwordConfirmInput !== ""}
                                />
                            </div>
                            {
                                alerts
                            }
                        </Card>

                        <div className="innerContainerItem3">
                            <Button color="light" className="signupButton" outline
                                    onClick={this.signupButtonPress.bind(this)}>
                                Create Account!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
