import React, {Component} from "react";
import {Button, Card, CardTitle, Input} from "reactstrap";
import "./signup.css";

export class Signup extends Component {
    static displayName = Signup.name;
    
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            usernameInput: "",
            passwordInput: "",
            
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


    async signupButtonPress(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            URL: 'http://127.0.0.1:8000/api/persons/',
            data:{
                name: this.state.usernameInput,
                alias: this.state.passwordInput,
            }
        }
    }

  /*  signUp(event) {
        event.preventDefault();
        this.sessionPromise = ajax({
            url: 'http://127.0.0.1:8000/api/persons/',
            method: 'POST',
            data: {
                usernameInput: this.usernameInput,
                passwordInput: this.passwordInput
            }
        }).then(function(user) {
            return { user: user };
        });
    }
*/

    render () {
        return (
            <div className="outerContainer2">
                <div className="innerContainer2">
                    <div className="loginContainer2">
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Enter account information</b>
                            </CardTitle>
                           
                            
                            <div className="loginField2">
                                Username:
                                <Input placeholder={`Create a username`} onChange={this.usernameInput.bind(this)}
                                       value={this.state.userNameInput}/>
                            </div>
                            
                            <div className="loginField2">
                                Password:
                                <Input placeholder={`Create a password`} onChange={this.passwordInput.bind(this)}
                                       value={this.state.passwordInput}/>
                            </div>
                        
                        </Card>
                        
                        <div className="innerContainerItem2">
                            <Button color="light" className="signupButton" outline onClick={this.signupButtonPress.bind(this)}>
                                Create Account!
                            </Button>
                        </div>
                    </div>
                </div> 
            </div>      
        );
    }
}
