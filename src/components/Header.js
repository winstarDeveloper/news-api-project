import React, { Component } from "react";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";

import * as URL from "./../utils/api_urls";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sections: [],
      value: "",
      suggestions: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  async componentDidMount() {
    try {
      const all_sections_url = URL.AllSections;
      const response = await fetch(all_sections_url);
      const data = await response.json();
      this.setState({ sections: data.response.results });
      this.setState({ loading: false });
      // console.log("Sections: ", this.state.sections);
    } catch (err) {
      this.setState({ loading: true, message: err.message });
      console.log("Error: ", err.message);
    }
  }

  async handleClick() {
    await this.forceUpdate();
    window.location.reload();
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  async getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    try {
      const suggestions_url =
        URL.APIUrl + "tags?q=" + value + "&page-size=10&api-key=" + URL.api_key;
      const response = await fetch(suggestions_url);
      const data = await response.json();
      this.setState({ suggestions: data.response.results });
      this.setState({ loading: false });
      // console.log("Suggestions: ", this.state.suggestions);
    } catch (err) {
      this.setState({ loading: true, message: err.message });
      console.log("Error: ", err.message);
      return [];
    }

    return inputLength === 0
      ? []
      : this.state.suggestions.map((i) => {
          return { name: i.webTitle, id: i.id };
        });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  renderSuggestion = (suggestion) => <div className="list-group-item" style={{ padding:'20px', width:'100%', cursor:'pointer' }}>
    <Link to={"/tag/" + suggestion.id.replace(/\//g, "+")}>{suggestion.webTitle}</Link>
    </div>;

  getSuggestionValue = suggestion => "";

  render() {
    const inputProps = {
      placeholder: "Search",
      value: this.state.value,
      onChange: this.onChange,
    };

    return (
      <header className="header-area">
        <div className="mag-main-menu" id="sticker">
          <div className="classy-nav-container breakpoint-off">
            <nav className="classy-navbar justify-content-between" id="magNav">
              <a href="/" className="nav-brand font-weight-bold">
                Triveous News
              </a>

              <div className="classy-navbar-toggler">
                <span className="navbarToggler">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>

              <div className="top-meta-data d-flex align-items-center">
                <div className="top-search-area">
                  <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                  />
                </div>
              </div>

              <div className="nav-content d-flex align-items-center">
                <div className="classy-menu">
                  <div className="classycloseIcon">
                    <div className="cross-wrap">
                      <span className="top"></span>
                      <span className="bottom"></span>
                    </div>
                  </div>

                  <div className="classynav">
                    <ul>
                      <li className="active">
                        <a href="/" onClick={this.handleClick}>
                          Home
                        </a>
                      </li>
                      <li>
                        <Link to="/world" onClick={this.handleClick}>
                          World
                        </Link>
                      </li>
                      <li>
                        <Link to="/politics" onClick={this.handleClick}>
                          Politics
                        </Link>
                      </li>
                      <li>
                        <Link to="/business" onClick={this.handleClick}>
                          Business
                        </Link>
                      </li>
                      <li>
                        <Link to="/science" onClick={this.handleClick}>
                          Science
                        </Link>
                      </li>
                      <li>
                        <Link to="/sport" onClick={this.handleClick}>
                          Sports
                        </Link>
                      </li>
                      <li>
                        <Link to="/technology" onClick={this.handleClick}>
                          Tech
                        </Link>
                      </li>
                      <li>
                        <Link to="/travel" onClick={this.handleClick}>
                          Travel
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/healthcare-network"
                          onClick={this.handleClick}
                        >
                          Health
                        </Link>
                      </li>
                      <li>
                        <a href="/">All Tags</a>
                        <div className="megamenu">
                          <ul className="single-mega cn-col-4">
                            {this.state.sections
                              .slice(0, 19)
                              .map((i, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      to={"/" + i.id}
                                      onClick={this.handleClick}
                                    >
                                      {i.webTitle}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>

                          <ul className="single-mega cn-col-4">
                            {this.state.sections
                              .slice(20, 39)
                              .map((i, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      to={"/" + i.id}
                                      onClick={this.handleClick}
                                    >
                                      {i.webTitle}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>

                          <ul className="single-mega cn-col-4">
                            {this.state.sections
                              .slice(40, 59)
                              .map((i, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      to={"/" + i.id}
                                      onClick={this.handleClick}
                                    >
                                      {i.webTitle}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>

                          <ul className="single-mega cn-col-4">
                            {this.state.sections
                              .slice(60, this.state.sections.length - 1)
                              .map((i, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      to={"/" + i.id}
                                      onClick={this.handleClick}
                                    >
                                      {i.webTitle}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
