import React, {Component} from "react";
import _, { toUpper } from "lodash";
import styled from "styled-components";
import CustomTabs from './customtabs';
import SectionCtaSwift from './SectionCtaSwift';
import { Link, withPrefix, classNames, htmlToReact } from "../utils";
import Action from "./Action";

const BgDiv = styled.section`
    .block-title{
      font-weight: 900;
      padding-left: 13.5%;
      font-size: 30px;
      font-family: fort-bold;
    }
    .block-subtitle{
      color: black;
      font-weight: 200;
      font-size: 14px;
      text-align: left;
      width: 850px;
      margin-top: 40px;
      margin-left: 13.5%;
      margin-bottom: 0px;
    }


    && .grid.outer{
      margin-top: 0px;
    }

    @media only screen and (max-width: 801px){
      .block-title{
        font-weight: 900;
        padding-left: 10%;
        font-size: 30px;
      }
      
      .block-title.custom{
        padding-left: 5%;
      }

      .block-subtitle{
        color: black;
        font-weight: 200;
        font-size: 12px;
        text-align: left;
        width: 300px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0px;
      }

      && .grid.outer{
        padding: 1.33333em 5vw;
        margin-top: 0px;
      }
    }

    .themesswift-cell.grow{
        box-sizing: border-box;
        padding-right: 0.6333rem;
        position: relative;
        flex-basis: 25%;
        margin-bottom: 30px;
        cursor: pointer;
        transition: all .2s ease-in-out;
        
        &:hover {
          transform: scale(1.2);
          z-index: 100;
        }

        @media only screen and (max-width: 801px){
          flex-basis: 50%;
          margin-bottom: 30px;
          
        }
    }
    //#region custom tab
    .grid{
      &.grid-custom{  
        justify-content:center
      }
      &.outer{
        padding: 2.333em 14.2vw;
      }
      .themeswift-avatar{
          width: 100%;
        }
    }
    //#endregion custom tab

  &.themeswift-block{
      padding-top: 0px;
    &.bg-F7F7F1{
      background-color: #F7F7F1;
    }
    .themeswift-block.tab{
    }  
    .bg-1D242C{
      background-color: #1D242C;
    }
    .grid-tab{
      justify-content: center;
      align-items: baseline;

      @media only screen and (max-width: 801px){
       align-items: center;
      }
    }
    p.block-subtitle-tab{
      color: white;
      font-weight: 200;
      font-size: 15px;

      @media only screen and (max-width: 801px){
       margin-left: 45px;
       margin-top: 10px;
       margin-bottom: 10px;
      }
    }
  }
`;


export default class ThemesSwift extends Component {

  state = {
    activeTab: "All themes"
  };
  
  changeActiveState =(tab)=>{
    this.setState({
      activeTab:tab
    })
  };

  changeActiveStateNav = (tab) =>{
    this.setState({
      activeTab:tab.label
    })
    this.toggleThemes.click();
  }

  render() {
    let tempState = {...this.state};
    //console.log('tempState is ', tempState);
    let section = _.get(this.props, "section", null);
    let tab_items = _.get(section, "tab_items", null);
    let filteredTabItems = tab_items.filter((tab_item => {
      return tab_item.label !== tempState.activeTab.toUpperCase()
    }));
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    let subtitle_1 = (_.find(tab_items, {label: tempState.activeTab.toUpperCase()})).subtitle_1 || null;
    return (
          <BgDiv
            id={_.get(section, "section_id", null)}
            className={
              "block themeswift-block bg-" +
              _.get(section, "background", null) +
              ""
            }
          >
          <div className="themeswift-block tab">
           <div className={"grid grid-tab bg-"+ _.get(section, "tab_background", null)}> 
           
            {_.get(section, "tab_title", null) && (
              <p className="block-subtitle-tab">{_.get(section, "tab_title", null)}</p>
            )}
            <CustomTabs tellParent = {this.changeActiveState.bind(this)}> 
            {_.map(tab_items, (tab_item, tab_idx)=>(
                  <div key={tab_idx} label={tab_item.label} >
                  </div> 
            ))}
            </CustomTabs> 
                    <nav
                    id="main-navigation-themes"
                    className="site-navigation-themes"
                    aria-label="Main Navigation-themes"
                    >
                    <div className="site-nav-inside-themes">
                      <button id="menu-close-themes" className="menu-toggle-themes" ref={(toggleThemes)=>{this.toggleThemes = toggleThemes}}>
                        <span className="screen-reader-text">Open Menu</span>
                        <span className="icon-close-themes" aria-hidden="true" />
                      </button>
                    
                      <ul className="menu">
                          {/* getting nav links in sitemetadata.json */}
                        {_.map(filteredTabItems,
                          (action, action_idx) => {
                            let newAction = {...action}
                            newAction.label = action.label.charAt(0).toUpperCase()  + action.label.slice(1).toLowerCase();
                            
                            let page_url = _.trim(
                              _.get(this.props, "pageContext.url", null),
                              "/"
                            );
                  
                            let action_url = _.trim(
                              _.get(action, "url", null),
                              "/"
                            );
                            let action_style =
                              _.get(action, "style", null) || "link";
                            return (
                              <li
                                key={action_idx}
                                onClick={this.changeActiveStateNav.bind(this, newAction)}
                                className={classNames("menu-item", {
                                  "current-menu-item": page_url === action_url,
                                  "menu-button": action_style !== "link",
                                  button: action_style !== "link",
                                  secondary: action_style !== "link",
                                })}
                              >
                                {action_style !== "link" &&
                                  pathname !== "/" && (
                                    <Action {...this.props} action={newAction} />
                                  )}
                                {action_style === "link" && (
                                  <Action {...this.props}  action={newAction} />
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </nav>
                  <button id="menu-open-themes" className="menu-toggle-themes">
                    <span className="screen-reader-text">Close Menu</span>
                    <span className="icon-menu-themes" aria-hidden="true" />
                  </button>
            </div>           
          </div>
             {_.get(section, "tab_title", null) && (
              <h2 className={classNames("block-title", {custom: this.state.activeTab === "Custom"})}>{this.state.activeTab}</h2>
            )}
            {_.get(_.find(tab_items, {label: this.state.activeTab.toUpperCase()}), "subtitle_1", null) && (
              <p className="block-subtitle">
                {htmlToReact(subtitle_1)}
              </p>
            )}

          {_.get(section, "grid_items", null) && (toUpper(this.state.activeTab) === toUpper("all themes")) && (
          // <div className="">
            <div className="grid outer">
            {/* use .map to loop through */}
        
            {_.map(_.get(section, "grid_items", null), (grid_item, review_idx) => (
              <div key={review_idx} className="themesswift-cell grow">
                {_.get(grid_item, "image", null) && (
                  <div className="theme-iframe"> 
                  <Link to={withPrefix(_.get(grid_item, 'url', null))}   {...(_.get(grid_item, "new_window", null) ? { target: "_blank" } : null)}
                  {...(_.get(grid_item, "new_window", null) ||
                  _.get(grid_item, "no_follow", null)
                  ? {
                  rel:
                  (_.get(grid_item, "new_window", null) ? "noopener " : "") +
                  (_.get(grid_item, "no_follow", null) ? "nofollow" : ""),
                  }
                  : null)}>
                  <img
                    className="themeswift-avatar"
                    src={withPrefix(_.get(grid_item, "image", null))}
                    alt={_.get(grid_item, "image_alt", null)}
                  />
                  </Link>
                  </div>
                )}

                {/* 
                <div className="industry-footer">
                  <p className="industry-text">
                    {htmlToReact(_.get(review, "title", null))}
                  </p>
                  <p className="industry-subtitle">
                    {htmlToReact(_.get(review, "subtitle", null))}
                  </p>
                </div> */}
              </div>
            ))}
            {/* </div> */}
          </div>
        )}
        {/* This is for custom tab */}
        { (toUpper(this.state.activeTab) === toUpper("custom")) && (
          // <div className="">
            <div className="grid grid-custom">
              <SectionCtaSwift {...this.props.section}></SectionCtaSwift>
            {/* </div> */}
          </div>
        )}
         {/* This is for custom tab */}
      </BgDiv>
    );
  }
}
