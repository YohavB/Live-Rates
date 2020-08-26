import React, { Component } from "react";

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
      <div>
        <div>
          <input
            type="text"
            value={search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <button onClick={() => this.sortBy("currency")}>
                  Currency
                </button>
              </th>
              <th>
                <button onClick={() => this.sortBy("rate")}>Rate</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("bid")}>Bid</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("ask")}>Ask</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("high")}>High</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("low")}>Low</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("open")}>Open</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("close")}>Close</button>
              </th>
              <th>
                <button onClick={() => this.sortBy("timestamp")}>Time</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterCurrency.map((row) => (
              <tr>
                <td>{row.currency}</td>
                <td>{row.rate}</td>
                <td>{row.bid}</td>
                <td>{row.ask}</td>
                <td>{row.high}</td>
                <td>{row.low}</td>
                <td>{row.open}</td>
                <td>{row.close}</td>
                <td>{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RatesTable;
