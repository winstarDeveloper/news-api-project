import React from "react";
import { Link } from "react-router-dom";

const PopularTags = () => {
  return (
    <div className="post-sidebar-area right-sidebar mt-30 mb-30 box-shadow">
      <div className="single-sidebar-widget p-30">
        <div className="section-heading">
          <h5>Popular Tags</h5>
        </div>

        <ul className="catagory-widgets">
          <li>
            <span>
              <Link to={"/tag/business+series+the-age-of-amazon"}>
                The Age of Amazon
              </Link>
            </span>
          </li>
          <li>
            <span>
              <Link to={"/tag/us-news+donaldtrump"}>Donald Trump</Link>
            </span>{" "}
          </li>
          <li>
            <span>
              <Link to={"/tag/technology+elon-musk"}>Elon Musk</Link>
            </span>{" "}
          </li>
          <li>
            <span>
              <Link to={"/tag/games+fortnite"}>Fortnite</Link>
            </span>{" "}
          </li>
          <li>
            <span>
              <Link to={"/tag/us-news+series+coronavirus-life"}>
                Life in the time of Corona
              </Link>
            </span>{" "}
          </li>
          <li>
            <span>
              <Link to={"/tag/sport+force-india"}>Force India</Link>
            </span>{" "}
          </li>
          <li>
            <span>
              <Link to={"/tag/business+global-economy"}>Global Economy</Link>
            </span>{" "}
          </li>
        </ul>
      </div>

      <div className="single-sidebar-widget p-30">
        <div className="section-heading">
          <h5>Info</h5>
        </div>

        <div className="newsletter-form">
          <p>
            Website developed as an Assignment Task for Triveos Internship by
            Prayush Kale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
