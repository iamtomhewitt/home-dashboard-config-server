import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialogs from './components/Dialogs';
import LoadingIcon from './components/LoadingIcon';
import Widgets from './components/Widgets';
import { toKeysAndValues } from './lib';
import { version } from '../package.json';

import './App.scss';

class App extends Component {
  state = {
    token: '',
    responseMessage: '',
    error: '',
    buttonDisabled: false,
    loading: false,
    tokenIndex: 0,
  }

  componentDidMount() {
    const tokenQueryParam = new URLSearchParams(window.location.search).get('token');
    if (tokenQueryParam) {
      this.setState({ token: tokenQueryParam });
    }
  }

  onTokenInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  getConfig = async () => {
    const { token } = this.state;
    const { dispatch } = this.props;

    if (token) {
      this.setState({ loading: true });
      const response = await fetch(`${process.env.REACT_APP_FIREBASE}.json`);
      const json = await response.json();
      const configForToken = json.filter((x) => x.token === token)[0];
      const indexForConfig = json.findIndex((x) => x.token === token);

      if (configForToken.length <= 0) {
        this.setState({ error: `Could not find config for token '${token}'`, loading: false });
      }
      else {
        this.setState({ loading: false, tokenIndex: indexForConfig });
        dispatch({ type: 'CONFIG', config: configForToken });
      }
    } else {
      this.setState({ error: 'Please enter a token', loading: false });
      dispatch({ type: 'CONFIG', config: {} });
    }
  }

  onSave = async (event) => {
    event.preventDefault();
    this.setState({ buttonDisabled: true });

    const response = await fetch(`${process.env.REACT_APP_FIREBASE}/${this.state.tokenIndex}/.json`, {
      method: 'PUT',
      body: JSON.stringify(this.props.config),
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
        <span className="version">v{version}</span>
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
