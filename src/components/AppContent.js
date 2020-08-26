import React, { Component } from "react";
import RatesTable from "./RatesTable";
import { NewLoader } from "./Loader/Loader";

import style from "./AppContent.module.css";

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoaded: false,
      updateTime: "",
    };
  }

  async componentDidMount() {
    const result = await fetch(
      "https://www.live-rates.com/rates?key=011a82a9eb"
    );
    this.setState({
      isLoaded: true,
      data: await result.json(),
      updateTime: new Date().toString(),
    });
  }

  render() {
    const { isLoaded, data, updateTime } = this.state;

    if (!isLoaded) {
      return <div>{NewLoader("Rings", "#fff", 300)}</div>;
    } else {
      return (
        <div className={style.container}>
          <div className={style.title}>
            <h1>Live Rates</h1>
            <div>Data has been loaded </div>
            <div>Last Update at {updateTime}</div>
          </div>
          <div className={style.table}>
            <RatesTable data={data} />
          </div>
        </div>
      );
    }
  }
}

export default AppContent;
