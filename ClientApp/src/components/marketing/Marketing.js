import React, {Component} from "react";
import {Container, Card, CardImg, CardText, CardBody, CardTitle} from "reactstrap";


export class Marketing extends Component {
    static displayName = Marketing.name;
    
    render () {
        return (
                <div className="outerContainer" >
                    <Container>
                    <h1>About This Project</h1>
                    <Card className="bg-dark text-white">
                        <CardBody>
                            <CardTitle><b><i>Purpose and Intent</i></b></CardTitle>
                            <hr/>
                            <CardText>This project is intended to be a tool amateur investors can use to inform themselves on
                                advantageous moves they could be making within their portfolio based on predictive Machine Learning models. 
                                <br/><br/>
                                Although large financial institutions today include predictive models in their investing toolset, there are 
                                not many easily accessible equivalents for amateur investors. Through comparing several algorithms and selecting
                                those which provide the most reliable results as to wether to buy, sell or hold a given stock, we hope to 
                                build confidence and financial literacy in the everyday investor.
                                <hr/>
                                Any predictions made by this application are not intended to be 100% accurate and advice given must be taken at one's own risk.
                                </CardText>
                        </CardBody>
                    </Card>
                    </Container>
                    <Container>
                    <h2 class="text-light">Development Team</h2>
                    <Card className="bg-dark text-white">
                        <CardBody>
                            <CardTitle><b>Kyle Leesch</b></CardTitle>
                            <CardText>Team Lead, Computer Science Major</CardText>
                        </CardBody>
                    </Card>
                    <hr/>
                    <Card className="bg-dark text-white">
                        <CardBody>
                            <CardTitle><b>Ismail Dedic</b></CardTitle>
                            <CardText>Information Technology Major</CardText>
                        </CardBody>
                    </Card>
                    <hr/>
                    <Card className="bg-dark text-white">
                        <CardBody> 
                            <CardTitle><b>Alex Jakubiak</b></CardTitle>
                            <CardText>Information Technology Major</CardText>
                        </CardBody>
                    </Card>
                    <hr/>
                    <Card className="bg-dark text-white">
                        <CardBody>
                            <CardTitle><b>Caroline Bull</b></CardTitle>
                            <CardText>Information Technology Major</CardText>
                        </CardBody>
                    </Card>
                    </Container>
                </div>
            
            
        );
    }
}