import React, {Component} from "react";
import {Container} from "reactstrap";
import TopBar from "./topbar/TopBar";

export class Layout extends Component {
    static displayName = Layout.name;
    
    render () {
        return (
            <div>
                <Container style={{maxWidth:"100%", padding: 0}}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}