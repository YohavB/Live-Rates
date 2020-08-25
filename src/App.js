import React, { Component } from "react";
import RatesTable from "./components/RatesTable";
import data from "./data/rates.json";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      isLoaded: false,
      sort: "asc",
    };
    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(key) {
    console.log(key);
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
        [key]: this.state.sort[key] === "asc" ? "desc" : "asc",
      },
    });
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          data: data,
        });
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
          <RatesTable data={data} sortBy={this.sortBy} />
        </div>
      );
    }
  }
}

export default App;
