import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert, Table} from "reactstrap";
import {Navigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import "./homepage.css";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";


class Home extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get("token") ?? false,
            username: this.props.cookies.get("username") ?? null,
            stocks: [],
            tickerInput: "",
            retrievedStock: "None",
            price: 0,
            high: 0,
            low: 0,
            watchlistStocks: [
                //{ticker: "IBM", price: 0.00, high: 0.00},
                {ticker: "None", price: 0, high: 0},
                {ticker: "None", price: 0, high: 0},
                {ticker: "None", price: 0, high: 0},
                {ticker: "None", price: 0, high: 0},
                {ticker: "None", price: 0, high: 0}
            ]
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
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`
            })
        }
        let response = await fetch(`api/dailystocks/getByTicker?ticker=${input}`, requestOptions)
        if (response.status === 200) {
            response = await response.json();
            response = await JSON.parse(response);
            const oldSearch = {
                ticker: input,
                price: parseFloat(response[response.length - 1].fields.close, 2),
                high: parseFloat(response[response.length - 1].fields.high, 2)
            };
            let oldWatchlist = this.state.watchlistStocks;
            oldWatchlist.splice(0, 0, oldSearch);
            oldWatchlist.splice(3, 1);
            let mapped_stocks = response.map((elem) => {
                return {"date": elem.fields.date, "close": parseFloat(elem.fields.close)}
            });
            mapped_stocks.reverse()
            console.log(mapped_stocks);
            this.setState({
                stocks: mapped_stocks
            })
            console.log(response[response.length - 1]);
            this.setState({
                retrievedStock: input,
                watchlistStocks: oldWatchlist,
            })
        }
    }

    render() {
        if (this.state.username === null) {
            return (
                <Navigate to={`/login`} push/>
            )
        }
        return (
            <div className="outerContainer4">
                <div className="innerContainer4">
                    <div className="loginContainer4">
                    <Card className="cardRec text-light"color={`secondary`}>
                            <CardTitle><br></br>Stock recommendation for:</CardTitle>
                            <p> <b>None</b></p> 

                            <p class="text-warning"><b>BUY</b></p>
                           
                        </Card>
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Enter stock ticker</b>
                                <Input className="firstone" placeholder={``} onChange={this.tickerInput.bind(this)}
                                       value={this.state.tickerInput}> </Input>
                                <button className="tickerbutton" onClick={this.tickerButton.bind(this)}>Enter</button>
                            </CardTitle>
                        </Card>
                        <Card color={`secondary`} inverse className="loginCard4 innerContainerItem4">
                            <CardTitle>
                                <b><i>Stock Watchlist</i></b>
                            </CardTitle>

                            <Table className="text-light" hover>
                                <thead>
                                <tr>
                                    <th> Stock Ticker</th>
                                    <th> Price</th>
                                    <th> Weekly High</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr> <td>  {this.state.watchlistStocks[0].ticker} </td>
                                        <td>  {this.state.watchlistStocks[0].price} </td>
                                        <td>  {this.state.watchlistStocks[0].high} </td>
                                        <td><Button>Remove</Button></td>
                                    </tr>
                                    <tr> <td>  {this.state.watchlistStocks[1].ticker} </td>
                                        <td>  {this.state.watchlistStocks[1].price} </td>
                                        <td>  {this.state.watchlistStocks[1].high} </td>
                                        <td><Button>Remove</Button></td>

                                    </tr>
                                    <tr> <td>  {this.state.watchlistStocks[2].ticker} </td>
                                        <td>  {this.state.watchlistStocks[2].price} </td>
                                        <td>  {this.state.watchlistStocks[2].high} </td>
                                        <td><Button>Remove</Button></td>

                                    </tr>
                                    <tr> <td>  {this.state.watchlistStocks[3].ticker} </td>
                                        <td>  {this.state.watchlistStocks[3].price} </td>
                                        <td>  {this.state.watchlistStocks[3].high} </td>
                                        <td><Button>Remove</Button></td>

                                    </tr>
                                    <tr> <td>  {this.state.watchlistStocks[4].ticker} </td>
                                        <td>  {this.state.watchlistStocks[4].price} </td>
                                        <td>  {this.state.watchlistStocks[4].high} </td>
                                        <td><Button>Remove</Button></td>
                                        </tr>
                                </tbody>
                            </Table>
                        </Card>

                    </div>
                    <Card color={`secondary`} inverse className="newcard text-light">

                        <div>
<p></p>
                            <h4 className="text-light">Stock Market Chart</h4>

                            <LineChart

                                width={850}
                                height={360}
                                margin={{top: 35, right: 30, left: 20, bottom: 5}}
                                data={this.state.stocks}
                            >

                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date" stroke="white"
                                       label={{value: "Date", position: "insideBottomRight", dy: 10}}/>
                                <YAxis dataKey="close" stroke="white"
                                       label={{value: "Close", position: "insideleft", angle: -90, dy: -30}}/>
                                <Line dot={false} type="monotone" dataKey="close" stroke="rgb(0,200,5)"/>
                                <Tooltip/>
                                <Line type="monotone" dataKey="date" stroke="#8884d8" activeDot={{r: 8}}/>


                            </LineChart>
                        </div>
                    </Card>
                </div>
            </div>


        );


    }

}

let cookiedHome = withCookies(Home);
export {cookiedHome as Home};