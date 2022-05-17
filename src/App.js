import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialogs from './components/Dialogs';
import General from './components/General';
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
      } else {
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

    const response = await fetch(`${process.env.REACT_APP_FIREBASE}/${this.state.tokenIndex}/.json`, {
      method: 'PUT',
      body: JSON.stringify(this.props.config),
    });

    const { ok } = response;
    const json = await response.json();
    const { message } = json;

    if (!ok) {
      this.setState({ error: message });
    } else {
      this.setState({ responseMessage: 'Config saved!' });
    }
  }

  render() {
    const { error, token, responseMessage, loading } = this.state;
    const { config } = this.props;
    const { widgets, dialogs, general } = config || {};
    const loadedConfig = !loading && widgets;

    return (
      <div className='app'>
        <h1>Home Dashboard Settings</h1>
        {!loadedConfig
          && (
            <>
              <div className='app-version'>v{version}</div>
              <div className='app-token'>
                <div className='app-token-label'>Token</div>
                <input onChange={this.onTokenInputChange} id='token' value={token} />
                <button onClick={this.getConfig}>Get Settings</button>
              </div>
            </>
          )}

        {loading && <div className='app-loading'><LoadingIcon /></div>}

        {general && <General general={general} />}
        {widgets && <Widgets widgets={toKeysAndValues(widgets)} />}
        {dialogs && <Dialogs dialogs={toKeysAndValues(dialogs)} />}

        {error && <div className='app-error'>Error: {error}</div>}

        {widgets && (
          <div className='app-save'>
            {responseMessage && <div>{new Date().toLocaleTimeString()} - {responseMessage}</div>}
            <button onClick={this.onSave} disabled={loading}>Save All</button>
          </div>
        )}
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
