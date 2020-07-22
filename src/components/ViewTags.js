import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoopCircleLoading } from "react-loadingg";
import Moment from "react-moment";

import PopularTags from "./PopularTags";

import * as URL from "./../utils/api_urls";

class ViewTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: "",
      tagData: [],
      pageNum: 1,
      maxPages: 1000,
      tag: this.props.tag.replace(/\+/g, "/"),
    };
    this.handleFirst = this.handleFirst.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.getData = this.getData.bind(this);
  }

  async getData() {
    const tags_url =
      URL.APIUrl +
      this.state.tag +
      "?page=" +
      this.state.pageNum +
      "&page-size=10&show-fields=trailText,thumbnail&api-key=" +
      URL.api_key;
    // console.log("Tag Url: ", tags_url);
    const response = await fetch(tags_url);
    const data = await response.json();
    await this.setState({
      tagData: data.response.results,
      maxPages: data.response.pages,
      loading: false,
      message: "",
    });
    // console.log("Tags: ", this.state.tagData);
  }

  async componentDidMount() {
    try {
      this.getData();
    } catch (err) {
      this.setState({ status: "fail", loading: true, message: err.message });
      console.log("Error Tags: ", err.message);
    }
  }

  async handleNext() {
    await this.setState({ pageNum: this.state.pageNum + 1 });
    this.getData();
    this.forceUpdate();
  }

  async handlePrevious() {
    await this.setState({ pageNum: this.state.pageNum - 1 });
    this.getData();
    this.forceUpdate();
  }

  async handleFirst() {
    await this.setState({ pageNum: 1 });
    this.getData();
    this.forceUpdate();
  }

  async handleLast() {
    await this.setState({ pageNum: this.state.maxPages });
    this.getData();
    this.forceUpdate();
  }

  render() {
    return !this.state.loading ? (
      <div>
        <h4 className="display-4 text-center">
          {" "}
          {this.state.tag.replace(/\//g, "-").toUpperCase()}
        </h4>
        <div className="mag-breadcrumb py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa fa-home" aria-hidden="true"></i> Home
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {this.state.tag.toUpperCase()}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="archive-post-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-xl-8">
                {this.state.loading && this.state.message.length > 0 ? (
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                ) : null}
                <div className="archive-posts-area bg-white p-30 mb-30 box-shadow">
                  {this.state.tagData.map((i) => {
                    return (
                      <div
                        className="single-catagory-post d-flex flex-wrap"
                        key={i.id}
                      >
                        <div
                          className="post-thumbnail bg-img"
                          style={{
                            backgroundImage: `url(${i.fields.thumbnail})`,
                          }}
                        ></div>

                        <div className="post-content">
                          <div className="post-meta">
                            <Moment>{i.webPublicationDate}</Moment>
                            <Link to={"/" + i.sectionId}>{i.sectionName}</Link>
                          </div>
                          <Link
                            to={"/item/" + i.id.replace(/\//g, "+")}
                            className="post-title"
                          >
                            {i.webTitle}
                          </Link>

                          <p>{i.fields.trailText}</p>
                        </div>
                      </div>
                    );
                  })}

                  <nav>
                    <ul className="pagination">
                      {this.state.pageNum <= 1 ? null : (
                        <li className="page-item" onClick={this.handlePrevious}>
                          <a className="page-link" href="#section">
                            <i className="ti-angle-left"></i>
                          </a>
                        </li>
                      )}

                      {this.state.pageNum <= 2 ? null : (
                        <li className="page-item" onClick={this.handleFirst}>
                          <a className="page-link" href="#section">
                            First
                          </a>
                        </li>
                      )}

                      <li className="page-item active">
                        <a className="page-link" href="#section">
                          {this.state.pageNum}
                        </a>
                      </li>

                      {/* {this.state.pageNum >= this.state.maxPages ? null : (
                      <li className="page-item" onClick={this.handleLast}>
                        <a className="page-link" href="#section">
                          Last
                        </a>
                      </li>
                      )} */}

                      {this.state.pageNum >= this.state.maxPages ? null : (
                        <li className="page-item" onClick={this.handleNext}>
                          <a className="page-link" href="#section">
                            <i className="ti-angle-right"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                <PopularTags />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <LoopCircleLoading />
    );
  }
}

export default ViewTags;
