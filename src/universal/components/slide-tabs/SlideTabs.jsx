import React, { Component } from 'react';
import deepEqual from 'deep-equal';
import Tab from './Tab';

export default class SlideTabs extends Component {
  tabElements = {};

  state = {
    sliderStyles: {}
  }

  render() {
    const { tabs, path, onChange } = this.props;
    const { sliderStyles } = this.state;

    return (
      <div className='slide-tabs'>
        <div className='slide-tabs-content'>
          {
            tabs.map(tab => (
              <Tab
                isActive={path === tab.path}
                title={tab.title}
                onClick={() => this.onChange(tab)}
                ref={el => this.tabElements[tab.path] = el}
                key={tab.path}
              />
            ))
          }
          <div
            className='slider'
            style={sliderStyles}
          ></div>
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    this.calculateSliderPosition();
  }
  componentDidMount() {
    this.calculateSliderPosition();
  }
  onChange(tab) {
    this.props.onChange(tab);
  }

  getPaddingLeft(element) {
    const styles = window.getComputedStyle(element);
    return parseFloat(styles.paddingLeft);
  }
  calculateSliderPosition() {
    const el = this.tabElements[this.props.path].element;
    const paddingLeft = this.getPaddingLeft(el);
    const parent = el.parentElement;
    const styles = {
      left: el.offsetLeft + paddingLeft,
      width: el.offsetWidth - (paddingLeft * 2)
    };

    if (!deepEqual(styles, this.state.sliderStyles)) {
      this.setState({
        sliderStyles: styles
      });
    }
  }
}
