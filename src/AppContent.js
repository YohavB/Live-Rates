import React, { Component } from "react";
import RatesTable from "./components/RatesTable";
//import data from "./data/rates.json";
import "./AppContent.css";

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      isLoaded: false,
    };
  }

  //https://www.live-rates.com/rates
  async componentDidMount() {
    const result = await fetch(
      "https://www.live-rates.com/rates?key=011a82a9eb"
    );
    this.setState({
      isLoaded: true,
      data: await result.json(),
    });
  }

  render() {
    const { isLoaded, data } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="title">
            <h1>Live Rates</h1>Data has been loaded
          </div>
          <div className="table">
            <RatesTable data={data} />
          </div>
        </div>
      );
    }
  }
}

export default AppContent;
