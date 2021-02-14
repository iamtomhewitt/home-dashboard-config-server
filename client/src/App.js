import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    token: ''
  }

  getConfig = async () => {
    const { token } = this.state;

    if (token) {
      const response = await fetch(`http://localhost:3001/config?token=${token}`);
      const json = await response.json();
      const { message, config } = json;

      this.setState({ error: message, config })
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

  render() {
    const { config, error } = this.state;

    if (config) {
      const { widgets, dialogs, endpoints } = config;

      console.log('widgets', this.extract(widgets))
      console.log('dialogs', this.extract(dialogs))
      console.log('endpoints', this.extract(endpoints))

      return (
        <div >
          <h1>Dashboard Config</h1>
          <span>Token</span>
          <input onChange={this.onTokenInputChange} id='token' />
          <button onClick={this.onSubmitToken}>Submit</button>
          <div>{JSON.stringify(widgets, null, 2)}</div>
        </div>
      );
    }

    return (
      <div >
        <h1>Dashboard Config</h1>
        <span>Token</span>
        <input onChange={this.onTokenInputChange} id='token' />
        <button onClick={this.getConfig}>Submit</button>
        {error && <div>Error: {error}</div>}
      </div>
    )
  }
}

export default App;
