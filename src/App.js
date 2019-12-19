import React, { Component } from "react";
import SearchBox from "./SearchBox.js";
import data from "./data.json";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      showFlag: false,
      showPanel: false,
      selected: [],
      showOptions: false,
      query: "",
      continentFilter: ""
    };
  }

  onContinentFilterChange = continent => {
    this.setState({ continentFilter: continent, showFlag: true });
  };

  countryChecked = country => {
    return this.state.selected.includes(country);
  };

  modifySelection = selectedCountry => {
    if (this.state.selected.includes(selectedCountry)) {
      this.setState({
        selected: this.state.selected.filter(
          country => country !== selectedCountry
        )
      });
    } else {
      this.setState({ selected: [...this.state.selected, selectedCountry] });
    }
    return;
  };

  clearFlag = () => {
    this.setState({ selected: [] });
  };

  render() {
    return (
      <div className="App">
        <h3>Flag Picker</h3>
        <h4>This app will help you to learn flags around the world in </h4>
        <h4 className="step">3 steps</h4>

        <div className="cardContainer">
          <SearchBox
            title={"Step 1"}
            subTitle={"Select a continent"}
            onContinentFilterChange={this.onContinentFilterChange}
            isContinentBox={true}
          />

          {(this.state.showFlag && (
            <SearchBox
              title={"Step 2"}
              subTitle={"Select a country"}
              onContinentFilterChange={this.onContinentFilterChange}
              isContinentBox={false}
              continentFilter={this.state.continentFilter}
              countryChecked={this.countryChecked}
              modifySelection={this.modifySelection}
            />
          )) || <div className="inputCard"></div>}

          {(this.state.selected.length > 0 && (
            <div className="inputCard">
              <div>
                <p>Select flags</p>
                {this.state.selected.map(flag => (
                  <span>{flag}</span>
                ))}
              </div>

              <button onClick={this.clearFlag}>Clear Flag</button>
            </div>
          )) || <div className="inputCard"></div>}
        </div>
      </div>
    );
  }
}

export default App;
