import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { withPrefix, markdownify, classNames } from "../utils";
import CtaButtons from "./CtaButtons";

const OuterDiv = styled.div`
  background-color: #006e74;
  margin-bottom: 40px;
`;

const BannerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #006e74;
  margin: auto;
  padding-right: 20px;
  max-width: 1200px;
  height: 430px;
  @media only screen and (max-width: 801px) {
    flex-wrap: wrap;
    height: 580px;
    padding: 0 25px;
    padding-top: 30px;
    &.Solutions{
      padding-top: 50px;
    }
  }

`;

const InfoboxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #006e74;
  margin-top: 0 px;
  width: 100%;
  height: 290px;
  padding-right:55px;
  .banner-page-title {
    color: white;
    font-weight: 800;
    font-size: 12px;
    line-height: 24px;
    padding-bottom: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: "fort-bold";
  }

  .banner-title {
    color: white;
    font-size: 42px;
    font-weight: 300;
    letter-spacing: normal;
    line-height: 1.11;
    font-size: 2.25rem;
  }
  .banner-title.content p{
    color: white;
    font-weight: 300;
    letter-spacing: normal;
    line-height: 1.11;
    font-size: 2.4rem;
    margin: 0 0 0.3em;
  }
  .banner-content{
    color: white;
    width: 75%;
    font-size: 22px;
    line-height: 30px;
  }
  .block-buttons{
    margin: 0px;
  }
  @media only screen and (max-width: 801px) {
    height: 200px;
    width: 100%;
    justify-content: center;
    .banner-page-title {
      color: white;
      font-weight: 800;
      font-size: 15px;
      padding-top: 60px;
    }
    .banner-title {
      font-size: 30px;
      line-height: 1.11;
      letter-spacing: normal;
    }
    .banner-content{
      color: white;
      width: 120%;
      font-size: 20px;
      line-height: 25px;
    }
  }
`;

const BannerImg = styled.img`
  width: 380px;
  height: 300px;
  position: relative;
  top: 120px;
  left: 15px;
  @media only screen and (max-width: 801px) {
    position: relative;
    top: 80px;
    left: 40px;
    width: 90%;
    height: auto;
  }
`;

export default class SectionHero extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    let content = _.get(section, "content", null);
    let title = _.get(this.props, "pageContext.frontmatter.title", null)
    console.log('title is ', title)
    return (
      <OuterDiv id={_.get(section, "section_id", null)}>
        <BannerDiv className={title}>
          <InfoboxDiv>
            {_.get(section, "pageTitle", null) && (
              <div className="banner-page-title">
                {_.get(section, "pageTitle", null)}
              </div>
            )}
            {_.get(section, "title", null) && (
              <div className={classNames({"banner-title": true, "content": content})}>
                {markdownify(_.get(section, "title", null))}
              </div>
            )}
            {_.get(section, "content", null) && (
              <div className="banner-content">
                {markdownify(_.get(section, "content", null))}
              </div>
            )}
            {/* <div className="block-copy">
            {markdownify(_.get(section, "content", null))}
          </div> */}
            {_.get(section, "actions", null) && (
              <div className="block-buttons ">
                <CtaButtons
                  {...this.props}
                  actions={_.get(section, "actions", null)}
                />
              </div>
            )}
          </InfoboxDiv>
          <div>
            <BannerImg
              src={withPrefix(_.get(section, "image", null))}
              alt={_.get(section, "image_alt", null)}
            />
          </div>
        </BannerDiv>
      </OuterDiv>

      // <section
      //   id={_.get(section, "section_id", null)}
      //   className="section-hero block hero-block bg-accent outer"
      // >

      /* <div className="inner">
          <div className="grid">
            {_.get(section, "image", null) && (
              <div className="cell block-preview">
                <img
                  src={withPrefix(_.get(section, "image", null))}
                  alt={_.get(section, "image_alt", null)}
                />
              </div>
            )}
            <div className="cell block-content">
              {_.get(section, "title", null) && (
                <h2 className="block-title ">
                  {_.get(section, "title", null)}
                </h2>
              )}
              <div className="block-copy">
                {markdownify(_.get(section, "content", null))}
              </div>
              {_.get(section, "actions", null) && (
                <div className="block-buttons">
                  <CtaButtons
                    {...this.props}
                    actions={_.get(section, "actions", null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div> */
      // </section>

      //   <div className="hero-image">

      // </div>
    );
  }
}
