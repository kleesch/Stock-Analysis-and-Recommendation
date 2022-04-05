import React, {Component} from "react";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import {Navigate} from "react-router-dom";
import {Button, Table} from "reactstrap";
import './recommendations.css'


class Recommendations extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get("token") ?? false,
            username: this.props.cookies.get("username") ?? null,
            buyInfo: null,
            sellInfo: null,
            navigateTo: null,
            loading: true
        }
        this.percentFormatter = new Intl.NumberFormat('default', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    async loadData() {
        if (this.state.username === null) {
            return
        }
        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Token ${this.state.token}`
            })
        }

        let alphabeticalSort = (a, b) => {
            if (a.ticker < b.ticker) {
                return -1;
            }
            if (a.ticker > b.ticker) {
                return 1;
            }
            return 0
        }

        let buyRecommendationsRequest = await fetch(`api/recommendedstocks/getRecommendedBuys`, requestOptions)
        let buyRecommendations = await buyRecommendationsRequest.json();
        buyRecommendations.sort(alphabeticalSort)

        let sellRecommendationsRequest = await fetch(`api/recommendedstocks/getRecommendedSells`, requestOptions)
        let sellRecommendations = await sellRecommendationsRequest.json();
        sellRecommendations.sort(alphabeticalSort)

        this.setState({
            buyInfo: buyRecommendations,
            sellInfo: sellRecommendations
        })
    }


    componentDidMount() {
        this.loadData().then(() => {
            this.setState({
                loading: false
            })
        });
    }

    renderTable() {
        return (
            <div className={`recommendations-div`}>
                <h3 className={`text-light recommendations-header`}>
                    Overall Recommendations
                </h3>
                <p className={`text-light recommendations-header-subtext`}>
                    Lists all stocks recommended to be bought or sold.
                </p>
                <div className={`recommendation-table-container`}>
                    <div className={`recommendations-table`}>
                        <Table dark striped>
                            <thead>
                            <tr>
                                <th className={`recommendation-table-header`}>
                                    Stocks To Buy
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.buyInfo.map((elem) => {
                                    return (
                                        <tr>
                                            <td style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <b style={{width: "50%"}}>
                                                    {elem.ticker}
                                                </b>
                                                <span style={{width: "40%", textAlign: "right", paddingRight: "10px"}}>
                                                    [{this.percentFormatter.format(elem.average_return)} AHR]
                                                </span>

                                                <Button size={`sm`} color={`success`} onClick={() => {
                                                    this.setState({navigateTo: elem.ticker})
                                                }}>
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </div>

                    <div className={`recommendations-table`}>
                        <Table dark striped>
                            <thead>
                            <tr>
                                <th className={`recommendation-table-header`}>
                                    Stocks To Sell
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.sellInfo.map((elem) => {
                                    return (
                                        <tr>
                                            <td style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <b style={{width: "50%"}}>
                                                    {elem.ticker}
                                                </b>
                                                <span style={{width: "40%", textAlign: "right", paddingRight: "10px"}}>
                                                    [{this.percentFormatter.format(elem.average_return)} AHR]
                                                </span>

                                                <Button size={`sm`} color={`success`} onClick={() => {
                                                    this.setState({navigateTo: elem.ticker})
                                                }}>
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>


            </div>
        )
    }

    render() {
        if (this.state.loading) { // If data is still loading
            return ( // Display a loading page
                <p className={`text-light`}>
                    Loading...
                </p>
            )
        } else if (this.state.username === null) { // If user is not logged in
            return (
                <Navigate to={`/login`} push/> // Direct them to login
            )
        } else if (this.state.navigateTo !== null) {
            return (
                <Navigate to={`/homepage?ticker=${this.state.navigateTo}`} push/>
            )
        } else { // If all criteria is met, render the table!
            return this.renderTable();
        }
    }
}

let cookiedRecommendations = withCookies(Recommendations);
export {cookiedRecommendations as Recommendations}