import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { withPrefix, markdownify, classNames } from "../utils";
import CtaButtons from "./CtaButtons";

const HeroImg = styled.img`
    &.hero-img{
      
    }

`;

const MainDiv =  styled.div`
    &#swifthero_video .hero-video{
    .hero-text-block{
      background: transparent;
      top: 4%;
      line-height: 25px;
      padding: 2em 2.5em 0.8em 1.5em;
      .block-text-subtitle{
        color: white;
        font-weight: 900;
        font-size: 15px;
        margin-bottom: 15px;
      }
  
      .block-text-title{
        font-weight: 100;
        margin-bottom:15px;
        font-size: 35px;
        font-family: 'fort-bold';
      }
  
      .block-text-content{
        color: white;
        font-weight: 0;
        font-size: 15px;
      }
    }

    .hero-video-block{
      position: absolute;
      top: 5%;
      left: 50%;
      padding: 2em 1em 1em 1em;
      width: calc(100% - 680px);
      max-width: 640px;
      min-width: 380px;
      iframe{
        border-width: 0px;
      }

      @media only screen and (max-width: 801px){

        
      }
    }
  }


    
`

export default class SectionHero extends React.Component {

  async componentDidMount(){
    /*
    let response =  await fetch("https://vimeo.com/api/oembed.json?url=" + video_url,
    {
      method: "GET",  
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    */
    }

  render() {
    let section = _.get(this.props, "section", null);
    let video_url = _.get(section, "video_url", null);

    return (
      
      <MainDiv id={_.get(section, "section_id", null)} className='hero-container'>
        <HeroImg
          className="hero-img"
          src={withPrefix(_.get(section, "image", null))}
          alt={_.get(section, "image_alt", null)}
        />
      <div className={classNames({ "hero-video": video_url != null})}> 
        <div className="hero-text-block">
          {_.get(section, "subtitle", null) && (
            <div className="block-text-subtitle">
              {_.get(section, "subtitle", null)}
            </div>
          )}
          {_.get(section, "title", null) && (
            <div className="block-text-title ">
              {_.get(section, "title", null)}
            </div>
          )}
          <div className="block-text-content">
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
        {_.get(section, "video", null) && (
          <div className="hero-video-block"> 
            <iframe src={_.get(section, "video_url", null)}
              id="hero-video-1"
              className="hero-video-iframe"/>
          </div>
        )}
        </div>
      </MainDiv>
  
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
