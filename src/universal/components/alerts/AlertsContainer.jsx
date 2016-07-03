import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getAlerts, removeAlert } from '../../redux/ducks/alerts';
import Alert from './Alert';

const mapStateToProps = (state) => ({
  alerts: getAlerts(state)
});
const mapDispatchToProps = { removeAlert };

@connect(mapStateToProps, mapDispatchToProps)
export default class AlertsContainer extends Component {
  render() {
    const { alerts, removeAlert } = this.props;

    return (
      <section id='alerts-container'>

        <ReactCSSTransitionGroup
          transitionName="global-alert"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}>
          {
            alerts.map(a => (
              <Alert
                title={a.title}
                content={a.content}
                type={a.type}
                dismissAlert={() => removeAlert(a.id)}
                key={a.id}
              />
            ))
          }
        </ReactCSSTransitionGroup>
      </section>
    )
  }
}
