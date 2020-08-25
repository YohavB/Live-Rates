import React, { Component } from "react";

class RatesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    const { sortBy, data } = this.props;

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
                <button onClick={() => sortBy("currency")}>Currency</button>
              </th>
              <th>
                <button onClick={() => sortBy("rate")}>Rate</button>
              </th>
              <th>
                <button onClick={() => sortBy("bid")}>Bid</button>
              </th>
              <th>
                <button onClick={() => sortBy("ask")}>Ask</button>
              </th>
              <th>
                <button onClick={() => sortBy("high")}>High</button>
              </th>
              <th>
                <button onClick={() => sortBy("low")}>Low</button>
              </th>
              <th>
                <button onClick={() => sortBy("open")}>Open</button>
              </th>
              <th>
                <button onClick={() => sortBy("close")}>Close</button>
              </th>
              <th>
                <button onClick={() => sortBy("timestamp")}>Time</button>
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
