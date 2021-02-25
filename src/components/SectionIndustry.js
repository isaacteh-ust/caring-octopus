import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { htmlToReact, withPrefix } from "../utils";

const InnerDiv = styled.div`
  max-width: 1024px;
  margin: auto;
`;

export default class SectionIndustry extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    return (
      <section
        id={_.get(section, "section_id", null)}
        className={
          "block industry-block bg-" +
          _.get(section, "background", null) +
          " outer"
        }
      >
        <InnerDiv>
          <div className="industry-block">
            {_.get(section, "subtitle", null) && (
              <p className="block-subtitle">
                {htmlToReact(_.get(section, "subtitle", null))}
              </p>
            )}
            {_.get(section, "title", null) && (
              <h2 className="block-title">{_.get(section, "title", null)}</h2>
            )}
            {_.get(section, "content", null) && (
              <h2 className="block-content">
                {_.get(section, "content", null)}
              </h2>
            )}
          </div>
          {_.get(section, "reviews", null) && (
            // <div className="">
            <div className="grid">
              {_.map(_.get(section, "reviews", null), (review, review_idx) => (
                <div key={review_idx} className="cell industry">
                  {_.get(review, "background", null) && (
                    <img
                      className="industry-avatar"
                      alt=""
                      src={withPrefix(_.get(review, "background", null))}
                    />
                  )}

                  <div className="industry-footer">
                    <p className="industry-text">
                      {htmlToReact(_.get(review, "title", null))}
                    </p>
                    <p className="industry-subtitle">
                      {htmlToReact(_.get(review, "subtitle", null))}
                    </p>
                  </div>
                </div>
              ))}
              {/* </div> */}
            </div>
          )}
        </InnerDiv>
      </section>
    );
  }
}
