import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BasicWidget.scss';

const toSentence = (text) => {
  const result = text.replace(/([A-Z])/g, " $1")
  return result.charAt(0).toUpperCase() + result.slice(1);
}

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
      <span className='widget-key'><strong>{toSentence(key)}</strong></span>
      <input className='widget-value' value={value} onChange={this.onChange} id={key} />
    </div>
  )

  render() {
    const { data } = this.state;
    const { title } = data;
    const pairs = [];
    Object.keys(data).forEach((key) => { if (key !== '_id') pairs.push({ key, value: data[key] }) })

    return (
      <div>
        <h4>{title || 'Enter Name'}</h4>
        {pairs.map((pair) => this.renderItem(pair))}
      </div>
    );
  }
}

export default connect()(BasicWidget);