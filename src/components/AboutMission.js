import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { htmlToReact, withPrefix } from "../utils";

const MainSection = styled.section`
 
  &.bg-FFFFFF{
    background-color: white;
    }

  padding-top: 30px;

  @media only screen and (max-width:801px){
      margin-top: 50px;
      padding-top: 80px;
      margin-bottom: 0px;
  }
`;

// max-width: 1024px;
const InnerDiv = styled.div`
  
  max-width: 1190px;
  margin: auto;
  max-height: 500px;
  .block-subtitle, .block-title{
    padding-left: 10px;
  }

  .images-container{
    margin-top: -100px;
    @media only screen and (max-width:801px){
      margin-top: auto;
    }
  }
  .about-avatar_1{
    height: 268px;
    position: relative;
    top: 150px;
    right: -80px;
    padding-top: 0px;
    width: 430px;
    @media only screen and (max-width:801px){
        position: static;
        padding-left:10px;
        padding-right: 10px;
        width: 95%;
    }
  }
  .about-avatar_2{
    width: 100%;
    @media only screen and (max-width:801px){
        display: none;
    }
  }
  .block-content{
    color: white;
    font-weight: 700;
    position: relative;
    font-size: 20px;
    line-height: 38px;
    top: -190px;
    left: 640px;
    width: 450px;
    @media only screen and (max-width:801px){
        position: static;
        color: black;
        padding-top: 20px;
        width: 360px;
        text-align: left;
        font-size: 13px;
        font-weight: 100;
        line-height: 25px;
        margin: auto;
    }
   }

   .block-subtitle{
       font-weight: 900;
   }
   .title{
       font-weight: 900;
   }
  }
`;


export default class AboutMission extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    return (
      <MainSection
        id={_.get(section, "section_id", null)}
        className={
          "block overview-block bg-" +
          _.get(section, "background", null) +
          " "
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
          {_.get(section, "image", null) && _.get(section, "image_2", null) && (
            // <div className="">
            <div className="images-container">
                    <img
                      className="about-avatar_1"
                      alt=""
                      src={withPrefix(_.get(section, "image", null))}
                    />
                    <img
                      className="about-avatar_2"
                      alt=""
                      src={withPrefix(_.get(section, "image_2", null))}
                    />
            </div>
          )}
            {_.get(section, "content", null) && (
              <p className="block-content">
                {_.get(section, "content", null)}
              </p>
            )}
        </InnerDiv>
      </MainSection>
    );
  }
}
