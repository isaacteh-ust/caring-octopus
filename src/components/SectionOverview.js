import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { htmlToReact, withPrefix } from "../utils";

const MainSection = styled.section`
  &.bg-F2F7F8{
    background-color: #F2F7F8;
    }
`;

const InnerDiv = styled.div`
  max-width: 1160px;
  margin: auto;
`;

const OverviewIndexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  .overview-index {
    font-weight: 500;
    font-size: 50px;
    line-height: 40px;
    color: black;
    margin-right: 10px;
  }
`;


export default class SectionOverview extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    const section_id = _.get(section, "section_id", null);
    return (
      <MainSection
        id={_.get(section, "section_id", null)}
        className={
          "block overview-block bg-" +
          _.get(section, "background", null) +
          " outer"
        }
      >
        <InnerDiv>
          <div className="review-block">
            {_.get(section, "subtitle", null) && (
              <p className="block-subtitle">
                {htmlToReact(_.get(section, "subtitle", null))}
              </p>
            )}
            {_.get(section, "title", null) && (
              <h2 className="block-title">{_.get(section, "title", null)}</h2>
            )}
          </div>
          {_.get(section, "reviews", null) && (
            // <div className="">
            <div className="grid">
              {_.map(_.get(section, "reviews", null), (review, review_idx) => (
                <div key={review_idx} className="cell overview">
                  {_.get(review, "background", null) && (
                    <img
                      className="overview-avatar"
                      alt=""
                      src={withPrefix(_.get(review, "background", null))}
                    />
                  )}

                  <footer className="overview-footer">
                     {_.get(review, "title", null) && (<p className="overview-text">
                        {htmlToReact(_.get(review, "title", null))}
                      </p>)}
                    <OverviewIndexDiv>
                    <div className="overview-index">{ section_id === "swifthome" ? review_idx + 1 : ""}</div>
                      <p className="overview-subtitle">
                        {htmlToReact(_.get(review, "content", null))}
                      </p>
                    </OverviewIndexDiv>
                  </footer>
                </div>
              ))}
            </div>
            // </div>
          )}
        </InnerDiv>
      </MainSection>
    );
  }
}
