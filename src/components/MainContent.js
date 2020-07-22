import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { LoopCircleLoading } from "react-loadingg";

import PopularTags from './PopularTags';

import * as URL from "./../utils/api_urls";

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: "",
      popularContent: [],
      latestNews: [],
      worldNews: [],
      businessNews: [],
      techNews: [],
      about: []
    };
  }

  async componentDidMount() {
    try {
      const popular_news_url = URL.PopularNews;
      let response = await fetch(popular_news_url);
      let data = await response.json();
      await this.setState({ popularContent: data.response.results });
      // console.log("Popular: ", this.state.popularContent);

      const latest_news_url = URL.LatestNews;
      response = await fetch(latest_news_url);
      data = await response.json();
      await this.setState({ latestNews: data.response.results });
      // console.log("Latest: ", this.state.latestNews);

      const world_news_url =
        URL.APIUrl +
        "search?section=world&order-by=newest&page-size=15&show-fields=thumbnail&show-blocks=body:latest:1&api-key=" +
        URL.api_key;
      response = await fetch(world_news_url);
      data = await response.json();
      await this.setState({ worldNews: data.response.results });
      // console.log("World: ", this.state.worldNews);

      const business_news_url =
        URL.APIUrl +
        "search?section=business&order-by=newest&page-size=15&show-fields=thumbnail&show-blocks=body:latest:1&api-key=" +
        URL.api_key;
      response = await fetch(business_news_url);
      data = await response.json();
      await this.setState({ businessNews: data.response.results });
      // console.log("Business: ", this.state.businessNews);

      const tech_news_url =
        URL.APIUrl +
        "search?section=technology&order-by=newest&page-size=15&show-fields=thumbnail&show-blocks=body:latest:1&api-key=" +
        URL.api_key;
      response = await fetch(tech_news_url);
      data = await response.json();
      await this.setState({ techNews: data.response.results });
      // console.log("Tech: ", this.state.techNews);

      const about_url =
        URL.APIUrl +
        "search?section=about&order-by=newest&page-size=15&show-fields=thumbnail&show-blocks=body:latest:1&api-key=" +
        URL.api_key;
      response = await fetch(about_url);
      data = await response.json();
      await this.setState({ about: data.response.results });
      // console.log("About: ", this.state.about);

      this.setState({ loading: false, message:'' });
    } catch (err) {
      this.setState({ loading: true, message: err.message });
      console.log("Error: ", err.message);
    }
  }

  render() {
    return (
      <section className="mag-posts-area d-flex flex-wrap">
        <div className="post-sidebar-area left-sidebar mt-30 mb-30 bg-white box-shadow">
          {!this.state.loading ? (
            <div className="single-sidebar-widget p-30">
              <div className="section-heading">
                <h5>Most Popular</h5>
              </div>
              {this.state.popularContent.map((i, index) => {
                return (
                  <div className="single-blog-post d-flex" key={index}>
                    <div className="post-thumbnail">
                      <img src={i.fields.thumbnail} alt="" />
                    </div>
                    <div className="post-content">
                      <Link
                        to={"/item/" + i.id.replace(/\//g, "+")}
                        className="post-title"
                      >
                        {i.webTitle}
                      </Link>
                      <div className="post-meta d-flex justify-content-between">
                        {i.fields.byline}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <LoopCircleLoading />
          )}
          {
            // <div className="single-sidebar-widget">
            //   <a href="/" className="add-img">
            //     <img src={require("./../mag/img/bg-img/add.png")} alt="" />
            //   </a>
            // </div>
          }
        </div>

        <div className="mag-posts-content mt-30 mb-30 p-30 box-shadow">
        {this.state.loading && this.state.message.length > 0 ? (
          <div class="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        ) : null}
          <div className="feature-video-posts mb-30">
            <div className="section-heading">
              <h5>Latest</h5>
            </div>
            <div className="featured-video-posts">
              <div className="row">
                <div className="col-12 col-lg-7">
                  {!this.state.loading ? (
                    <div className="single-featured-post">
                      <div className="post-thumbnail mb-50">
                        <img
                          src={this.state.latestNews[0].fields.thumbnail}
                          alt=""
                        />
                      </div>

                      <div className="post-content">
                        <div className="post-meta">
                          <Moment>
                            {this.state.latestNews[0].webPublicationDate}
                          </Moment>

                          <Link to={"/section/" + this.state.latestNews[0].sectionId}>
                            {this.state.latestNews[0].sectionName}
                          </Link>
                        </div>
                        <Link
                          to={
                            "/item/" +
                            this.state.latestNews[0].id.replace(/\//g, "+")
                          }
                          className="post-title"
                        >
                          {this.state.latestNews[0].webTitle}
                        </Link>
                        {/* <p>
           {this.state.worldNews[0].blocks.requestedBodyBlocks['body:latest:1'][0].bodyTextSummary}
           </p> */}
                      </div>
                    </div>
                  ) : (
                    <LoopCircleLoading />
                  )}
                </div>

                <div className="col-12 col-lg-5">
                  <div className="featured-video-posts-slide owl-carousel">
                    <div className="single--slide">
                      {this.state.latestNews.slice(1, 7).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="single--slide">
                      {this.state.latestNews.slice(8, 14).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-video-posts mb-30">
            <div className="section-heading">
              <h5>World</h5>
            </div>
            <div className="featured-video-posts">
              <div className="row">
                <div className="col-12 col-lg-5">
                  <div className="featured-video-posts-slide owl-carousel">
                    <div className="single--slide">
                      {this.state.worldNews.slice(1, 7).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="single--slide">
                      {this.state.worldNews.slice(8, 14).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-7">
                  {!this.state.loading ? (
                    <div className="single-featured-post">
                      <div className="post-thumbnail mb-50">
                        <img
                          src={this.state.worldNews[0].fields.thumbnail}
                          alt=""
                        />
                      </div>

                      <div className="post-content">
                        <div className="post-meta">
                          <Moment>
                            {this.state.worldNews[0].webPublicationDate}
                          </Moment>

                          <Link to={"/section/" + this.state.worldNews[0].sectionId}>
                            {this.state.worldNews[0].sectionName}
                          </Link>
                        </div>
                        <Link
                          to={
                            "/item/" +
                            this.state.worldNews[0].id.replace(/\//g, "+")
                          }
                          className="post-title"
                        >
                          {this.state.worldNews[0].webTitle}
                        </Link>
                        {/* <p>
           {this.state.worldNews[0].blocks.requestedBodyBlocks['body:latest:1'][0].bodyTextSummary}
           </p> */}
                      </div>
                    </div>
                  ) : (
                    <LoopCircleLoading />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="feature-video-posts mb-30">
            <div className="section-heading">
              <h5>Business</h5>
            </div>
            <div className="featured-video-posts">
              <div className="row">
                <div className="col-12 col-lg-7">
                  {!this.state.loading ? (
                    <div className="single-featured-post">
                      <div className="post-thumbnail mb-50">
                        <img
                          src={this.state.businessNews[0].fields.thumbnail}
                          alt=""
                        />
                      </div>

                      <div className="post-content">
                        <div className="post-meta">
                          <Moment>
                            {this.state.businessNews[0].webPublicationDate}
                          </Moment>

                          <Link to={"/section/" + this.state.businessNews[0].sectionId}>
                            {this.state.businessNews[0].sectionName}
                          </Link>
                        </div>
                        <Link
                          to={
                            "/item/" +
                            this.state.businessNews[0].id.replace(/\//g, "+")
                          }
                          className="post-title"
                        >
                          {this.state.businessNews[0].webTitle}
                        </Link>
                        {/* <p>
           {this.state.worldNews[0].blocks.requestedBodyBlocks['body:latest:1'][0].bodyTextSummary}
           </p> */}
                      </div>
                    </div>
                  ) : (
                    <LoopCircleLoading />
                  )}
                </div>

                <div className="col-12 col-lg-5">
                  <div className="featured-video-posts-slide owl-carousel">
                    <div className="single--slide">
                      {this.state.businessNews.slice(1, 7).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="single--slide">
                      {this.state.businessNews.slice(8, 14).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-video-posts mb-30">
            <div className="section-heading">
              <h5>Technology</h5>
            </div>
            <div className="featured-video-posts">
              <div className="row">
                <div className="col-12 col-lg-5">
                  <div className="featured-video-posts-slide owl-carousel">
                    <div className="single--slide">
                      {this.state.techNews.slice(1, 7).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="single--slide">
                      {this.state.techNews.slice(8, 14).map((i, index) => {
                        return (
                          <div
                            className="single-blog-post d-flex style-3"
                            key={index}
                          >
                            <div className="post-thumbnail">
                              <img src={i.fields.thumbnail} alt="" />
                            </div>
                            <div className="post-content">
                              <Link
                                to={"/item/" + i.id.replace(/\//g, "+")}
                                className="post-title"
                              >
                                {i.webTitle}
                              </Link>
                              <div className="post-meta d-flex">
                                <Moment>{i.webPublicationDate}</Moment>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-7">
                  {!this.state.loading ? (
                    <div className="single-featured-post">
                      <div className="post-thumbnail mb-50">
                        <img
                          src={this.state.techNews[0].fields.thumbnail}
                          alt=""
                        />
                      </div>

                      <div className="post-content">
                        <div className="post-meta">
                          <Moment>
                            {this.state.techNews[0].webPublicationDate}
                          </Moment>

                          <Link to={"/section/" + this.state.techNews[0].sectionId}>
                            {this.state.techNews[0].sectionName}
                          </Link>
                        </div>
                        <Link
                          to={
                            "/item/" +
                            this.state.techNews[0].id.replace(/\//g, "+")
                          }
                          className="post-title"
                        >
                          {this.state.techNews[0].webTitle}
                        </Link>
                        {/* <p>
           {this.state.worldNews[0].blocks.requestedBodyBlocks['body:latest:1'][0].bodyTextSummary}
           </p> */}
                      </div>
                    </div>
                  ) : (
                    <LoopCircleLoading />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="section-heading">
            <h5>About</h5>
          </div>

          {!this.state.loading ? (
            <div className="row">
              {this.state.about.map((i, index) => {
                return (
                  <div className="col-12 col-lg-6" key={index}>
                    <div className="single-blog-post d-flex style-3 mb-30">
                      <div className="post-thumbnail">
                        <img
                          src={require("./../mag/img/bg-img/33.jpg")}
                          alt=""
                        />
                      </div>
                      <div className="post-content">
                        <Link
                          to={"/item/" + i.id.replace(/\//g, "+")}
                          className="post-title"
                        >
                          {i.webTitle}
                        </Link>
                        <div className="post-meta d-flex">
                          <Moment>{i.webPublicationDate}</Moment>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <LoopCircleLoading />
          )}
        </div>

            <PopularTags />
      </section>
    );
  }
}

export default MainContent;
