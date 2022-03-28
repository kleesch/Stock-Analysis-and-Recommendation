import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert} from "reactstrap";
import "./Login.css";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";


class Login extends Component {
    static displayName = Login.name;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired  
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get("token") ?? false,
            username: this.props.cookies.get("username") ?? null,
            usernameInput: "",
            loginAttemptResponses: [/*{
                title: "Invalid Login Attempt",
                description: "the username or password you entered is incorrect",
                success: false
            }*/],
            passwordInput: ""
        };
    }

    async loginButtonPress(){
        if(this.state.token && this.state.username){
            let alerts=this.state.loginAttemptResponses;
            alerts.push({
                title: "Already Logged In",
                description: `You are already logged in as ${this.state.username}!`,
                success: false
            })
            this.setState({loginAttemptResponses: alerts});
            return;
        }
        const username = this.state.usernameInput; //Save by value so that we can save the username as successful later
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: this.state.passwordInput})
        }
        let response = await fetch('/api/persons/login/',requestOptions)
        if (response.status===200){
            const token=await response.text();
            this.props.cookies.set("token",token);
            this.props.cookies.set("username",username);
            let alerts = this.state.loginAttemptResponses
            alerts.push({
                title: "Login Successful",
                description: "You have been logged in. In the future, you will be redirected home.",
                success: true
            })
            this.setState({loginAttemptResponses: alerts, token: token, username: username});
        } else {
            let alerts = this.state.loginAttemptResponses
            alerts.push({
                title: "Invalid Login Attempt",
                description: "The credentials you used to login are incorrect.",
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
        })
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
                            <Button color="danger" className="signupButton" outline href={`/signup`}>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let cookiedLogin = withCookies(Login);
export {cookiedLogin as Login};