import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert} from "reactstrap";
import "./Login.css";


export class Login extends Component {
    static displayName = Login.name;


    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            usernameInput: "",
            loginAttemptResponses: [],
            passwordInput: ""
        };
    }
    
    async loginButtonPress(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors'
            },
            body: JSON.stringify({name: this.state.usernameInput})
        }
        let response = await fetch('api/persons/getByName/',requestOptions)
        if (response.status===200){
            let alerts = this.state.loginAttemptResponses
            alerts.push({
                title: "Login Successful",
                description: "You have been logged in. In the future, you will be redirected home.",
                success: true
            })
            this.setState({loginAttemptResponses: alerts});
        } else {
            let alerts = this.state.loginAttemptResponses
            alerts.push({
                title: "Invalid Login Attempt",
                description: "the username or password you entered is incorrect",
                success: false
            })
            this.setState({loginAttemptResponses: alerts});
        }
    }

    removeAlert(index) {
        let alerts = this.state.loginAttemptResponses;
        alerts.splice(index, 1);
        this.setState({loginAttemptResponses: alerts});
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
        let alerts = this.generateAlerts(this.state.loginAttemptResponses);
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
                                <Input placeholder={`Username`} onChange={this.usernameInput.bind(this)}
                                       value={this.state.usernameInput}/>
                            </div>
                            <div className="loginField">
                                Password:
                                <Input type="password" placeholder={`Password`} onChange={this.passwordInput.bind(this)}
                                       value={this.state.passwordInput}/>
                            </div>
                            <div className="loginField buttonField">
                                <Button color="light" outline block onClick={this.loginButtonPress.bind(this)}>
                                    Login
                                </Button>
                            </div>
                            {alerts}
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
