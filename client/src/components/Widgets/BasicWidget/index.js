import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toSentence } from '../../../lib';
import './index.scss';

class BasicWidget extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    this.setState({ data: this.props.data })
  }

  onChange = (event) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [event.target.id]: event.target.value,
      }
    }), () => {
      this.props.dispatch({
        type: this.props.action,
        data: this.state.data
      })
    })
  }

  renderItem = ({ key, value }) => (
    <div key={key}>
      <span className='widget-key'>{toSentence(key)}</span>
      <input className='widget-value' value={value} onChange={this.onChange} id={key} />
    </div>
  )

  render() {
    const { data } = this.state;
    const { title } = data;
    const pairs = [];
    Object.keys(data).forEach((key) => { if (key !== '_id') pairs.push({ key, value: data[key] }) })

    return (
      <div className='basic'>
        <h3>{title || 'Enter Name'}</h3>
        {pairs.map((pair) => this.renderItem(pair))}
      </div>
    );
  }
}

export default connect()(BasicWidget);