import React, {Component} from "react";
import {Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink} from 'reactstrap';

export class TopBar extends Component {
    static displayName = TopBar.name;

    render() {
        return (
            <Navbar color={`dark`} dark light>
                <NavbarBrand>
                    SM Management
                </NavbarBrand>
                <Nav className={`me-auto`} navbar>
                    <NavItem>
                        <NavLink href={`/`}>
                            Home
                        </NavLink>
                    </NavItem>
                </Nav>
                <NavLink href={`/login`} className={`text-light`}>
                    Login
                </NavLink>
            </Navbar>
        )
    }
}
