import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTab = styled.li`
  &.tab-list-item {
    display: inline-block;
    list-style: none;
    color: white;
    font-weight: 800; 
    margin: 0.8em 1.5em 0.5em 1.5em;
    font-size: 13px;
    cursor: pointer;
  }
  &.tab-list-active {
    text-decoration: underline 2px solid white;
    
  }
  @media only screen and (max-width:801px){
  &.tab-list-item {
      margin: 1em 0.3em 1em 0.3em;
    }
  }


`

/*  @media only screen and (max-width:1500px){
  &.tab-list-item {
    margin: 0.8em 0em 0.5em 1.5em;
    border-bottom: 2px solid white;
  }
}*/
class CustomTab extends React.Component {
     static propTypes = {
      activeTab: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    };
    onClick = () => {
      const { label, onClick } = this.props;
      onClick(label);
    }
    render() {
      const {
        onClick,
        props: {
          activeTab,
          label,
        },
      } = this;
  
      let className = 'tab-list-item';
      if (activeTab.toUpperCase() === label.toUpperCase()) {
        className += ' tab-list-active';
      }
  
      return (
        <StyledTab
          className={className}
          onClick={onClick}
        >
          {label}
        </StyledTab>
      );
    }
  }
  
export default CustomTab;