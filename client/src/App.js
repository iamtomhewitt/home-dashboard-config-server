import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialogs from './components/Dialogs';
import Endpoints from './components/Endpoints';
import Widgets from './components/Widgets';
import './App.scss';

class App extends Component {
  state = {
    token: ''
  }

  getConfig = async () => {
    const { token } = this.state;
    const { dispatch } = this.props;

    if (token) {
      const response = await fetch(`/config?token=${token}`);
      const json = await response.json();
      const { message, config } = json;

      this.setState({ error: message })
      dispatch({ type: "CONFIG", config })
    }
    else {
      this.setState({ error: 'Please enter a token' })
      dispatch({ type: "CONFIG", config: {} })
    }
  }

  extract = (obj) => {
    const arr = []
    Object.keys(obj).forEach(function (key) {
      arr.push({ key, data: obj[key] })
    });
    return arr;
  }

  onTokenInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value })
  }

  onSave = () => {
    console.log('SAVE', this.props.config.widgets)
  }

  render() {
    const { error } = this.state;
    const { config } = this.props;
    const { widgets, dialogs, endpoints } = config || {};

    return (
      <div className='app'>
        <h1>Home Dashboard Config</h1>
        <div className='token'>
          <span>Token</span>
          <input onChange={this.onTokenInputChange} id='token' value={this.state.token} />
          <button onClick={this.getConfig}>Submit</button>
        </div>

        {widgets && <Widgets widgets={this.extract(widgets)} />}

        {error && <div>Error: {error}</div>}

        {widgets && <button onClick={this.onSave}>SAVE ALL</button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  config: state.config
})

export default connect(mapStateToProps)(App);
