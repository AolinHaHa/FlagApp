import React, { Component } from "react";
import data from "./data.json";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      showFlag: false,
      showPanel: false,
      selected: [],
      showOptions: false,
      query: "",
      selectedContinent: false,
      popupVisible: false
    };
  }

  showOptions = () => {
    this.setState({ showOptions: true });
  };
  hideOptions = () => {
    this.setState({ showOptions: false });
  };

  inputOnChange = e => {
    this.setState({ query: e.target.value });
  };

  continentOnClick = val => {
    this.props.onContinentFilterChange(val);
    this.setState({
      selectedContinent: val
    });
    this.hideOptions();
  };

  onNothingClick = e => {
    var currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.hideOptions();
      }
    }, 0);
  };

  render() {
    const { data, showOptions, query, selectedContinent } = this.state;
    const { isContinentBox, title, subTitle, continentFilter } = this.props;
    const ContinentDropdown = (
      <div className="continentDropdown dropDown ">
        {data
          .filter(item =>
            item.continent.toLowerCase().includes(query.toLowerCase())
          )
          .map(item => (
            <li
              className="item"
              onClick={() => this.continentOnClick(item.continent)}
            >
              {item.continent}
            </li>
          ))}
      </div>
    );

    return (
      <div className="inputCard">
        <p>{title}</p>
        <p>{subTitle}</p>
        <input
          className="searchBoxInput"
          onFocus={this.showOptions}
          onChange={this.inputOnChange}
        ></input>

        {showOptions && isContinentBox && ContinentDropdown}

        {showOptions && !isContinentBox && (
          <div
            className="dropDown countryDropdown"
            onBlur={this.onNothingClick}
          >
            {data
              .filter(item =>
                item.continent
                  .toLowerCase()
                  .includes(continentFilter.toLowerCase())
              )[0]
              .countries.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
              )
              .map(item => (
                <li>
                  <input
                    className=""
                    onChange={() => this.props.modifySelection(item.flag)}
                    type="checkbox"
                    checked={this.props.countryChecked(item.flag)}
                  ></input>{" "}
                  {item.name}
                </li>
              ))}
          </div>
        )}

        {selectedContinent && (
          <div className="selectedContinent">
            <p>You selected</p>
            <p>{selectedContinent}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBox;
