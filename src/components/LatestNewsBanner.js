import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoopCircleLoading } from "react-loadingg";
import Moment from "react-moment";

import * as URL from "./../utils/api_urls";

class LatestNewsBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      latestNews: [],
    };
  }

  async componentDidMount() {
    try {
      const latest_news_url = URL.LatestNews;
      const response = await fetch(latest_news_url);
      const data = await response.json();
      await this.setState({ latestNews: data.response.results });
    //   console.log("Latest: ", this.state.latestNews);
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: true, message: err.message });
      console.log("Error: ", err.message);
    }
  }

  render() {
    return !this.state.loading ? (
      <div className="hero-area owl-carousel">
        {this.state.latestNews.map((i, index) => {
          return (
            <div
              className="hero-blog-post bg-img bg-overlay"
              style={{
                backgroundImage: `url(${i.fields.thumbnail})`,
              }}
              key={index}
            >
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-12">
                    <div className="post-content text-center">
                      <div
                        className="post-meta"
                        data-animation="fadeInUp"
                        data-delay="100ms"
                      >
                        <Moment>{i.webPublicationDate}</Moment>
                        <Link to={"/" + i.sectionId}>{i.sectionName}</Link>
                      </div>
                      <Link
                        to={"/item/" + i.id.replace(/\//g, "+")}
                        className="post-title"
                        data-animation="fadeInUp"
                        data-delay="300ms"
                      >
                        {i.webTitle}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <LoopCircleLoading />
    );
  }
}

export default LatestNewsBanner;
