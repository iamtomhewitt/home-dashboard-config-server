import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialogs from './components/Dialogs';
import Widgets from './components/Widgets';
import { toKeysAndValues } from './lib';

import './App.scss';

class App extends Component {
  state = {
    token: ''
  }

  componentDidMount() {
    const tokenQueryParam = new URLSearchParams(window.location.search).get('token');
    if (tokenQueryParam) {
      this.setState({ token: tokenQueryParam });
    }
  }

  getConfig = async () => {
    const { token } = this.state;
    const { dispatch } = this.props;

    if (token) {
      const response = await fetch(`/config?token=${token}`);
      const json = await response.json();
      const { message, config } = json;

      this.setState({ error: message });
      dispatch({ type: 'CONFIG', config });
    } else {
      this.setState({ error: 'Please enter a token' });
      dispatch({ type: 'CONFIG', config: {} });
    }
  }

  onTokenInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  onSave = () => {
    console.log('SAVE', this.props.config);
  }

  render() {
    const { error, token } = this.state;
    const { config } = this.props;
    const { widgets, dialogs } = config || {};

    return (
      <div className="app">
        <h1>Home Dashboard Config</h1>
        <div className="token">
          <span>Token</span>
          <input onChange={this.onTokenInputChange} id="token" value={token} />
          <p><button onClick={this.getConfig}>Submit</button></p>
        </div>

        {widgets && <Widgets widgets={toKeysAndValues(widgets)} />}
        {dialogs && <Dialogs dialogs={toKeysAndValues(dialogs)} />}

        {error && <div>Error: {error}</div>}

        {widgets && <button className="save-button" onClick={this.onSave}>SAVE ALL</button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

App.propTypes = {
  dispatch: PropTypes.func,
  config: PropTypes.object,
};

export default connect(mapStateToProps)(App);
