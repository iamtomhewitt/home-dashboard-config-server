import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BACKEND_URL from './config';
import Dialogs from './components/Dialogs';
import LoadingIcon from './components/LoadingIcon';
import Widgets from './components/Widgets';
import { toKeysAndValues } from './lib';

import './App.scss';

class App extends Component {
  state = {
    token: '',
    responseMessage: '',
    error: '',
    buttonDisabled: false,
    loading: false,
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
      this.setState({ loading: true });
      const response = await fetch(`${BACKEND_URL}/config?token=${token}`);
      const json = await response.json();
      const { message, config } = json;

      this.setState({ error: message, loading: false });
      dispatch({ type: 'CONFIG', config });
    } else {
      this.setState({ error: 'Please enter a token', loading: false });
      dispatch({ type: 'CONFIG', config: {} });
    }
  }

  onTokenInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  onSave = async (event) => {
    this.setState({ buttonDisabled: true });
    event.preventDefault();

    const response = await fetch(`${BACKEND_URL}/config`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.state.token,
        config: this.props.config,
      }),
    });

    const { ok } = response;
    const json = await response.json();
    const { message } = json;

    if (!ok) {
      this.setState({ error: message, buttonDisabled: false });
    } else {
      this.setState({ responseMessage: message, buttonDisabled: false });
    }
  }

  render() {
    const { error, token, responseMessage, buttonDisabled, loading } = this.state;
    const { config } = this.props;
    const { widgets, dialogs } = config || {};

    return (
      <div className="app">
        <h1>Home Dashboard Settings</h1>
        <div className="token">
          <span>Token</span>
          <input onChange={this.onTokenInputChange} id="token" value={token} />
          <p><button onClick={this.getConfig}>Get Settings</button></p>
        </div>

        {loading && <LoadingIcon />}

        {widgets && <Widgets widgets={toKeysAndValues(widgets)} />}
        {dialogs && <Dialogs dialogs={toKeysAndValues(dialogs)} />}

        {error && <div className="error">Error: {error}</div>}

        {responseMessage && <div className="response-message">{responseMessage}</div>}
        {widgets && <button className="save-button" onClick={this.onSave} disabled={buttonDisabled}>Save All</button>}
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
