import React, { Component } from "react";
import RatesTable from "./components/RatesTable";
//import data from "./data/rates.json";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isLoaded: false,
    };
  }
  
//https://www.live-rates.com/rates
  async componentDidMount() {
    const result = await fetch("https://www.live-rates.com/rates?key=011a82a9eb");
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
        <div className="App">
          <div>Data has been loaded</div>

          <RatesTable data={data} />
        </div>
      );
    }
  }
}

export default App;
