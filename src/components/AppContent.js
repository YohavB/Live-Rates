import React, { Component } from "react";
import RatesTable from "./RatesTable";
import { Loader } from "./Loader/Loader";

import moment from "moment";

import scroll from "../asset/scrollup.svg";

import style from "./AppContent.module.css";

class AppContent extends Component {
  state = {
    data: [],
    isLoaded: false,
    updateTime: null,
    time: new Date().toLocaleString(),
  };

  async componentDidMount() {
    const result = await fetch(
      "https://www.live-rates.com/rates?key=011a82a9eb"
    );
    this.setState({
      isLoaded: true,
      data: await result.json(),
      updateTime: new Date().toString(),
    });
    this.intervalID = setInterval(() => this.currentTime(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  currentTime() {
    this.setState({
      time: new Date().toLocaleString(),
    });
  }

  render() {
    const { isLoaded, data, updateTime, time } = this.state;

    if (!isLoaded) {
      return (
        <div>
          <Loader type="Rings" color="#fff" mensuration="300" />
        </div>
      );
    } else {
      return (
        <div className={style.container}>
          <div className={style.title}>
            <h1>Live Rates</h1>
            <div>Last Update {moment(updateTime).fromNow()}</div>{" "}
            <div>{time}</div>
          </div>
          <div className={style.table}>
            <RatesTable data={data} />
            <a href="#">
              <img className={style.scroll} src={scroll} alt="up" />
            </a>
          </div>
        </div>
      );
    }
  }
}

export default AppContent;
