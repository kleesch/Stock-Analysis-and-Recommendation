import React, {Component} from "react";
import "./logout.css";
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types";
import {Navigate} from "react-router-dom";


class Logout extends Component {
    static displayName = Logout.name;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state={
            loading: true
        }
    }
    
    async logout() {
        this.props.cookies.remove('username');
        this.props.cookies.remove('token');
    }
    
    componentDidMount() {
        this.logout().then(()=>{
            this.setState({
                loading: false
            })
        })
    }

    render() {
        if (this.state.loading){
            return (
                <div className={`text-light`}>
                    Logging out...
                </div>
            )
        }
        return (
            <Navigate to={`/login`} push />
        );
    }
}

let cookiedLogout = withCookies(Logout);
export {cookiedLogout as Logout};