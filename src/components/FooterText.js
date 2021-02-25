import React from "react";
import _ from "lodash";

import Action from "./Action";
import { Link, withPrefix, markdownify } from "../utils";
import styled from "styled-components";
import { Link as ScrollLink, scroller } from "react-scroll";
import { navigate } from "gatsby";
import Icon from "./Icon";


const BgOverride = styled.div`
  background-color: #f7f7f1;
  padding: 20px;
  position:relative;
  left: 92px;
  color: #231f20;

  .button {
    color: #231f20;
    border: 2px solid #231f20;
  }
  .widget-title {
    color: #231f20 !important;
    font-family: fort-bold;
  }
  .menu-item {
    display: inline;
    font-size: 1.5rem;
  }
  a{
    text-decoration: none;
  }
  .get-in-touch-button {
    border: 2px solid black;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 150px;
    height: 40px;
    justify-content: space-around;

  }
`;




export default class FooterText extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    const contact_icon_object = {
      action: {
        border: "black",
        has_icon: true,
        icon: "arrow-right",
        icon_color: "006E74",
        icon_position: "right",
        label: "Get in touch",
        style: "contact",
        url: "/contact",

      },
    };

   
    return (
     
      <section className="cell widget footer" style={{ marginRight: "30px"}}>
        
        {_.get(section, "image", null) &&
          (_.get(section, "image_url", null) ? (
            <Link
              className="widget-image"
              to={withPrefix(_.get(section, "image_url", null))}
            >
              <img
                src={withPrefix(_.get(section, "image", null))}
                alt={_.get(section, "image_alt", null)}
              />
            </Link>
          ) : (
            <p className="widget-image">
              <img
                src={withPrefix(_.get(section, "image", null))}
                alt={_.get(section, "image_alt", null)}
              />
            </p>
          ))}
        <BgOverride>
          {_.get(section, "title", null) && (
            <h2 className="widget-title">{_.get(section, "title", null)}</h2>
          )}
          {markdownify(_.get(section, "content", null))}
          <div className="form-row">
            {/* <button type="submit" className="button">
              {_.get(section, "submit_label", null)}
            </button> */}
            <div className="block-buttons">
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/", {
                    state: { contact: true },
                  });
                }}
              >
                <div className="get-in-touch-button">
                  <div style={{ paddingRight: "10px" }}>Get in touch</div>
                  <Icon {...contact_icon_object} icon="arrow-right" />
                </div>
              </ScrollLink>
            </div>
          </div>
          {/* {_.get(section, 'nav_links', null) && (
              <ul className="menu">
                {_.map(_.get(section, 'nav_links', null), (action, action_idx) => (
                <li key={action_idx} className="menu-item">
                  <Action {...this.props} action={action} />
                </li>
                ))}
              </ul>
              )} */}
        </BgOverride>
       
      </section>
      
      
     
    );
  }
}
