import React, { Component } from "react";
import style from "./RatesTable.module.css";

import moment from "moment";

import down_icon from "../asset/down.svg";

class RatesTable extends Component {
  state = {
    search: "",
    sort: "asc",
  };

  updateSearch = (event) => {
    this.setState({ search: event.target.value });
    console.log( this.state.search)
  };

  sortBy = (key) => {
    const { sort } = this.state;

    const { data } = this.props;

    this.setState({
      data: data.sort((a, b) => {
        if (sort[key] === "asc") {
          if (key === "currency") {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] - b[key];
          }
        } else {
          if (key === "currency") {
            return b[key] > a[key] ? 1 : -1;
          } else {
            return b[key] - a[key];
          }
        }
      }),

      sort: {
        [key]: sort[key] === "asc" ? "desc" : "asc",
      }
    });
  };

  getFormatedTime = (timestamp) => {
    return moment(+timestamp).format(" HH:mm:ss ");
  };

  render() {
    const { data } = this.props;

    const { search } = this.state;

    const filterCurrency = data.filter((data) => {
      return (
        data.currency.toLowerCase().indexOf(search.toLowerCase()) !== -1 
      );
    });

    if (!data) {
      return <div>Waiting for Data ... </div>;
    } else {
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
                  Currency <img className={style.icon} alt="" src={down_icon} />{" "}
                </th>
                <th onClick={() => this.sortBy("rate")}>
                  Rate <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("bid")}>
                  Bid <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("ask")}>
                  Ask <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("high")}>
                  High <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("low")}>
                  Low <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("open")}>
                  Open <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("close")}>
                  Close <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => this.sortBy("timestamp")}>
                  Update at{" "}
                  <img className={style.icon} alt="" src={down_icon} />
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
                  <td>{this.getFormatedTime(row.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
export default RatesTable;
