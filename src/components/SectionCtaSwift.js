import React from "react";
import _ from "lodash";

import { htmlToReact, withPrefix } from "../utils";
import CtaButtons from "./CtaButtons";
import styled from "styled-components";

const BgDiv = styled.section`
    &.background-FFFFFF{
      background-color: #FFFFFF;
    }
    &.outer.custom{
      padding-top: 25px;
      margin-bottom: 70px;
      margin-top: 0px;
      padding-left: 0px;
      padding-right:0px;
      .block-copy-1 {
        font-weight: 300;
        line-height: 21px;
        font-size: 13px;
        margin-top: 13px;
        margin-bottom: 27px;
        color: black;
        position: relative;
        right: 164px;
      }
      .cell.block-buttons.custom{
        position: relative;
        right: 164px;
      }
    }
    &.background-F7F7F1{
      background-color: #F7F7F1;
    }

    .border-black{
      border: 1px solid black;
      background-color: white;
      border-radius: 0px;
    }

  .cell {
    padding-left: 0px;
    margin-bottom: 10px;
  }

  @media only screen and (max-width:801px){
      &.outer.custom{
        padding-top: 10px;
        margin-bottom: 20px;
      }
    }

`;

const SCWIndexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 0.63;
  & h2.block-title {
    font-weight: 900;
    margin-top: 11px;
    margin-bottom: 0px;
    font-family: fort-bold;
    color: black;
    font-size: 30px;
    line-height: 24px;
    @media only screen and (max-width:801px){
      margin-bottom: 10px;
    }
  }
  .block-copy-1 {
    font-weight: 300;
    line-height: 21px;
    font-size: 13px;
    margin-top: 13px;
    margin-bottom: 27px;
    color: black;
  }
  .block-copy-2 {
    font-weight: 900;
    font-family: fort-bold;
    line-height: 24px;
    font-size: 12px;
    margin-bottom: 11px;
    color: black;
    text-transform: uppercase;
  }
  @media only screen and (max-width:801px){
    width: 70%;
    .block-copy-1 {
      font-weight: 50;
      line-height: 24px;
      font-size: 15px;
      margin-top: 0px;
      margin-bottom: 15px;
      color: black;
    }
  }
  .ctaswift-img{
    margin-top: 10px;
  }
`;

export default class SectionCtaSwift extends React.Component {
    render() {
        const section = _.get(this.props, 'custom', null) || _.get(this.props, 'section', null);
        // custom is for swift theme's custom tab
        const custom = _.get(section, 'custom', null );
        let background_color = section.background_color;
        return (
            <BgDiv id={_.get(section, 'section_id', null)} className={ "background-"+background_color + " block cta-block outer " + _.get(section, 'custom', '')}>
              <div className="inner-large">
                <div className="grid">
                <SCWIndexDiv> 
                   {_.get(section, 'subtitle_2', null) && (
                    <p className="block-copy-2">{_.get(section, 'subtitle_2', null)}</p>
                    )}
                    {_.get(section, 'title', null) && (
                    <h2 className="block-title">{_.get(section, 'title', null)}</h2>
                    )}
                    {_.get(section, 'subtitle_1', null) && (
                    <p className="block-copy-1">
                      {/* use htmlToReact to translate html to jsx */}
                      {htmlToReact(_.get(section, 'subtitle_1', null))}
                    </p>
                    )}
                     {/* both conditions must be fullfilled for jsx */ }
                    {_.get(section, 'actions', null) && (
                    <div className={"cell block-buttons " + _.get(section, 'custom','')}>
                      <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                    </div>
                    )}
                    <img className="ctaswift-img"
                        src={withPrefix(_.get(section, "image", null))}
                        alt={_.get(section, "image_alt", null)}
                    /> 
                  </SCWIndexDiv>
          </div>
        </div>
      </BgDiv>
    );
  }
}
