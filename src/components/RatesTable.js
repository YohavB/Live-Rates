import React, { Component } from "react";
import "./RatesTable.css";

class RatesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sort: "asc",
    };
    this.sortBy = this.sortBy.bind(this);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  sortBy(key) {
    console.log(key);
    this.setState({
      data: this.props.data.sort((a, b) =>
        this.state.sort[key] === "asc"
          ? key === "currency"
            ? a[key] > b[key]
              ? 1
              : -1
            : a[key] - b[key]
          : key === "currency"
          ? b[key] > a[key]
            ? 1
            : -1
          : b[key] - a[key]
      ),
      sort: {
        [key]: this.state.sort[key] === "asc" ? "desc" : "asc",
      },
    });
  }

  render() {
    const { data } = this.props;

    const { search } = this.state;

    let filterCurrency = data.filter((data) => {
      return data.currency.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div className="container">
        <div className="filterField">
          <input
            type="text"
            value={search}
            onChange={this.updateSearch.bind(this)}
            placeholder="Search Rate "
          />
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => this.sortBy("currency")}>Currency</th>
              <th onClick={() => this.sortBy("rate")}>Rate</th>
              <th onClick={() => this.sortBy("bid")}>Bid</th>
              <th onClick={() => this.sortBy("ask")}>Ask</th>
              <th onClick={() => this.sortBy("high")}>High</th>
              <th onClick={() => this.sortBy("low")}>Low</th>
              <th onClick={() => this.sortBy("open")}>Open</th>
              <th onClick={() => this.sortBy("close")}>Close</th>
              <th onClick={() => this.sortBy("timestamp")}>Time</th>
            </tr>
          </thead>
          <tbody>
            {filterCurrency.map((row) => (
              <tr>
                <td>{row.currency}</td>
                <td>{row.rate}</td>
                <td>{row.bid}</td>
                <td>{row.ask}</td>
                <td className="high">{row.high}</td>
                <td className="low">{row.low}</td>
                <td>{row.open}</td>
                <td>{row.close}</td>
                <td>{row.timestamp * 1000}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RatesTable;
