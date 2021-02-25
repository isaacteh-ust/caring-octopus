import React from "react";
import _ from "lodash";

import { htmlToReact, withPrefix, classNames } from "../utils";
import CtaButtons from "./CtaButtons";
import styled from "styled-components";

const BgDiv = styled.section`
    &#call-to-action-common-about.outer{
      padding-top: 0px;


      @media only screen and (max-width:801px){
       
      }

      .inner-large{
        max-width: 1140px;
      }
    }


    .inner-large{
      padding-top: 18px;
      padding-bottom: 40px;
      margin-left: auto;
      margin-right: auto;
      max-width: 930px;
    } 
    &.background-FFFFFF{
      background-color: #FFFFFF;
    }
    &.outer.custom{
      padding-top: 30px;
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

  @media only screen (max-width:801px){
      &.outer.custom{
        padding-top: 10px;
      }
    }
  
`;

const SCCInnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    padding-left: 25px;
    @media only screen and (max-width:801px){
      padding-left: 5px;
    }
    &.call-to-action-common-about{
      flex-direction: row;
      .cell.block-buttons .button{
        margin-left:auto;

        @media only screen and (max-width:801px){
          margin-right:auto;
          margin-left:0;
        }
      }
      .content-portion{
        margin-right: 50px;
        width: 800px;
      }

      @media only screen and (max-width:801px){
        .content-portion{
          width: 100%;
          text-align: left;
          margin-right: 0px;
        }
        flex-direction: column;
        align-items: center;
        &.call-to-action-common-about{
          flex-direction: column;
          
        }
        }
    }

    
`;

const SCCIndexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-grow: 0.63;
  & h2.block-title {
    font-weight: 900;
    margin-top: 11px;
    margin-bottom: 0px;
    color: black;
    font-size: 25px;
    font-family: fort-bold;
    line-height: 28px;
  }
  .block-copy-1 {
    font-weight: 300;
    line-height: 21px;
    font-size: 15px;
    margin-top: 13px;
    margin-bottom: 13px;
    color: black;
  }
  .block-copy-2 {
    font-weight: 900;
    line-height: 24px;
    font-size: 13px;
    margin-bottom: 11px;
    font-family: fort-bold;
    color: black;
    text-transform: uppercase;
  }
  .block-buttons{
    margin: 0px;
  }
  .ctacommon-img-div {
    padding-top: 60px;
    margin-right: 40px;
    padding-bottom: 10px;
    width:435px;  
  }

  .ctacommon-img-div.solutions {
    padding-top: 60px;
    margin-right: 40px;
    padding-bottom: 10px;
    width:435px;  
    .ctacommon-img{
      width:435px;  
    }
  }

  .ctacommon-img-div.approach {
    .ctacommon-img{
      width:435px;  
    }
  }

  @media only screen and (max-width:801px){
    .ctacommon-img-div {
      display: none;
    }


    h2.block-title{
      line-height: 30px;
    }
  }
`;

export default class SectionCtaCommon extends React.Component {
    render() {
        const section = _.get(this.props, 'custom', null) || _.get(this.props, 'section', null);
        const section_id = _.get(section, 'section_id', null);
        const custom = _.get(section, 'custom', null );
        let background_color = section.background_color;
        const image = _.get(section, 'image', null);
        
        return (
            <BgDiv id={_.get(section, 'section_id', null)} className={"background-"+background_color + " block cta-common-block outer " + _.get(section, 'custom', '')}>
              <div className="inner-large">
                <SCCIndexDiv> 
                  {image && <div className ={classNames("ctacommon-img-div",{"solutions": section_id==="call-to-action-common-solutions"}, {"approach": section_id==="call-to-action-common-approach"})}> 
                    <img className="ctacommon-img"
                        src={withPrefix(_.get(section, "image", null))}
                        alt={_.get(section, "image_alt", null)}
                    /> 
                    </div>
                  }
                   <SCCInnerDiv className={classNames({"call-to-action-common-about": section_id === 'call-to-action-common-about',"call-to-action-common-solutions": section_id === 'call-to-action-common-solutions'})}>
                    <div className="content-portion">
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
                      </div>
                      {/* both conditions must be fullfilled for jsx */ }
                      {_.get(section, 'actions', null) && (
                      <div className="cell block-buttons">
                        <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                      </div>
                      )}
                    </SCCInnerDiv>
                  </SCCIndexDiv>
          </div>
       
      </BgDiv>
    );
  }
}
