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
		asc: true,
		key: '',
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
    this.interval1 = setInterval(() => this.currentTime(), 1000);
    this.interval2 = setInterval(() => this.fetchData(), 1000);
  }

  setKey = (key) => {
	  this.setState(state => ({key, asc: !state.asc}), () => {
		  this.sortData()
	  })

  }

	sortData = (newData) => {
		const { data, asc, key } = this.state;

		const dataToSort = newData || data
		if (!key) {
			return dataToSort
		}

		const sort = () => {
			return dataToSort.sort((a, b) => {
				if (asc) {
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
			})
		}

		this.setState({
			data: sort(),
		});
	};


  fetchData = async () => {
    const liveResult = await fetch(
      "https://www.live-rates.com/rates?key=011a82a9eb"
      );
    const data = await liveResult.json()
    this.sortData(data)
    this.setState({
      updateTime: new Date().toString(),
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
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
            <RatesTable data={data} setKey={this.setKey}/>
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
