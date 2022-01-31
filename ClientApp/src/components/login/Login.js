import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert} from "reactstrap";
import "./Login.css";


export class Login extends Component {
    static displayName = Login.name;


    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            usernameInput: "",
            loginAttemptResponses: [{
                title: "Invalid Login Attempt",
                description: "the username or password you entered is incorrect",
                success: false
            }],
            passwordInput: ""
        };
    }
    
    async loginButtonPress(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: this.state.usernameInput})
        }
        let response = await fetch('http://127.0.0.1:8000/persons/getByName/',requestOptions)
        console.log(response);
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
                                Username: {this.state.usernameInput}
                                <Input placeholder={`Username`} onChange={this.usernameInput.bind(this)}
                                       value={this.state.userNameInput}/>
                            </div>
                            <div className="loginField">
                                Password: {this.state.passwordInput}
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
