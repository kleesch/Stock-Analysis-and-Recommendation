﻿import React, {Component} from "react";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import {Navigate} from "react-router-dom";
import {Table} from "reactstrap";
import './watchlist_analytics.css'

class WatchlistAnalytics extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.cookies.get("token") ?? false,
            username: this.props.cookies.get("username") ?? null,
            staff: null,
            watchlistInfo: null,
            loading: true
        }
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
        let staff = await fetch(`api/persons/isStaff/`, requestOptions)
        let staffData = await staff.json()
        
        let watchlistAnalytics = await fetch(`api/watchedstocks/getByFrequency`, requestOptions)

        let watchlistDictionary = await watchlistAnalytics.json();
        watchlistDictionary = JSON.parse(watchlistDictionary)
        
        let watchlistData = []
        for (const [key,value] of Object.entries(watchlistDictionary)) {
            watchlistData.push({
                ticker: key,
                watchers: value
            })
        }
        watchlistData.sort((a, b) => {
            return b.watchers - a.watchers
        })

        this.setState({
            staff: staffData,
            watchlistInfo: watchlistData
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
            <div className={`watchlist-div`}>
                <h3 className={`text-light watchlist-header`}>
                    Watchlist Popularity Index
                </h3>
                <p className={`text-light watchlist-header-subtext`}>
                    Sorted by Most Popular, Descending
                </p>
                <Table dark striped className={`watchlist-table`}>
                    <thead>
                    <tr>
                        <th>
                            Ticker
                        </th>
                        <th>
                            # Users Watching
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.watchlistInfo.map((stock) => {
                            return (<tr key={stock.ticker}>
                                <td>
                                    {stock.ticker}
                                </td>
                                <td>
                                    {stock.watchers}
                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                </Table>
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
        } else if (this.state.staff !== true) { // If user is not a staff member
            return (
                <Navigate to={`/homepage`} push/> // No access, send them to their home page
            )
        } else { // If all criteria is met, render the table!
            return this.renderTable();
        }
    }
}

let cookiedWatchlistAnalytics = withCookies(WatchlistAnalytics);
export {cookiedWatchlistAnalytics as WatchlistAnalytics}