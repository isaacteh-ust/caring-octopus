import React from "react";
import _ from "lodash";

import Action from "./Action";
import styled from "styled-components";

const FooterNavDiv = styled.div`
  position: relative;
  left: 80px;
  bottom: 28px;
  .menu {
    color: #ffffff;
  }

  @media only screen and (min-width: 800px) {
    margin-top: 70px;
  }

  .footer_nav_links{
    font-weight: 900;
  }
  
`;


export default class FooterNav extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    return (
      <section className="cell widget widget-nav" style={{ marginRight: "-105px"}}>
        <FooterNavDiv>
          {_.get(section, "title", null) && (
            <h2 className="widget-title">{_.get(section, "title", null)}</h2>
          )}
          
          {_.get(section, "nav_links", null) && (
            <ul className="menu footer_nav_links">
              {_.map(
                _.get(section, "nav_links", null),
                (action, action_idx) => (
                  <li key={action_idx} className="menu-item">
                   
                    <Action {...this.props} action={action} />
                  </li>
                )
              )}
            </ul>
          )}
        </FooterNavDiv>
      </section>
    );
  }
}
