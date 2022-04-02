import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert, Table} from "reactstrap";
import {Navigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import "./homepage.css";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
            <Card style={{padding: "5px"}}>
                <div style={{backgroundColor: "white"}}>
                    <p style={{color: "black", marginBottom: "5px"}}>
                        Date: {new Date(label).toLocaleDateString()}
                    </p>
                    <p style={{color: "limegreen", marginBottom: "0px"}}>
                        Close Price: {currencyFormatter.format(payload[0]["value"])}
                    </p>
                </div>
            </Card>
        )
    }
    return null;
}

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
            oldWatchlist.splice(5, 1);
            let mapped_stocks = response.map((elem) => {
                return {"date": elem.fields.date, "close": parseFloat(elem.fields.close)}
            });
            mapped_stocks.reverse()
            console.log(response[response.length - 1]);
            this.setState({
                stocks: mapped_stocks,
                retrievedStock: input,
                watchlistStocks: oldWatchlist,
            })
            console.log(this.state.watchlistStocks)
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
                                {
                                    this.state.watchlistStocks.map(elem => {
                                        return (
                                            <tr>
                                                <td>{elem.ticker}</td>
                                                <td>{currencyFormatter.format(elem.price)}</td>
                                                <td>{currencyFormatter.format(elem.high)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Card>
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Enter stock ticker</b>
                                <Input className="firstone" placeholder={``} onChange={this.tickerInput.bind(this)}
                                       value={this.state.tickerInput}> </Input>
                                <button className="tickerbutton" onClick={this.tickerButton.bind(this)}>Enter</button>
                            </CardTitle>
                        </Card>

                    </div>
                    <Card color={`secondary`} inverse className="newcard">

                        <div>

                            <h4 className={`text-light graph-header`}>{this.state.retrievedStock === "None" ? "Select a Stock To Begin!" : this.state.retrievedStock}</h4>
                            <ResponsiveContainer width={`100%`} height={380}>
                                <LineChart
                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                                    data={this.state.stocks}
                                >

                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="date" stroke="white" angle={-45} height={65} dy={25}
                                           label={{value: "Date", position: "insideBottomLeft", dy: 10}}/>
                                    <YAxis dataKey="close" stroke="white"
                                           label={{
                                               value: "Close Price",
                                               position: "insideBottomLeft",
                                               angle: -90,
                                               dy: -30
                                           }}/>
                                    <Line dot={false} type="monotone" dataKey="close" stroke="rgb(0,200,5)"
                                          strokeWidth={3}/>
                                    <Tooltip content={<CustomTooltip/>}/>
                                    <Line type="monotone" dataKey="date" stroke="#8884d8" activeDot={{r: 8}}/>


                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>


        );


    }

}

let cookiedHome = withCookies(Home);
export
{
    cookiedHome
        as
            Home
}
    ;