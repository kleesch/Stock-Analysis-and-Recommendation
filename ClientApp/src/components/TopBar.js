import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink } from 'reactstrap';

export class TopBar extends Component {
    static displayName = TopBar.name;

    render() {
        return ( <
            Navbar color = { `dark` }
            dark light >
            <
            NavbarBrand >
            Hello <
            /NavbarBrand> <
            Nav className = { `me-auto` }
            navbar >
            <
            NavItem >
            <
            NavLink >
            Home <
            /NavLink> <
            /NavItem> <
            /Nav> <
            NavbarText >
            Profile <
            /NavbarText> <
            /Navbar>
        )
    }
}