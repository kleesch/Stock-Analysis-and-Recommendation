import React, {Component} from "react";
import {Container} from "reactstrap";
import {TopBar} from "./topbar/topbar";

export class Layout extends Component {
    static displayName = Layout.name;
    
    render () {
        return (
            <div>
                <TopBar/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}