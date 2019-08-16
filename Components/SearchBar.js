import React, { Component } from "react";
import Input from "./Input";
import api from "../utils/api";
import PBtn from "./PBtn";
import Link from "next/link";
class SearchBar extends Component {
  state = {
    searchBox: ""
  };

  handleChange = e => {
    this.setState({
      searchBox: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <Input
          className="searchBar"
          type="text"
          placeholder="Search"
          name="q"
          onChange={this.handleChange}
        />
        <Link
          as={`/my-blog/${this.state.searchBox}`}
          href={`/my-blog?q=${this.state.searchBox}`}
        >
          <a>
            <PBtn className="icon-button" type="submit">
              <i className="fas fa-search"></i>
            </PBtn>
          </a>
        </Link>
      </form>
    );
  }
}

export default SearchBar;
