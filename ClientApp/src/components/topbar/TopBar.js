import React, {Component} from "react";
import {Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink} from 'reactstrap';
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import './TopBar.css'
import {useLocation} from "react-router-dom";

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
            location: null,
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
        console.log(this.state.staff)
    }

    componentDidMount() {
        this.loadData().then(() => {
            this.setState({
                loading: false,
            })
        })
    }
    
    componentDidUpdate(prevProps){
        if(this.props.location.pathname!==prevProps.location.pathname){
            this.setState({
                token: this.props.cookies.get("token") ?? false,
                username: this.props.cookies.get("username") ?? null,
            })
        }
    }

    render() {
        let page = this.props.location.pathname
        console.log(this.props.location)
        return (
            <Navbar color={`dark`} dark light expand="md">
                <NavbarBrand>
                    SM Management
                </NavbarBrand>
                <Nav className={`me-auto primary-navbar`} navbar>

                    <NavItem>
                        <NavLink href={`/homepage`} className={page === '/homepage' ? 'active' : ''}>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/marketing`} className={page === '/marketing' ? 'active' : ''}>
                            About
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/recommendations`} className={page === '/recommendations' ? 'active' : ''}>
                            Recommendations
                        </NavLink>
                    </NavItem>
                    {this.state.staff &&
                        <NavItem>
                            <NavLink href={`/watchlist_analytics`}
                                     className={page === '/watchlist_analytics' ? 'active' : ''}>
                                Watchlist Analytics
                            </NavLink>
                        </NavItem>
                    }
                </Nav>
                {
                    this.state.username === null ? (
                        <NavLink href={`/login`}
                                 className={`ml-auto text-light` + (page === '/login' ? ' active' : '')}>
                            Login
                        </NavLink>
                    ) : (
                        <NavLink href={`/logout`}
                                 className={`ml-auto text-light` + (page === '/logout' ? ' active' : '')}>
                            Log Out
                        </NavLink>
                    )
                }


            </Navbar>
        )
    }
}

function withLocationHook(Component) {
    return function TopBar(props) {
        const location = useLocation()
        return <Component {...props} location={location}/>
    }
}


export default withLocationHook(withCookies(TopBar))
