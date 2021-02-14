import React, { Component } from 'react';
import './App.scss';
import Widgets from './components/Widgets';

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
    else {
      this.setState({ error: 'Please enter a token' })
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
    const { widgets, dialogs, endpoints } = config || {};

    return (
      <div>
        <h1>Dashboard Config</h1>
        <div>
          <span>Token</span>
          <input onChange={this.onTokenInputChange} id='token' value={this.state.token}/>
          <button onClick={this.getConfig}>Submit</button>
        </div>

        {config &&
          <Widgets widgets={this.extract(widgets)}/>
        }

        {error &&
          <div>Error: {error}</div>
        }
      </div>
    );
  }
}

export default App;
