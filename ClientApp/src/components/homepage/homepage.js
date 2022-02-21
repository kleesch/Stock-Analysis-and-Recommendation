import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert} from "reactstrap";
import "./homepage.css";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerInput: "",
            retrievedStock: "None",
            price: 0,
            high: 0,
            low: 0,
        };
    }


    tickerInput(e) {
        this.setState({
            tickerInput: e.target.value,
        })
    }

    async tickerButton() {
        const input = this.state.tickerInput
        const requestOptions = {
            method: 'GET'
        }
        let response = await fetch(`api/dailystocks/getByTicker?ticker=${input}`, requestOptions)
        if (response.status===200) {
            response = await response.json();
            response= await JSON.parse(response);
            console.log(response[0]);
            this.setState({
                retrievedStock: input,
                price: parseFloat(response[0].fields.close,2),
                high: parseFloat(response[0].fields.high,2),
                low: parseFloat(response[0].fields.low,2)
            })
        }
    }

    render() {
        return (
            <div className="outerContainer2">
                <div className="innerContainer2">
                    <div className="loginContainer2">
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Enter stock ticker</b>
                                <Input placeholder={``} onChange={this.tickerInput.bind(this)}
                                       value={this.state.tickerInput}> </Input>
                                <button className="tickerbutton" onClick={this.tickerButton.bind(this)}>Enter</button>
                            </CardTitle>
                        </Card>
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Stock Market Management</b>
                                <div className="card-body d-flex flex-wrap">
                                    <h2 className="card-title p-2">Stock ticker: <p><b>{this.state.retrievedStock}</b></p>
                                    </h2>
                                </div>
                                <ul className="lists">
                                    <li className="listitems"><strong>Current share price: </strong> <span
                                        className="text-black">{this.state.price}</span></li>
                                    <li className="listitems"><strong>52 week high: </strong> <span
                                        className="text-black">{this.state.high}</span></li>
                                    <li className="listitems"><strong>52 week low: </strong> <span
                                        className="text-black">{this.state.low}</span></li>


                                </ul>


                            </CardTitle>
                        </Card>
                    </div>
                </div>
            </div>


        );


    }

}