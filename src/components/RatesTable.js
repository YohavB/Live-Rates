import React, { Component } from "react";
import style from "./RatesTable.module.css";

import up_icon from "../asset/up.svg";
import down_icon from "../asset/down.svg";

class RatesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      sort: "asc",
      icon: up_icon,
    };
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  sortBy = (key) => {
    const { sort, icon } = this.state;

    const { data } = this.props;

    this.setState({
      data: data.sort((a, b) =>
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
        [key]: sort[key] === "asc" ? "desc" : "asc",
      },
      icon: {
        [key]: icon[key] === "asc" ? down_icon : up_icon,
      },
    });
  };

  render() {
    const { data } = this.props;

    const { search, icon } = this.state;

    let filterCurrency = data.filter((data) => {
      return data.currency.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div className={style.container}>
        <div className={style.filterField}>
          <input
            type="text"
            value={search}
            onChange={this.updateSearch}
            placeholder="Search Rate "
          />
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => this.sortBy("currency")}>
                Currency <img alt="" src={icon} />{" "}
              </th>
              <th onClick={() => this.sortBy("rate")}>
                Rate <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("bid")}>
                Bid <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("ask")}>
                Ask <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("high")}>
                High <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("low")}>
                Low <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("open")}>
                Open <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("close")}>
                Close <img alt="" src={icon} />
              </th>
              <th onClick={() => this.sortBy("timestamp")}>
                Time <img alt="" src={icon} />
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
                <td className={style.high}>{row.high}</td>
                <td className={style.low}>{row.low}</td>
                <td>{row.open}</td>
                <td>{row.close}</td>
                <td>{new Date(row.timestamp).toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RatesTable;
