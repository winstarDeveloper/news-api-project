import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoopCircleLoading } from "react-loadingg";

import PopularTags from "./PopularTags";

import * as URL from "./../utils/api_urls";
import Moment from "react-moment";

class ViewNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: "",
      id: this.props.id.replace(/\+/g, "/"),
      data: null,
    };
  }

  parseHtml = (html) => {
    const el = document.createElement("p");
    el.innerHTML = html;
    return el.textContent || el.innerText || "";
  };

  async componentDidMount() {
    try {
      const details_url =
        URL.APIUrl +
        this.state.id +
        "?format=json&show-fields=headline,byline,lastModified,shortUrl,thumbnail,bodyText,byline&show-tags=contributor&api-key=" +
        URL.api_key;
      const response = await fetch(details_url);
      const data = await response.json();
      await this.setState({
        data: data.response.content,
        loading: false,
        message: "",
      });
    //   console.log("Data: ", this.state.data);
    //   console.log(" id: ", this.state.id);
    } catch (err) {
      this.setState({ status: "fail", loading: true, message: err.message });
      console.log("Error: ", err.message);
    }
  }

  render() {
    return !this.state.loading ? (
      <div>
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
                      {this.state.data.sectionName}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="post-details-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-xl-8">
                {this.state.loading && this.state.message.length > 0 ? (
                  <div class="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                ) : null}
                <div className="post-details-content bg-white mb-30 p-30 box-shadow">
                  <div className="blog-thumb mb-30">
                    <img src={this.state.data.fields.thumbnail} alt="" />
                  </div>
                  <div className="blog-content">
                    <div className="post-meta">
                      <Moment>{this.state.data.webPublicationDate}</Moment>
                      <Link to={"/section/" + this.state.data.sectionId}>
                        {this.state.data.sectionName}
                      </Link>
                    </div>
                    <a
                      href={this.state.data.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h4 className="post-title">{this.state.data.webTitle}</h4>
                    </a>

                    <p>{this.state.data.fields.bodyText}</p>

                    {this.state.data.tags.map((i, index) => {
                      return (
                        <div
                          className="post-author d-flex align-items-center"
                          key={index}
                        >
                          <div className="post-author-thumb">
                            <img src={i.bylineImageUrl} alt="" />
                          </div>
                          <div className="post-author-desc pl-4">
                            <a
                              href={i.webUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="author-name"
                            >
                              {i.webTitle}
                            </a>
                            {this.parseHtml(i.bio)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                <PopularTags />
              </div>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <LoopCircleLoading />
    );
  }
}

export default ViewNews;
