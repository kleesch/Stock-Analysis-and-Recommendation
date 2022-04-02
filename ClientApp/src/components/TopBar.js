import React, {Component} from "react";
import {Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink} from 'reactstrap';
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class TopBar extends Component {
    static displayName = TopBar.name;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get("token") ?? false,
            username: this.props.cookies.get("username") ?? null,
            staff: false,
            loading: true,
        }
    }

    async loadData() {
        if (this.state.username === null) {
            return
        }
        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`
            })
        }
        let staff = await fetch(`api/persons/isStaff/`, requestOptions)
        let staffData = await staff.json()

        this.setState({
            staff: staffData,
        })
    }

    componentDidMount() {
        this.loadData().then(() => {
            this.setState({
                loading: false,
            })
        })
    }


    render() {
        return (
            <Navbar color={`dark`} dark light expand="md">
                <NavbarBrand>
                    SM Management
                </NavbarBrand>
                <Nav className={`me-auto`} navbar>
                    <NavItem>
                        <NavLink href={`/login`}>
                            Login
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/homepage`}>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/marketing`}>
                            About
                        </NavLink>
                    </NavItem>
                    { this.state.staff &&
                        <NavItem>
                            <NavLink href={`/watchlist_analytics`}>
                                Watchlist Analytics
                            </NavLink>
                        </NavItem>
                    }
                </Nav>
            </Navbar>
        )
    }
}

let cookiedTopBar = withCookies(TopBar);
export {cookiedTopBar as TopBar}
