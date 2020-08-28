import React, { Component } from "react";
import style from "./RatesTable.module.css";

import moment from "moment";

import down_icon from "../asset/down.svg";

class RatesTable extends Component {
  state = {
    search: "",
  };

  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  getFormatedTime = (timestamp) => {
    return moment(+timestamp).format(" HH:mm:ss ");
  };

  render() {
    const { data, setKey } = this.props;
    const { search } = this.state;

	  if (!data) {
		  return <div>Waiting for Data ... </div>; 
	  }

	  const filterCurrency = data.filter((data) => data.currency.toLowerCase().indexOf(search.toLowerCase()) !== -1);

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
                <th onClick={() => setKey("currency")}>
                  Currency <img className={style.icon} alt="" src={down_icon} />{" "}
                </th>
                <th onClick={() => setKey("rate")}>
                  Rate <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("bid")}>
                  Bid <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("ask")}>
                  Ask <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("high")}>
                  High <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("low")}>
                  Low <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("open")}>
                  Open <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("close")}>
                  Close <img className={style.icon} alt="" src={down_icon} />
                </th>
                <th onClick={() => setKey("timestamp")}>
                  Update at{" "}
                  <img className={style.icon} alt="" src={down_icon} />
                </th>
              </tr>
            </thead>
            <tbody>
              {filterCurrency.map((row) => (
                <tr key={row.currency}>
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
export default RatesTable;
