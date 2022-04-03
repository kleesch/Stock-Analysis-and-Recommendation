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
            recommendation: "",
            watchlistStocks: [],
            stocksInWatchlist: null,
            loading: false,
            inputError: false
        };
    }

    async loadWatchlistData() {
        if (this.state.username === null) {
            return;
        }
        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`
            })
        }
        let watchlistData = await fetch(`api/watchedstocks/getByUsername?username=${this.state.username}`, requestOptions)
        if (watchlistData.status === 200) {
            let stocksInWatchlist = new Set();
            watchlistData = await watchlistData.json()
            watchlistData = watchlistData.map((elem) => {
                stocksInWatchlist.add(elem.ticker);
                return {
                    ticker: elem.ticker,
                }
            })
            for (let i = 0; i < watchlistData.length; i++) {
                let recommendationResponse = await fetch(`api/recommendedstocks/getByTicker?ticker=${watchlistData[i].ticker}`, requestOptions)
                recommendationResponse = await recommendationResponse.json();
                watchlistData[i]["recommendation"] = recommendationResponse
            }
            this.setState({
                watchlistStocks: watchlistData,
                stocksInWatchlist: stocksInWatchlist
            })
        }
        return;
    }

    async addToWatchlist(ticker) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                ticker: ticker
            }),
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`,
                'Content-Type': 'application/json'
            })

        }
        let addRequest = await fetch(`api/watchedstocks/`, requestOptions)
        this.loadWatchlistData();
    }

    async removeFromWatchlist(ticker) {
        const requestOptions = {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`,
            })

        }
        let removeRequest = await fetch(`api/watchedstocks/deleteFromWatchlist/?username=${this.state.username}&ticker=${ticker}`, requestOptions)
        this.loadWatchlistData();
    }

    componentDidMount() {
        this.loadWatchlistData().then(() => {
            this.setState({
                loading: false
            })
        });
    }


    tickerInput(e) {
        this.setState({
            tickerInput: e.target.value,
        })
    }

    async lookup(input) {
        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`
            })
        }
        let stockResponse = await fetch(`api/dailystocks/getByTicker?ticker=${input}`, requestOptions)
        if (stockResponse.status === 200) {
            stockResponse = await stockResponse.json();
            stockResponse = await JSON.parse(stockResponse);
            let mapped_stocks = stockResponse.map((elem) => {
                return {"date": elem.fields.date, "close": parseFloat(elem.fields.close)}
            });
            mapped_stocks.reverse()
            let recommendationResponse = await fetch(`api/recommendedstocks/getByTicker?ticker=${input}`, requestOptions)
            if (recommendationResponse.status === 200) {
                recommendationResponse = await recommendationResponse.json();
                this.setState({
                    recommendation: recommendationResponse
                })
            }
            this.setState({
                stocks: mapped_stocks,
                retrievedStock: input,
            })
            return true;
        } else {
            this.inputError()
            return false;
        }
    }

    async quickLookup() {
        this.lookup(this.state.tickerInput)
    }

    async inputError() {
        this.setState({
            inputError: true
        })
        await new Promise(r => setTimeout(r, 3000));
        this.setState({
            inputError: false
        })
    }

    async tickerButton() {
        const input = this.state.tickerInput
        if (this.state.stocksInWatchlist.has(input)) {
            this.inputError()
            return
        }
        const success = await this.lookup(input);
        if (success){
            this.addToWatchlist(input);
        }
    }

    getRecommendationColorClass(recommendation) {
        switch (recommendation) {
            case 'Buy':
                return 'text-lime'
            case 'Hold':
                return 'text-light'
            case 'Sell':
                return 'text-red'
            default:
                return 'text-light'
        }
    }

    render() {
        if (this.state.username === null) {
            return (
                <Navigate to={`/login`} push/>
            )
        }
        if (this.state.loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div className="outerContainer4">
                <div className="innerContainer4">
                    <div className="loginContainer4">
                        <Card className="cardRec text-light" color={`secondary`}>
                            <CardTitle><br></br>Recommendation:</CardTitle>
                            <p className={this.getRecommendationColorClass(this.state.recommendation)}>
                                <b>
                                    {this.state.recommendation === "" ? "None" : this.state.recommendation}
                                </b>
                            </p>

                        </Card>
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Enter Stock Ticker</b>
                                <Input className="firstone" placeholder={``} onChange={this.tickerInput.bind(this)}
                                       value={this.state.tickerInput} invalid={this.state.inputError}
                                       style={{width: "207px"}} tooltip={"test"}/>
                                <div>
                                    <Button className="RecButton" onClick={this.quickLookup.bind(this)}
                                            color={`success`}>
                                        Lookup
                                    </Button>
                                    <Button className="tickerbutton" onClick={this.tickerButton.bind(this)}
                                            color={`primary`}>
                                        Watch
                                    </Button>
                                </div>
                            </CardTitle>
                        </Card>
                        <Card color={`secondary`} inverse className="loginCard4 innerContainerItem4">
                            <CardTitle>
                                <b><i>Stock Watchlist</i></b>
                            </CardTitle>

                            <Table className="text-light">
                                <tbody>
                                {
                                    this.state.watchlistStocks.length > 0 ? (
                                        this.state.watchlistStocks.map(elem => {
                                            return (
                                                <tr key={elem.ticker}>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {elem.ticker}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {elem.recommendation}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => {
                                                            this.lookup(elem.ticker)
                                                        }} color={`success`}>
                                                            Show
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => {
                                                            this.removeFromWatchlist(elem.ticker)
                                                        }} color={`danger`}>
                                                            Delete
                                                        </Button>
                                                    </td>


                                                </tr>
                                            )
                                        })) : (
                                        <div>
                                            Click 'Watch' to Add to Watchlist!
                                        </div>
                                    )

                                }
                                </tbody>
                            </Table>
                        </Card>

                    </div>
                    <Card color={`secondary`} inverse className="newcard text-light" style={{height: "490px"}}>
                        <div>
                            <h4 className={`text-light graph-header`}>{this.state.retrievedStock === "None" ? "Select a Stock To Begin!" : this.state.retrievedStock}</h4>
                            <ResponsiveContainer width={`100%`} height={415}>
                                <LineChart
                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                                    data={this.state.stocks}
                                >

                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="date" stroke="white" angle={-45} height={75} dy={25}
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