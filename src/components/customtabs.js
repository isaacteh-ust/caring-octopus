import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CustomTab from './customtab';
import styled from 'styled-components';

const StyledOl = styled.div`
    color:red;
    &.tabs {
      margin-right: 120px;
    }
    ol{
      margin-left: 40px;
      
    }

    @media only screen and (max-width: 801px){
      ol.tab-list{
        margin: 0px;
        padding: 0px;
        text-align: center;
        
      }
      display: none;
    }

`;

export default class CustomTabs extends Component {
    // must pass in children from themesswift.js
     static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
      }
      
      state = {
          activeTab: "All themes"
      };
      
      onClickTabItem = (tab) => {
        // this is for the text-decoration
        this.setState({ activeTab: tab });
        let newTab = tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase();
        this.props.tellParent(newTab);
      }

    render() {
        const { onClickTabItem,
          props: {
            children,
          },
          state: {
            activeTab,
          }
        } = this;
        return (
            <StyledOl className="tabs">
            <ol className="tab-list">
              {children.map((child) => {
                const { label } = child.props;
                return (
                  <CustomTab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    onClick={onClickTabItem}
                  />
                );
              })}
            </ol>
            <div className="tab-content">
              {children.map((child) => {
                if (child.props.label !== activeTab) return undefined;
                return child.props.children;
              })}
            </div>
          </StyledOl> 
        );
      }
}
    