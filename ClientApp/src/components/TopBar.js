import React, {Component} from "react";
import {Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink} from 'reactstrap';

export class TopBar extends Component {
    static displayName = TopBar.name;

    render() {
        return (
            <Navbar color={`dark`} dark light expand="md">
                <NavbarBrand>
                    SM Management
                </NavbarBrand>
                <Nav className={`me-auto`} navbar>
                  
                    <NavItem>
                        <NavLink href={`/homepage`}>
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={`/Marketing`}>
                            About
                        </NavLink>
                    </NavItem>
                    
                </Nav> 
              
                      <NavLink  href={`/login`} className={`ml-auto`} className={`text-light`} >
                            Login
                      </NavLink>
                   
            </Navbar>
        )
    }
}
